
select count(*) from public.roles;

select
  p.id,
  p.full_name,
  r.code as role

from public.profiles p

join public.roles r
  on r.role_id = p.role_id;

update public.profiles p

set role_id = r.role_id

from public.roles r,
     auth.users u

where p.id = u.id
  and u.email = 'superadmin@mail.com'
  and r.code = 'SUPER_ADMIN';

  select
  u.email,
  p.full_name,
  r.code as role

from public.profiles p

join auth.users u
  on u.id = p.id

join public.roles r
  on r.role_id = p.role_id;