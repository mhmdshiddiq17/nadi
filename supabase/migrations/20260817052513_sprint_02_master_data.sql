-- ============================================================
-- NADI Sprint 2
-- Database & Master Data Foundation
-- ============================================================

create schema if not exists private;

revoke all on schema private from public;

-- ============================================================
-- ENUMS
-- ============================================================

create type public.agency_kind as enum (
  'KL',
  'BUMN',
  'BANK',
  'AUDITOR',
  'INTERNAL',
  'OTHER'
);

create type public.program_family as enum (
  'SUBSIDI',
  'DMO',
  'BANTUAN'
);

create type public.cost_bearer as enum (
  'APBN',
  'APBN_CBP',
  'PELAKU_USAHA',
  'OTHER'
);

create type public.region_type as enum (
  'COUNTRY',
  'PROVINCE',
  'REGENCY',
  'DISTRICT',
  'VILLAGE'
);

create type public.period_type as enum (
  'MONTHLY',
  'QUARTERLY',
  'YEARLY'
);

create type public.program_agency_role as enum (
  'STEWARD',
  'DATA_PROVIDER',
  'REGULATOR',
  'PAYER',
  'SUPERVISOR',
  'OPERATOR'
);

create type public.integration_source_type as enum (
  'MOCK',
  'REST',
  'SFTP',
  'WEBHOOK',
  'FILE'
);

create type public.integration_source_status as enum (
  'MOCK',
  'READY',
  'ACTIVE',
  'DEGRADED',
  'FAILED',
  'DISABLED'
);

-- ============================================================
-- UPDATED AT
-- ============================================================

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ============================================================
-- ROLES
-- ============================================================

create table public.roles (
  role_id uuid primary key default gen_random_uuid(),

  code text not null unique
    check (code ~ '^[A-Z][A-Z0-9_]*$'),

  name text not null,

  description text,

  priority smallint not null default 100,

  is_system boolean not null default true,

  created_at timestamptz not null default now()
);

insert into public.roles (
  code,
  name,
  description,
  priority
)
values
  (
    'UNASSIGNED',
    'Unassigned',
    'Authenticated user without application access',
    999
  ),
  (
    'SUPER_ADMIN',
    'Super Administrator',
    'Full application and security administration',
    1
  ),
  (
    'APN_ADMIN',
    'APN Administrator',
    'Manage NADI master data and application configuration',
    10
  ),
  (
    'APN_ANALYST',
    'APN Analyst',
    'Read and analyze all NADI programs',
    20
  ),
  (
    'KL_VIEWER',
    'K/L Viewer',
    'Read programs associated with the user agency',
    30
  ),
  (
    'AUDITOR',
    'Auditor',
    'Cross-program read-only access for audit purposes',
    40
  ),
  (
    'EXECUTIVE',
    'Executive',
    'Cross-program executive monitoring access',
    50
  )
on conflict (code) do nothing;

-- ============================================================
-- AGENCIES
-- ============================================================

create table public.agencies (
  agency_id uuid primary key default gen_random_uuid(),

  code text not null unique,

  name text not null,

  short_name text,

  kind public.agency_kind not null,

  is_active boolean not null default true,

  created_at timestamptz not null default now(),

  updated_at timestamptz not null default now(),

  constraint agencies_code_format
    check (code ~ '^[A-Z][A-Z0-9_]*$')
);

create trigger agencies_set_updated_at
before update on public.agencies
for each row
execute function public.set_updated_at();

-- ============================================================
-- USER PROFILE
-- ============================================================

create table public.profiles (
  id uuid primary key
    references auth.users(id)
    on delete cascade,

  full_name text,

  role_id uuid not null
    constraint profiles_role_fk
    references public.roles(role_id),

  agency_id uuid
    constraint profiles_agency_fk
    references public.agencies(agency_id),

  is_active boolean not null default true,

  created_at timestamptz not null default now(),

  updated_at timestamptz not null default now()
);

create index profiles_role_ix
  on public.profiles(role_id);

create index profiles_agency_ix
  on public.profiles(agency_id);

create trigger profiles_set_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

-- ============================================================
-- REGION
-- ============================================================

create table public.regions (
  region_id uuid primary key default gen_random_uuid(),

  parent_id uuid
    references public.regions(region_id),

  code text not null unique,

  bps_code text unique,

  name text not null,

  region_type public.region_type not null,

  sort_order integer not null default 0,

  is_active boolean not null default true,

  created_at timestamptz not null default now(),

  updated_at timestamptz not null default now(),

  constraint regions_code_format
    check (code ~ '^[A-Z0-9_-]+$'),

  constraint regions_parent_check
    check (
      (region_type = 'COUNTRY' and parent_id is null)
      or
      (region_type <> 'COUNTRY' and parent_id is not null)
    )
);

create index regions_parent_ix
  on public.regions(parent_id);

create index regions_type_ix
  on public.regions(region_type);

create trigger regions_set_updated_at
before update on public.regions
for each row
execute function public.set_updated_at();

-- ============================================================
-- PROGRAM
-- ============================================================

