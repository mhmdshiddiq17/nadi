begin;

select plan(16);

-- Tables

select has_table(
  'public',
  'roles',
  'roles table exists'
);

select has_table(
  'public',
  'profiles',
  'profiles table exists'
);

select has_table(
  'public',
  'agencies',
  'agencies table exists'
);

select has_table(
  'public',
  'regions',
  'regions table exists'
);

select has_table(
  'public',
  'programs',
  'programs table exists'
);

select has_table(
  'public',
  'program_agencies',
  'program_agencies table exists'
);

select has_table(
  'public',
  'periods',
  'periods table exists'
);

select has_table(
  'public',
  'integration_sources',
  'integration_sources table exists'
);

-- Seed

select is(
  (
    select count(*)
    from public.roles
  ),
  7::bigint,
  '7 roles exist'
);

select is(
  (
    select count(*)
    from public.programs
  ),
  7::bigint,
  '7 NADI programs exist'
);

select is(
  (
    select count(*)
    from public.regions
    where region_type = 'PROVINCE'
  ),
  38::bigint,
  '38 provinces exist'
);

select is(
  (
    select count(*)
    from public.periods
  ),
  13::bigint,
  '12 monthly periods + FY2026 exist'
);

-- RLS

select ok(
  (
    select relrowsecurity
    from pg_class
    where oid =
      'public.profiles'::regclass
  ),
  'profiles RLS enabled'
);

select ok(
  (
    select relrowsecurity
    from pg_class
    where oid =
      'public.programs'::regclass
  ),
  'programs RLS enabled'
);

select ok(
  (
    select relrowsecurity
    from pg_class
    where oid =
      'public.regions'::regclass
  ),
  'regions RLS enabled'
);

select ok(
  (
    select relrowsecurity
    from pg_class
    where oid =
      'public.integration_sources'::regclass
  ),
  'integration_sources RLS enabled'
);

select *
from finish();

rollback;