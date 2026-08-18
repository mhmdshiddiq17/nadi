-- ============================================================
-- NADI Sprint 3
-- Dummy Data & Data Layer
-- ============================================================

-- ============================================================
-- 1. PROGRAM ALLOCATION
-- ============================================================

create table public.program_allocations (
  allocation_id uuid primary key
    default gen_random_uuid(),

  program_id uuid not null
    references public.programs(program_id),

  region_id uuid not null
    references public.regions(region_id),

  fiscal_year smallint not null
    check (fiscal_year between 2020 and 2100),

  budget_amount numeric(18,2) not null
    check (budget_amount >= 0),

  allocation_weight numeric(12,10) not null
    check (
      allocation_weight >= 0
      and allocation_weight <= 1
    ),

  allocation_method text not null
    default 'SOURCE_PROVIDED',

  source_system text not null
    references public.integration_sources(code),

  source_ref text not null,

  fetched_at timestamptz not null,

  metadata jsonb not null
    default '{}'::jsonb,

  created_at timestamptz not null
    default now(),

  updated_at timestamptz not null
    default now(),

  unique (
    program_id,
    region_id,
    fiscal_year
  )
);

create index program_allocations_program_year_ix
  on public.program_allocations(
    program_id,
    fiscal_year
  );

create index program_allocations_region_year_ix
  on public.program_allocations(
    region_id,
    fiscal_year
  );

create index program_allocations_source_ix
  on public.program_allocations(
    source_system
  );

create trigger program_allocations_set_updated_at
before update
on public.program_allocations
for each row
execute function public.set_updated_at();


-- ============================================================
-- 2. REALISATION SNAPSHOTS
-- ============================================================

create table public.program_realisation_snapshots (
  snapshot_id uuid primary key
    default gen_random_uuid(),

  allocation_id uuid not null
    references public.program_allocations(allocation_id)
    on delete cascade,

  period_id uuid not null
    references public.periods(period_id),

  period_realised_value numeric(18,2) not null,

  cumulative_realised_value numeric(18,2) not null
    check (
      cumulative_realised_value >= 0
    ),

  source_system text not null
    references public.integration_sources(code),

  source_ref text not null,

  fetched_at timestamptz not null,

  metadata jsonb not null
    default '{}'::jsonb,

  created_at timestamptz not null
    default now(),

  updated_at timestamptz not null
    default now(),

  unique (
    allocation_id,
    period_id
  )
);

create index realisation_snapshots_period_ix
  on public.program_realisation_snapshots(
    period_id,
    allocation_id
  );

create index realisation_snapshots_allocation_ix
  on public.program_realisation_snapshots(
    allocation_id
  );

create index realisation_snapshots_source_ix
  on public.program_realisation_snapshots(
    source_system
  );

create trigger realisation_snapshots_set_updated_at
before update
on public.program_realisation_snapshots
for each row
execute function public.set_updated_at();


-- ============================================================
-- 3. ALLOCATION VALIDATION
-- ============================================================

create or replace function private.validate_program_allocation()
returns trigger
language plpgsql
set search_path = ''
as $$
declare
  target_region_type public.region_type;
begin

  select r.region_type
    into target_region_type
  from public.regions r
  where r.region_id = new.region_id;

  if target_region_type is null then
    raise exception
      'Region % does not exist',
      new.region_id;
  end if;

  if target_region_type <> 'PROVINCE' then
    raise exception
      'Program allocation must target a PROVINCE';
  end if;

  return new;
end;
$$;

create trigger validate_program_allocation_trigger
before insert or update
on public.program_allocations
for each row
execute function private.validate_program_allocation();


-- ============================================================
-- 4. REALISATION VALIDATION
-- ============================================================

create or replace function private.validate_realisation_snapshot()
returns trigger
language plpgsql
set search_path = ''
as $$
declare
  target_budget numeric(18,2);
  target_fiscal_year smallint;
  target_period_year smallint;
  target_period_type public.period_type;
begin

  select
    a.budget_amount,
    a.fiscal_year
  into
    target_budget,
    target_fiscal_year
  from public.program_allocations a
  where a.allocation_id = new.allocation_id;

  if target_budget is null then
    raise exception
      'Allocation % does not exist',
      new.allocation_id;
  end if;

  select
    p.fiscal_year,
    p.period_type
  into
    target_period_year,
    target_period_type
  from public.periods p
  where p.period_id = new.period_id;

  if target_period_year is null then
    raise exception
      'Period % does not exist',
      new.period_id;
  end if;

  if target_period_type <> 'MONTHLY' then
    raise exception
      'Realisation snapshot requires MONTHLY period';
  end if;

  if target_period_year <> target_fiscal_year then
    raise exception
      'Period fiscal year does not match allocation fiscal year';
  end if;

  if new.cumulative_realised_value > target_budget then
    raise exception
      'Cumulative realisation cannot exceed allocated budget';
  end if;

  return new;
end;
$$;

create trigger validate_realisation_snapshot_trigger
before insert or update
on public.program_realisation_snapshots
for each row
execute function private.validate_realisation_snapshot();


-- ============================================================
-- 5. RLS HELPER
-- ============================================================

create or replace function private.can_read_allocation(
  target_allocation_id uuid
)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.program_allocations a
    where
      a.allocation_id = target_allocation_id
      and
      private.can_read_program(
        a.program_id
      )
  );
$$;

revoke all
on function private.can_read_allocation(uuid)
from public;

grant execute
on function private.can_read_allocation(uuid)
to authenticated;


-- ============================================================
-- 6. ENABLE RLS
-- ============================================================

alter table public.program_allocations
  enable row level security;

alter table public.program_realisation_snapshots
  enable row level security;


-- ============================================================
-- 7. DATABASE GRANTS
-- ============================================================