create table public.programs (
  program_id uuid primary key default gen_random_uuid(),

  code text not null unique,

  name text not null,

  full_name text not null,

  family public.program_family not null,

  steward_agency_id uuid not null
    constraint programs_steward_agency_fk
    references public.agencies(agency_id),

  cost_bearer public.cost_bearer not null,

  unit_label text,

  legal_basis text,

  is_active boolean not null default true,

  active_from date,

  active_to date,

  created_at timestamptz not null default now(),

  updated_at timestamptz not null default now(),

  constraint programs_code_format
    check (code ~ '^[A-Z][A-Z0-9_]*$'),

  constraint programs_active_period_check
    check (
      active_to is null
      or active_from is null
      or active_to >= active_from
    )
);

create index programs_steward_ix
  on public.programs(steward_agency_id);

create trigger programs_set_updated_at
before update on public.programs
for each row
execute function public.set_updated_at();

-- ============================================================
-- PROGRAM AGENCY
-- ============================================================

create table public.program_agencies (
  program_id uuid not null
    references public.programs(program_id)
    on delete cascade,

  agency_id uuid not null
    references public.agencies(agency_id),

  role public.program_agency_role not null,

  created_at timestamptz not null default now(),

  primary key (
    program_id,
    agency_id,
    role
  )
);

create index program_agencies_agency_ix
  on public.program_agencies(agency_id);

-- ============================================================
-- PERIOD
-- ============================================================

create table public.periods (
  period_id uuid primary key default gen_random_uuid(),

  code text not null unique,

  label text not null,

  period_type public.period_type not null,

  fiscal_year smallint not null,

  month smallint,

  quarter smallint,

  starts_on date not null,

  ends_on date not null,

  is_closed boolean not null default false,

  created_at timestamptz not null default now(),

  updated_at timestamptz not null default now(),

  constraint periods_date_check
    check (ends_on >= starts_on),

  constraint periods_month_check
    check (
      month is null
      or month between 1 and 12
    ),

  constraint periods_quarter_check
    check (
      quarter is null
      or quarter between 1 and 4
    )
);

create index periods_year_ix
  on public.periods(fiscal_year, starts_on);

create trigger periods_set_updated_at
before update on public.periods
for each row
execute function public.set_updated_at();

-- ============================================================
-- INTEGRATION SOURCES
-- ============================================================

create table public.integration_sources (
  integration_source_id uuid primary key
    default gen_random_uuid(),

  agency_id uuid not null
    references public.agencies(agency_id),

  code text not null unique,

  name text not null,

  source_type public.integration_source_type
    not null default 'MOCK',

  status public.integration_source_status
    not null default 'MOCK',

  adapter_key text not null unique,

  base_url text,

  schedule_cron text not null default '0 0 * * *',

  timezone text not null default 'Asia/Jakarta',

  is_enabled boolean not null default true,

  last_synced_at timestamptz,

  created_at timestamptz not null default now(),

  updated_at timestamptz not null default now(),

  constraint integration_sources_code_format
    check (code ~ '^[A-Z][A-Z0-9_]*$')
);

create index integration_sources_agency_ix
  on public.integration_sources(agency_id);

create index integration_sources_status_ix
  on public.integration_sources(status);

create trigger integration_sources_set_updated_at
before update on public.integration_sources
for each row
execute function public.set_updated_at();

-- ============================================================
-- AUTH PROFILE TRIGGER
-- ============================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  default_role_id uuid;
begin

  select role_id
    into default_role_id
  from public.roles
  where code = 'UNASSIGNED';

  if default_role_id is null then
    raise exception 'UNASSIGNED role is not configured';
  end if;

  insert into public.profiles (
    id,
    full_name,
    role_id
  )
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data ->> 'full_name',
      split_part(new.email, '@', 1)
    ),
    default_role_id
  )
  on conflict (id) do nothing;

  return new;

end;
$$;

drop trigger if exists
  on_auth_user_created
  on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute procedure public.handle_new_user();

-- Backfill user yang sudah dibuat pada Sprint 1.

insert into public.profiles (
  id,
  full_name,
  role_id
)
select
  u.id,
  coalesce(
    u.raw_user_meta_data ->> 'full_name',
    split_part(u.email, '@', 1)
  ),
  r.role_id
from auth.users u
cross join public.roles r
where r.code = 'UNASSIGNED'
on conflict (id) do nothing;

-- ============================================================
-- AUTHORIZATION HELPERS
-- ============================================================

create or replace function private.current_user_role_code()
returns text
language sql
stable
security definer
set search_path = ''
as $$
  select r.code
  from public.profiles p
  join public.roles r
    on r.role_id = p.role_id
  where p.id = (select auth.uid())
    and p.is_active = true
  limit 1;
$$;

create or replace function private.current_user_agency_id()
returns uuid
language sql
stable
security definer
set search_path = ''
as $$
  select p.agency_id
  from public.profiles p
  where p.id = (select auth.uid())
    and p.is_active = true
  limit 1;
$$;

