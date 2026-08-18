-- ============================================================
-- NADI MASTER DATA SEED
-- ============================================================

-- ============================================================
-- AGENCIES
-- ============================================================

insert into public.agencies (
  code,
  name,
  short_name,
  kind
)
values

(
  'APN',
  'PT Agrinas Pangan Nusantara (Persero)',
  'APN',
  'INTERNAL'
),

(
  'BAPANAS',
  'Badan Pangan Nasional',
  'Bapanas',
  'KL'
),

(
  'ESDM',
  'Kementerian Energi dan Sumber Daya Mineral',
  'Kementerian ESDM',
  'KL'
),

(
  'KEMENTAN',
  'Kementerian Pertanian',
  'Kementan',
  'KL'
),

(
  'KEMENDAG',
  'Kementerian Perdagangan',
  'Kemendag',
  'KL'
),

(
  'KEMENPERIN',
  'Kementerian Perindustrian',
  'Kemenperin',
  'KL'
),

(
  'KEMENSOS',
  'Kementerian Sosial',
  'Kemensos',
  'KL'
),

(
  'KEMENKEU',
  'Kementerian Keuangan',
  'Kemenkeu',
  'KL'
),

(
  'KEMENDAGRI',
  'Kementerian Dalam Negeri',
  'Kemendagri',
  'KL'
),

(
  'BPS',
  'Badan Pusat Statistik',
  'BPS',
  'KL'
),

(
  'BULOG',
  'Perum BULOG',
  'BULOG',
  'BUMN'
),

(
  'PERTAMINA_PN',
  'PT Pertamina Patra Niaga',
  'Pertamina Patra Niaga',
  'BUMN'
),

(
  'PUPUK_INDONESIA',
  'PT Pupuk Indonesia (Persero)',
  'Pupuk Indonesia',
  'BUMN'
),

(
  'BRI',
  'PT Bank Rakyat Indonesia (Persero) Tbk',
  'BRI',
  'BANK'
),

(
  'BNI',
  'PT Bank Negara Indonesia (Persero) Tbk',
  'BNI',
  'BANK'
),

(
  'MANDIRI',
  'PT Bank Mandiri (Persero) Tbk',
  'Mandiri',
  'BANK'
),

(
  'BTN',
  'PT Bank Tabungan Negara (Persero) Tbk',
  'BTN',
  'BANK'
),

(
  'BPK',
  'Badan Pemeriksa Keuangan',
  'BPK',
  'AUDITOR'
),

(
  'BPKP',
  'Badan Pengawasan Keuangan dan Pembangunan',
  'BPKP',
  'AUDITOR'
)

on conflict (code)
do update set

  name = excluded.name,
  short_name = excluded.short_name,
  kind = excluded.kind,
  is_active = true;

-- ============================================================
-- INDONESIA ROOT REGION
-- ============================================================

insert into public.regions (
  code,
  name,
  region_type,
  sort_order
)
values (
  'ID',
  'Indonesia',
  'COUNTRY',
  0
)
on conflict (code)
do update set
  name = excluded.name,
  is_active = true;

-- ============================================================
-- 38 PROVINCES
-- ============================================================

insert into public.regions (
  code,
  name,
  region_type,
  parent_id,
  sort_order
)
values

('ID-ACEH', 'Aceh', 'PROVINCE',
 (select region_id from public.regions where code = 'ID'), 1),

('ID-SUMUT', 'Sumatera Utara', 'PROVINCE',
 (select region_id from public.regions where code = 'ID'), 2),

('ID-SUMBAR', 'Sumatera Barat', 'PROVINCE',
 (select region_id from public.regions where code = 'ID'), 3),

('ID-RIAU', 'Riau', 'PROVINCE',
 (select region_id from public.regions where code = 'ID'), 4),

('ID-JAMBI', 'Jambi', 'PROVINCE',
 (select region_id from public.regions where code = 'ID'), 5),

('ID-SUMSEL', 'Sumatera Selatan', 'PROVINCE',
 (select region_id from public.regions where code = 'ID'), 6),

('ID-BENGKULU', 'Bengkulu', 'PROVINCE',
 (select region_id from public.regions where code = 'ID'), 7),

('ID-LAMPUNG', 'Lampung', 'PROVINCE',
 (select region_id from public.regions where code = 'ID'), 8),

('ID-BABEL', 'Kepulauan Bangka Belitung', 'PROVINCE',
 (select region_id from public.regions where code = 'ID'), 9),

