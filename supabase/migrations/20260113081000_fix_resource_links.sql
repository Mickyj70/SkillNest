-- Link resources directly to profiles instead of auth.users for easier joins in PostgREST
alter table resources drop constraint if exists resources_user_id_fkey;

alter table resources
add constraint resources_user_id_fkey
foreign key (user_id)
references profiles(id)
on delete cascade;

-- Ensure indices for performance
create index if not exists idx_resources_user_id on resources(user_id);
create index if not exists idx_resources_skill_id on resources(skill_id);