revoke all
on public.program_allocations
from anon;

revoke all
on public.program_realisation_snapshots
from anon;

grant select
on public.program_allocations
to authenticated;

grant select
on public.program_realisation_snapshots
to authenticated;

grant insert, update, delete
on public.program_allocations
to authenticated;

grant insert, update, delete
on public.program_realisation_snapshots
to authenticated;


-- ============================================================
-- 8. ALLOCATION RLS
-- ============================================================

create policy program_allocations_select
on public.program_allocations
for select
to authenticated
using (
  (
    select private.can_read_program(
      program_id
    )
  )
);

create policy program_allocations_manage
on public.program_allocations
for all
to authenticated
using (
  (
    select private.is_admin()
  )
)
with check (
  (
    select private.is_admin()
  )
);


-- ============================================================
-- 9. REALISATION RLS
-- ============================================================

create policy realisation_snapshots_select
on public.program_realisation_snapshots
for select
to authenticated
using (
  (
    select private.can_read_allocation(
      allocation_id
    )
  )
);

create policy realisation_snapshots_manage
on public.program_realisation_snapshots
for all
to authenticated
using (
  (
    select private.is_admin()
  )
)
with check (
  (
    select private.is_admin()
  )
);


-- ============================================================
-- 10. MONTHLY PERFORMANCE VIEW
-- ============================================================

create or replace view
public.program_performance_monthly
with (
  security_invoker = true
)
as

select
  a.allocation_id,

  a.program_id,
  p.code as program_code,
  p.name as program_name,

  a.region_id,
  r.code as region_code,
  r.name as region_name,

  a.fiscal_year,

  s.period_id,
  pr.code as period_code,
  pr.label as period_label,
  pr.month,

  a.budget_amount,

  s.period_realised_value,

  s.cumulative_realised_value,

  (
    a.budget_amount
    -
    s.cumulative_realised_value
  )::numeric(18,2)
    as gap_value,

  round(
    case
      when a.budget_amount = 0
        then 0
      else
        (
          s.cumulative_realised_value
          /
          a.budget_amount
        ) * 100
    end,
    2
  ) as achievement_pct,

  a.allocation_weight,
  a.allocation_method,

  a.source_system
    as allocation_source_system,

  a.source_ref
    as allocation_source_ref,

  s.source_system
    as realisation_source_system,

  s.source_ref
    as realisation_source_ref,

  s.fetched_at
    as realisation_fetched_at

from public.program_allocations a

join public.programs p
  on p.program_id = a.program_id

join public.regions r
  on r.region_id = a.region_id

join public.program_realisation_snapshots s
  on s.allocation_id = a.allocation_id

join public.periods pr
  on pr.period_id = s.period_id;


-- ============================================================
-- 11. PROGRAM PERIOD SUMMARY
-- ============================================================

create or replace view
public.program_period_summary
with (
  security_invoker = true
)
as

select
  program_id,
  program_code,
  program_name,

  fiscal_year,

  period_id,
  period_code,
  period_label,
  month,

  count(*)::integer
    as province_count,

  sum(
    budget_amount
  )::numeric(18,2)
    as budget_amount,

  sum(
    period_realised_value
  )::numeric(18,2)
    as period_realised_value,

  sum(
    cumulative_realised_value
  )::numeric(18,2)
    as cumulative_realised_value,

  sum(
    gap_value
  )::numeric(18,2)
    as gap_value,

  round(
    case
      when sum(budget_amount) = 0
        then 0
      else
        (
          sum(cumulative_realised_value)
          /
          sum(budget_amount)
        ) * 100
    end,
    2
  ) as achievement_pct

from public.program_performance_monthly

group by
  program_id,
  program_code,
  program_name,
  fiscal_year,
  period_id,
  period_code,
  period_label,
  month;


-- ============================================================
-- 12. PROGRAM YEAR SUMMARY
-- Latest available monthly snapshot.
-- ============================================================

create or replace view
public.program_year_summary
with (
  security_invoker = true
)
as

select distinct on (
  program_id,
  fiscal_year
)

  program_id,
  program_code,
  program_name,

  fiscal_year,

  period_id as latest_period_id,
  period_code as latest_period_code,
  period_label as latest_period_label,

  province_count,

  budget_amount,

  cumulative_realised_value
    as realised_value,

  gap_value,

  achievement_pct

from public.program_period_summary

order by
  program_id,
  fiscal_year,
  month desc;


-- ============================================================
-- 13. PORTFOLIO YEAR SUMMARY
-- RLS aware: results depend on accessible programs.
-- ============================================================

create or replace view
public.portfolio_year_summary
with (
  security_invoker = true
)
as

select
  fiscal_year,

  count(*)::integer
    as program_count,

  sum(
    budget_amount
  )::numeric(18,2)
    as budget_amount,

  sum(
    realised_value
  )::numeric(18,2)
    as realised_value,

  sum(
    gap_value
  )::numeric(18,2)
    as gap_value,

  round(
    case
      when sum(budget_amount) = 0
        then 0
      else
        (
          sum(realised_value)
          /
          sum(budget_amount)
        ) * 100
    end,
    2
  ) as achievement_pct

from public.program_year_summary

group by fiscal_year;


-- ============================================================
-- 14. VIEW GRANTS
-- ============================================================

revoke all
on public.program_performance_monthly
from anon;

revoke all
on public.program_period_summary
from anon;

revoke all
on public.program_year_summary
from anon;

revoke all
on public.portfolio_year_summary
from anon;

grant select
on public.program_performance_monthly
to authenticated;

grant select
on public.program_period_summary
to authenticated;

grant select
on public.program_year_summary
to authenticated;

grant select
on public.portfolio_year_summary
to authenticated;