('ID-KEPRI', 'Kepulauan Riau', 'PROVINCE',
 (select region_id from public.regions where code = 'ID'), 10),

('ID-JAKARTA', 'DKI Jakarta', 'PROVINCE',
 (select region_id from public.regions where code = 'ID'), 11),

('ID-JABAR', 'Jawa Barat', 'PROVINCE',
 (select region_id from public.regions where code = 'ID'), 12),

('ID-JATENG', 'Jawa Tengah', 'PROVINCE',
 (select region_id from public.regions where code = 'ID'), 13),

('ID-DIY', 'DI Yogyakarta', 'PROVINCE',
 (select region_id from public.regions where code = 'ID'), 14),

('ID-JATIM', 'Jawa Timur', 'PROVINCE',
 (select region_id from public.regions where code = 'ID'), 15),

('ID-BANTEN', 'Banten', 'PROVINCE',
 (select region_id from public.regions where code = 'ID'), 16),

('ID-BALI', 'Bali', 'PROVINCE',
 (select region_id from public.regions where code = 'ID'), 17),

('ID-NTB', 'Nusa Tenggara Barat', 'PROVINCE',
 (select region_id from public.regions where code = 'ID'), 18),

('ID-NTT', 'Nusa Tenggara Timur', 'PROVINCE',
 (select region_id from public.regions where code = 'ID'), 19),

('ID-KALBAR', 'Kalimantan Barat', 'PROVINCE',
 (select region_id from public.regions where code = 'ID'), 20),

('ID-KALTENG', 'Kalimantan Tengah', 'PROVINCE',
 (select region_id from public.regions where code = 'ID'), 21),

('ID-KALSEL', 'Kalimantan Selatan', 'PROVINCE',
 (select region_id from public.regions where code = 'ID'), 22),

('ID-KALTIM', 'Kalimantan Timur', 'PROVINCE',
 (select region_id from public.regions where code = 'ID'), 23),

('ID-KALTARA', 'Kalimantan Utara', 'PROVINCE',
 (select region_id from public.regions where code = 'ID'), 24),

('ID-SULUT', 'Sulawesi Utara', 'PROVINCE',
 (select region_id from public.regions where code = 'ID'), 25),

('ID-SULTENG', 'Sulawesi Tengah', 'PROVINCE',
 (select region_id from public.regions where code = 'ID'), 26),

('ID-SULSEL', 'Sulawesi Selatan', 'PROVINCE',
 (select region_id from public.regions where code = 'ID'), 27),

('ID-SULTRA', 'Sulawesi Tenggara', 'PROVINCE',
 (select region_id from public.regions where code = 'ID'), 28),

('ID-GORONTALO', 'Gorontalo', 'PROVINCE',
 (select region_id from public.regions where code = 'ID'), 29),

('ID-SULBAR', 'Sulawesi Barat', 'PROVINCE',
 (select region_id from public.regions where code = 'ID'), 30),

('ID-MALUKU', 'Maluku', 'PROVINCE',
 (select region_id from public.regions where code = 'ID'), 31),

('ID-MALUT', 'Maluku Utara', 'PROVINCE',
 (select region_id from public.regions where code = 'ID'), 32),

('ID-PABAR', 'Papua Barat', 'PROVINCE',
 (select region_id from public.regions where code = 'ID'), 33),

('ID-PBD', 'Papua Barat Daya', 'PROVINCE',
 (select region_id from public.regions where code = 'ID'), 34),

('ID-PAPUA', 'Papua', 'PROVINCE',
 (select region_id from public.regions where code = 'ID'), 35),

('ID-PASEL', 'Papua Selatan', 'PROVINCE',
 (select region_id from public.regions where code = 'ID'), 36),

('ID-PATENG', 'Papua Tengah', 'PROVINCE',
 (select region_id from public.regions where code = 'ID'), 37),

('ID-PAPEG', 'Papua Pegunungan', 'PROVINCE',
 (select region_id from public.regions where code = 'ID'), 38)

on conflict (code)
do update set
  name = excluded.name,
  parent_id = excluded.parent_id,
  sort_order = excluded.sort_order,
  is_active = true;

-- ============================================================
-- PROGRAMS
-- ============================================================

insert into public.programs (
  code,
  name,
  full_name,
  family,
  steward_agency_id,
  cost_bearer,
  unit_label,
  active_from
)
values

