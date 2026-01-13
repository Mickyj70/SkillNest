-- Utility function to increment views
create or replace function increment_resource_views(resource_id uuid)
returns void as $$
begin
  update resources
  set views = views + 1
  where id = resource_id;
end;
$$ language plpgsql security definer;
