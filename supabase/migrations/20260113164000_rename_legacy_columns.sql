-- Rename legacy columns in resources table to avoid naming conflicts with joins
do $$
begin
  if exists (select 1 from information_schema.columns where table_name = 'resources' and column_name = 'likes') then
    alter table resources rename column likes to likes_legacy;
  end if;
  
  if exists (select 1 from information_schema.columns where table_name = 'resources' and column_name = 'views') then
    alter table resources rename column views to views_legacy;
  end if;
end $$;

-- Update the view increment function to use the new column name
create or replace function increment_resource_views(resource_id uuid)
returns void as $$
begin
  update resources
  set views_legacy = coalesce(views_legacy, 0) + 1
  where id = resource_id;
end;
$$ language plpgsql security definer;