(
  'SPHP',
  'Beras SPHP',
  'Stabilisasi Pasokan dan Harga Pangan - Beras',
  'SUBSIDI',
  (select agency_id from public.agencies where code = 'BAPANAS'),
  'APBN_CBP',
  'kg',
  '2026-01-01'
),

(
  'LPG3',
  'LPG 3 Kg',
  'LPG Tabung 3 Kilogram',
  'SUBSIDI',
  (select agency_id from public.agencies where code = 'ESDM'),
  'APBN',
  'tabung',
  '2026-01-01'
),

(
  'PUPUK',
  'Pupuk Bersubsidi',
  'Program Pupuk Bersubsidi',
  'SUBSIDI',
  (select agency_id from public.agencies where code = 'KEMENTAN'),
  'APBN',
  'kg',
  '2026-01-01'
),

(
  'MGR',
  'MinyakKita',
  'Minyak Goreng Rakyat - MinyakKita',
  'DMO',
  (select agency_id from public.agencies where code = 'KEMENDAG'),
  'PELAKU_USAHA',
  'liter',
  '2026-01-01'
),

(
  'BPB',
  'Bantuan Pangan Beras',
  'Bantuan Pangan Beras',
  'BANTUAN',
  (select agency_id from public.agencies where code = 'BAPANAS'),
  'APBN',
  'kg',
  '2026-01-01'
),

(
  'BPNT',
  'Bantuan Sembako',
  'Bantuan Pangan Non Tunai / Bantuan Sembako',
  'BANTUAN',
  (select agency_id from public.agencies where code = 'KEMENSOS'),
  'APBN',
  'rupiah',
  '2026-01-01'
),

(
  'ALSIN',
  'Bantuan Alsintan & Saprodi',
  'Bantuan Alat Mesin Pertanian dan Sarana Produksi',
  'BANTUAN',
  (select agency_id from public.agencies where code = 'KEMENTAN'),
  'APBN',
  'unit',
  '2026-01-01'
)

on conflict (code)
do update set

  name = excluded.name,
  full_name = excluded.full_name,
  family = excluded.family,
  steward_agency_id = excluded.steward_agency_id,
  cost_bearer = excluded.cost_bearer,
  unit_label = excluded.unit_label,
  is_active = true;

-- ============================================================
-- PROGRAM AGENCY RELATIONS
-- ============================================================

insert into public.program_agencies (
  program_id,
  agency_id,
  role
)
values

(
  (select program_id from public.programs where code = 'SPHP'),
  (select agency_id from public.agencies where code = 'BULOG'),
  'DATA_PROVIDER'
),

(
  (select program_id from public.programs where code = 'LPG3'),
  (select agency_id from public.agencies where code = 'PERTAMINA_PN'),
  'DATA_PROVIDER'
),

(
  (select program_id from public.programs where code = 'PUPUK'),
  (select agency_id from public.agencies where code = 'PUPUK_INDONESIA'),
  'DATA_PROVIDER'
),

(
  (select program_id from public.programs where code = 'MGR'),
  (select agency_id from public.agencies where code = 'KEMENPERIN'),
  'DATA_PROVIDER'
),

(
  (select program_id from public.programs where code = 'BPB'),
  (select agency_id from public.agencies where code = 'BULOG'),
  'DATA_PROVIDER'
),

(
  (select program_id from public.programs where code = 'BPNT'),
  (select agency_id from public.agencies where code = 'BRI'),
  'PAYER'
),

(
  (select program_id from public.programs where code = 'BPNT'),
  (select agency_id from public.agencies where code = 'BNI'),
  'PAYER'
),

(
  (select program_id from public.programs where code = 'BPNT'),
  (select agency_id from public.agencies where code = 'MANDIRI'),
  'PAYER'
),

(
  (select program_id from public.programs where code = 'BPNT'),
  (select agency_id from public.agencies where code = 'BTN'),
  'PAYER'
)

on conflict do nothing;

-- APN sebagai operator lintas program.

insert into public.program_agencies (
  program_id,
  agency_id,
  role
)

select
  p.program_id,
  a.agency_id,
  'OPERATOR'::public.program_agency_role

from public.programs p
cross join public.agencies a

where a.code = 'APN'

on conflict do nothing;

-- ============================================================
-- PERIOD 2026
-- ============================================================

insert into public.periods (
  code,
  label,
  period_type,
  fiscal_year,
  month,
  starts_on,
  ends_on
)
values

