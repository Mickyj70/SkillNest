-- Add created_at to profiles if it's missing
alter table profiles 
add column if not exists created_at timestamp with time zone default now();

-- Update existing profiles to have a created_at value if they don't (optional but good)
update profiles set created_at = updated_at where created_at is null;
