-- menghitung region
select count(*)
from public.regions
where region_type = 'PROVINCE';

select count(*)
from public.regions;



-- mencari validasi user role
select
  u.email,
  p.full_name,
  r.code as role

from public.profiles p

join auth.users u
  on u.id = p.id

join public.roles r
  on r.role_id = p.role_id;