('2026-01','Januari 2026','MONTHLY',2026,1,'2026-01-01','2026-01-31'),
('2026-02','Februari 2026','MONTHLY',2026,2,'2026-02-01','2026-02-28'),
('2026-03','Maret 2026','MONTHLY',2026,3,'2026-03-01','2026-03-31'),
('2026-04','April 2026','MONTHLY',2026,4,'2026-04-01','2026-04-30'),
('2026-05','Mei 2026','MONTHLY',2026,5,'2026-05-01','2026-05-31'),
('2026-06','Juni 2026','MONTHLY',2026,6,'2026-06-01','2026-06-30'),
('2026-07','Juli 2026','MONTHLY',2026,7,'2026-07-01','2026-07-31'),
('2026-08','Agustus 2026','MONTHLY',2026,8,'2026-08-01','2026-08-31'),
('2026-09','September 2026','MONTHLY',2026,9,'2026-09-01','2026-09-30'),
('2026-10','Oktober 2026','MONTHLY',2026,10,'2026-10-01','2026-10-31'),
('2026-11','November 2026','MONTHLY',2026,11,'2026-11-01','2026-11-30'),
('2026-12','Desember 2026','MONTHLY',2026,12,'2026-12-01','2026-12-31'),

(
  'FY2026',
  'Tahun 2026',
  'YEARLY',
  2026,
  null,
  '2026-01-01',
  '2026-12-31'
)

on conflict (code)
do update set
  label = excluded.label,
  starts_on = excluded.starts_on,
  ends_on = excluded.ends_on;

-- ============================================================
-- INTEGRATION SOURCE REGISTRY
-- ============================================================

insert into public.integration_sources (
  agency_id,
  code,
  name,
  source_type,
  status,
  adapter_key,
  schedule_cron,
  timezone
)
values

(
  (select agency_id from public.agencies where code = 'BPS'),
  'BPS',
  'BPS Data Source',
  'MOCK',
  'MOCK',
  'mock.bps',
  '0 0 * * *',
  'Asia/Jakarta'
),

(
  (select agency_id from public.agencies where code = 'BULOG'),
  'KLIKSPHP',
  'KlikSPHP',
  'MOCK',
  'MOCK',
  'mock.klik_sphp',
  '0 0 * * *',
  'Asia/Jakarta'
),

(
  (select agency_id from public.agencies where code = 'PERTAMINA_PN'),
  'MAP_SUBSIDI_TEPAT',
  'MAP Subsidi Tepat',
  'MOCK',
  'MOCK',
  'mock.map_subsidi_tepat',
  '0 0 * * *',
  'Asia/Jakarta'
),

(
  (select agency_id from public.agencies where code = 'PUPUK_INDONESIA'),
  'IPUBERS',
  'i-Pubers',
  'MOCK',
  'MOCK',
  'mock.ipubers',
  '0 0 * * *',
  'Asia/Jakarta'
),

(
  (select agency_id from public.agencies where code = 'KEMENDAG'),
  'SIMIRAH2',
  'SIMIRAH 2 / SIINas',
  'MOCK',
  'MOCK',
  'mock.simirah2',
  '0 0 * * *',
  'Asia/Jakarta'
),

(
  (select agency_id from public.agencies where code = 'KEMENSOS'),
  'SIKS_NG',
  'SIKS-NG',
  'MOCK',
  'MOCK',
  'mock.siks_ng',
  '0 0 * * *',
  'Asia/Jakarta'
),

(
  (select agency_id from public.agencies where code = 'KEMENKEU'),
  'SPAN_OMSPAN',
  'SPAN / OM-SPAN',
  'MOCK',
  'MOCK',
  'mock.span_omspan',
  '0 0 * * *',
  'Asia/Jakarta'
),

(
  (select agency_id from public.agencies where code = 'APN'),
  'APN_INTERNAL',
  'APN Internal Systems',
  'MOCK',
  'MOCK',
  'mock.apn_internal',
  '0 0 * * *',
  'Asia/Jakarta'
)

on conflict (code)
do update set
  name = excluded.name,
  agency_id = excluded.agency_id,
  adapter_key = excluded.adapter_key;


-- ============================================================
-- SPRINT 3
-- DUMMY FINANCIAL DATA
-- ============================================================

-- ============================================================
-- ANNUAL ALLOCATION
--
-- Target:
-- Rp10.000.000.000 per program
-- 38 provinces
-- deterministic weighted allocation
-- ============================================================

