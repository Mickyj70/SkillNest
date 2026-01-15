-- Ensure the 'level' column exists in the resources table
-- This fixes the "column 'level' not found in schema cache" error
do $$
begin
  if not exists (select 1 from information_schema.columns where table_name = 'resources' and column_name = 'level') then
    alter table resources add column level text default 'Beginner';
    
    -- Add the check constraint
    alter table resources add constraint resources_level_check 
      check (level in ('Beginner', 'Intermediate', 'Advanced'));
  end if;
end $$;