create or replace function private.is_super_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select
    coalesce(
      private.current_user_role_code()
        = 'SUPER_ADMIN',
      false
    );
$$;

create or replace function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select
    coalesce(
      private.current_user_role_code()
      in (
        'SUPER_ADMIN',
        'APN_ADMIN'
      ),
      false
    );
$$;

create or replace function private.is_active_nadi_user()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select
    coalesce(
      private.current_user_role_code()
        <> 'UNASSIGNED',
      false
    );
$$;

create or replace function private.can_read_program(
  target_program_id uuid
)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select
    case

      when private.current_user_role_code()
        in (
          'SUPER_ADMIN',
          'APN_ADMIN',
          'APN_ANALYST',
          'AUDITOR',
          'EXECUTIVE'
        )
      then true

      when private.current_user_role_code()
        = 'KL_VIEWER'
      then exists (
        select 1
        from public.programs p
        where p.program_id = target_program_id
        and (
          p.steward_agency_id =
            private.current_user_agency_id()

          or exists (
            select 1
            from public.program_agencies pa
            where pa.program_id = p.program_id
              and pa.agency_id =
                private.current_user_agency_id()
          )
        )
      )

      else false

    end;
$$;

create or replace function private.can_read_data_sources()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select
    coalesce(
      private.current_user_role_code()
      in (
        'SUPER_ADMIN',
        'APN_ADMIN',
        'APN_ANALYST',
        'AUDITOR',
        'EXECUTIVE'
      ),
      false
    );
$$;

grant usage on schema private to authenticated;

grant execute
on all functions in schema private
to authenticated;

-- ============================================================
-- ENABLE RLS
-- ============================================================

alter table public.roles
  enable row level security;

alter table public.profiles
  enable row level security;

alter table public.agencies
  enable row level security;

alter table public.regions
  enable row level security;

alter table public.programs
  enable row level security;

alter table public.program_agencies
  enable row level security;

alter table public.periods
  enable row level security;

alter table public.integration_sources
  enable row level security;

-- ============================================================
-- PRIVILEGES
-- ============================================================

revoke all
on all tables in schema public
from anon;

grant select
on public.roles,
   public.profiles,
   public.agencies,
   public.regions,
   public.programs,
   public.program_agencies,
   public.periods,
   public.integration_sources
to authenticated;

grant insert, update, delete
on public.agencies,
   public.regions,
   public.programs,
   public.program_agencies,
   public.periods,
   public.integration_sources
to authenticated;

grant update
on public.profiles
to authenticated;

-- ============================================================
-- RLS: ROLES
-- ============================================================

create policy roles_select
on public.roles
for select
to authenticated
using (
  (select private.is_active_nadi_user())
);

-- ============================================================
-- RLS: PROFILES
-- ============================================================

create policy profiles_select
on public.profiles
for select
to authenticated
using (
  id = (select auth.uid())
  or
  (select private.is_admin())
);

create policy profiles_update_admin
on public.profiles
for update
to authenticated
using (
  (select private.is_admin())
)
with check (
  (select private.is_admin())
);

-- ============================================================
-- RLS: AGENCIES
-- ============================================================

create policy agencies_select
on public.agencies
for select
to authenticated
using (
  (select private.is_active_nadi_user())
);

create policy agencies_manage
on public.agencies
for all
to authenticated
using (
  (select private.is_admin())
)
with check (
  (select private.is_admin())
);

-- ============================================================
-- RLS: REGIONS
-- ============================================================

create policy regions_select
on public.regions
for select
to authenticated
using (
  (select private.is_active_nadi_user())
);

create policy regions_manage
on public.regions
for all
to authenticated
using (
  (select private.is_admin())
)
with check (
  (select private.is_admin())
);

-- ============================================================
-- RLS: PROGRAMS
-- ============================================================

create policy programs_select
on public.programs
for select
to authenticated
using (
  (select private.can_read_program(program_id))
);

create policy programs_manage
on public.programs
for all
to authenticated
using (
  (select private.is_admin())
)
with check (
  (select private.is_admin())
);

-- ============================================================
-- RLS: PROGRAM AGENCIES
-- ============================================================

create policy program_agencies_select
on public.program_agencies
for select
to authenticated
using (
  (select private.can_read_program(program_id))
);

create policy program_agencies_manage
on public.program_agencies
for all
to authenticated
using (
  (select private.is_admin())
)
with check (
  (select private.is_admin())
);

-- ============================================================
-- RLS: PERIODS
-- ============================================================

create policy periods_select
on public.periods
for select
to authenticated
using (
  (select private.is_active_nadi_user())
);

create policy periods_manage
on public.periods
for all
to authenticated
using (
  (select private.is_admin())
)
with check (
  (select private.is_admin())
);

-- ============================================================
-- RLS: INTEGRATION SOURCES
-- ============================================================

create policy integration_sources_select
on public.integration_sources
for select
to authenticated
using (
  (select private.can_read_data_sources())
);

create policy integration_sources_manage
on public.integration_sources
for all
to authenticated
using (
  (select private.is_admin())
)
with check (
  (select private.is_admin())
);