with program_seed as (

  select
    p.program_id,
    p.code as program_code,

    row_number()
      over (
        order by p.code
      )::integer
      as seed_no

  from public.programs p

  where p.is_active = true
),

province_scores as (

  select
    ps.program_id,
    ps.program_code,
    ps.seed_no,

    r.region_id,
    r.code as region_code,
    r.sort_order,

    (
      50
      +
      mod(
        r.sort_order * 37,
        51
      )
    )::numeric
      as population_index,

    (
      40
      +
      mod(
        (
          r.sort_order
          +
          ps.seed_no
        ) * 29,
        61
      )
    )::numeric
      as need_index,

    (
      45
      +
      mod(
        (
          (
            r.sort_order
            *
            ps.seed_no
          )
          +
          7
        ) * 17,
        56
      )
    )::numeric
      as distribution_index

  from program_seed ps

  cross join public.regions r

  where
    r.region_type = 'PROVINCE'
    and
    r.is_active = true
),

weighted_scores as (

  select
    *,

    (
      population_index * 0.50
      +
      need_index * 0.30
      +
      distribution_index * 0.20
    )::numeric
      as raw_score

  from province_scores
),

normalized as (

  select
    *,

    (
      raw_score
      /
      sum(raw_score)
        over (
          partition by program_id
        )
    ) as raw_weight,

    (
      10000000000::numeric
      *
      raw_score
      /
      sum(raw_score)
        over (
          partition by program_id
        )
    ) as raw_budget

  from weighted_scores
),

rounded as (

  select
    *,

    floor(
      raw_budget
    )::numeric
      as base_budget,

    (
      raw_budget
      -
      floor(raw_budget)
    ) as remainder_fraction

  from normalized
),

ranked as (

  select
    *,

    row_number()
      over (
        partition by program_id
        order by
          remainder_fraction desc,
          region_code
      )
      as remainder_rank,

    sum(base_budget)
      over (
        partition by program_id
      )
      as base_total

  from rounded
),

final_allocations as (

  select
    *,

    (
      base_budget
      +
      case
        when remainder_rank = 1
        then
          (
            10000000000::numeric
            -
            base_total
          )
        else 0
      end
    )::numeric(18,2)
      as final_budget

  from ranked
)

insert into public.program_allocations (
  program_id,
  region_id,

  fiscal_year,

  budget_amount,
  allocation_weight,

  allocation_method,

  source_system,
  source_ref,

  fetched_at,

  metadata
)

select
  program_id,
  region_id,

  2026,

  final_budget,

  (
    final_budget
    /
    10000000000::numeric
  )::numeric(12,10),

  'SYNTHETIC_WEIGHTED_V1',

  case program_code

    when 'SPHP'
      then 'KLIKSPHP'

    when 'LPG3'
      then 'MAP_SUBSIDI_TEPAT'

    when 'PUPUK'
      then 'IPUBERS'

    when 'MGR'
      then 'SIMIRAH2'

    when 'BPB'
      then 'KLIKSPHP'

    when 'BPNT'
      then 'SIKS_NG'

    when 'ALSIN'
      then 'APN_INTERNAL'

  end,

  concat(
    'MOCK-ALLOC-',
    program_code,
    '-',
    region_code,
    '-2026'
  ),

  '2026-08-18 00:00:00+07'::timestamptz,

  jsonb_build_object(
    'synthetic', true,
    'generator', 'NADI_DUMMY_V1',
    'population_index', population_index,
    'need_index', need_index,
    'distribution_index', distribution_index,
    'weight_model',
      jsonb_build_object(
        'population', 0.50,
        'need', 0.30,
        'distribution', 0.20
      )
  )

from final_allocations

on conflict (
  program_id,
  region_id,
  fiscal_year
)

do update set

  budget_amount =
    excluded.budget_amount,

  allocation_weight =
    excluded.allocation_weight,

  allocation_method =
    excluded.allocation_method,

  source_system =
    excluded.source_system,

  source_ref =
    excluded.source_ref,

  fetched_at =
    excluded.fetched_at,

  metadata =
    excluded.metadata;

-- ============================================================
-- REALISATION TARGET BY PROVINCE
-- ============================================================

with program_seed as (

  select
    p.program_id,
    p.code as program_code,

    row_number()
      over (
        order by p.code
      )::integer
      as seed_no

  from public.programs p

  where p.is_active = true
),

