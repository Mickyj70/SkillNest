-- Create a table for public profiles
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text,
  bio text,
  role text default 'user' check (role in ('user', 'admin')),

  constraint username_length check (char_length(username) >= 3)
);

-- Set up Row Level Security (RLS)
alter table profiles
  enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- Create a trigger to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security modeller;

  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- CATEGORIES TABLE
create table categories (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  slug text unique not null,
  icon text,
  created_at timestamp with time zone default now()
);

alter table categories enable row level security;

-- Everyone can view categories
create policy "Categories are viewable by everyone." on categories
  for select using (true);
-- Only admins can insert/update (For now, we'll allow all auth users to insert for development if needed, but per plan admins approve. We'll stick to admin-only write or seed data for now, but let's allow read for all)


-- SKILLS TABLE
create table skills (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  slug text unique not null,
  category_id uuid references categories(id) on delete cascade,
  description text,
  official_link text,
  color text, -- For UI representation
  icon_name text, -- Lucide icon name string
  status text default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamp with time zone default now()
);

alter table skills enable row level security;

create policy "Skills are viewable by everyone." on skills
  for select using (true);

create policy "Authenticated users can suggest skills." on skills
  for insert with check (auth.role() = 'authenticated');


-- RESOURCES TABLE (Posts)
create table resources (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  skill_id uuid references skills(id) on delete set null,
  title text not null,
  description text,
  url text,
  type text check (type in ('Article', 'Video', 'Course', 'Book', 'Tool')),
  level text default 'Beginner' check (level in ('Beginner', 'Intermediate', 'Advanced')),
  status text default 'published' check (status in ('published', 'draft', 'archived')),
  views integer default 0,
  likes integer default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table resources enable row level security;

create policy "Public resources are viewable by everyone." on resources
  for select using (status = 'published');

create policy "Users can view all their own resources." on resources
  for select using (auth.uid() = user_id);

create policy "Users can insert their own resources." on resources
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own resources." on resources
  for update using (auth.uid() = user_id);

create policy "Users can delete their own resources." on resources
  for delete using (auth.uid() = user_id);