allocation_performance as (

  select
    a.allocation_id,
    a.program_id,
    a.region_id,

    a.budget_amount,

    a.source_system,

    ps.program_code,
    ps.seed_no,

    r.code as region_code,
    r.sort_order,

    (
      0.35
      +
      (
        mod(
          (
            r.sort_order * 13
            +
            ps.seed_no * 7
          ),
          41
        )::numeric
        /
        100
      )
    ) as performance_factor

  from public.program_allocations a

  join program_seed ps
    on ps.program_id =
       a.program_id

  join public.regions r
    on r.region_id =
       a.region_id

  where
    a.fiscal_year = 2026
),

raw_realisation as (

  select
    *,

    (
      budget_amount
      *
      performance_factor
    ) as raw_realisation

  from allocation_performance
),

normalized as (

  select
    *,

    (
      5000000000::numeric
      *
      raw_realisation
      /
      sum(raw_realisation)
        over (
          partition by program_id
        )
    ) as normalized_realisation

  from raw_realisation
),

rounded as (

  select
    *,

    floor(
      normalized_realisation
    )::numeric
      as base_realisation,

    (
      normalized_realisation
      -
      floor(normalized_realisation)
    ) as remainder_fraction

  from normalized
),

ranked as (

  select
    *,

    row_number()
      over (
        partition by program_id

        order by
          remainder_fraction desc,
          region_code
      )
      as remainder_rank,

    sum(base_realisation)
      over (
        partition by program_id
      )
      as base_total

  from rounded
),

final_realisation as (

  select
    *,

    (
      base_realisation
      +
      case

        when remainder_rank = 1

        then
          (
            5000000000::numeric
            -
            base_total
          )

        else 0

      end
    )::numeric(18,2)
      as final_realised_value

  from ranked
),

monthly_curve (
  month,
  cumulative_ratio
) as (

  values
    (1,  0.04::numeric),
    (2,  0.09::numeric),
    (3,  0.15::numeric),
    (4,  0.22::numeric),
    (5,  0.30::numeric),
    (6,  0.39::numeric),
    (7,  0.49::numeric),
    (8,  0.60::numeric),
    (9,  0.70::numeric),
    (10, 0.80::numeric),
    (11, 0.90::numeric),
    (12, 1.00::numeric)
),

cumulative_rows as (

  select
    fr.*,

    pr.period_id,
    pr.code as period_code,
    pr.month,
    pr.ends_on,

    mc.cumulative_ratio,

    case

      when pr.month = 12
      then
        fr.final_realised_value

      else
        floor(
          fr.final_realised_value
          *
          mc.cumulative_ratio
        )::numeric(18,2)

    end as cumulative_value

  from final_realisation fr

  cross join monthly_curve mc

  join public.periods pr
    on
      pr.fiscal_year = 2026
      and
      pr.period_type = 'MONTHLY'
      and
      pr.month = mc.month
),

monthly_rows as (

  select
    *,

    (
      cumulative_value
      -
      lag(
        cumulative_value,
        1,
        0::numeric
      )
      over (
        partition by allocation_id
        order by month
      )
    )::numeric(18,2)
      as period_value

  from cumulative_rows
)

insert into
public.program_realisation_snapshots (

  allocation_id,

  period_id,

  period_realised_value,

  cumulative_realised_value,

  source_system,

  source_ref,

  fetched_at,

  metadata
)

select

  allocation_id,

  period_id,

  period_value,

  cumulative_value,

  source_system,

  concat(
    'MOCK-REAL-',
    program_code,
    '-',
    region_code,
    '-',
    period_code
  ),

  (
    (
      ends_on::timestamp
      +
      interval '1 day'
    )
    at time zone 'Asia/Jakarta'
  ),

  jsonb_build_object(

    'synthetic', true,

    'generator',
      'NADI_DUMMY_V1',

    'performance_factor',
      performance_factor,

    'final_realised_value',
      final_realised_value,

    'cumulative_ratio',
      cumulative_ratio

  )

from monthly_rows

on conflict (
  allocation_id,
  period_id
)

do update set

  period_realised_value =
    excluded.period_realised_value,

  cumulative_realised_value =
    excluded.cumulative_realised_value,

  source_system =
    excluded.source_system,

  source_ref =
    excluded.source_ref,

  fetched_at =
    excluded.fetched_at,

  metadata =
    excluded.metadata;