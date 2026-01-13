-- Create a table for public profiles
create table if not exists profiles (
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

do $$
begin
  if not exists (select 1 from pg_policies where policyname = 'Public profiles are viewable by everyone.' and tablename = 'profiles') then
    create policy "Public profiles are viewable by everyone." on profiles for select using (true);
  end if;
  if not exists (select 1 from pg_policies where policyname = 'Users can insert their own profile.' and tablename = 'profiles') then
    create policy "Users can insert their own profile." on profiles for insert with check (auth.uid() = id);
  end if;
  if not exists (select 1 from pg_policies where policyname = 'Users can update own profile.' and tablename = 'profiles') then
    create policy "Users can update own profile." on profiles for update using (auth.uid() = id);
  end if;
end $$;

-- Create a trigger to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

do $$
begin
  if not exists (select 1 from pg_trigger where tgname = 'on_auth_user_created') then
    create trigger on_auth_user_created
      after insert on auth.users
      for each row execute procedure public.handle_new_user();
  end if;
end $$;

-- CATEGORIES TABLE
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  slug text unique not null,
  icon text,
  created_at timestamp with time zone default now()
);

alter table categories enable row level security;

do $$
begin
  if not exists (select 1 from pg_policies where policyname = 'Categories are viewable by everyone.' and tablename = 'categories') then
    create policy "Categories are viewable by everyone." on categories for select using (true);
  end if;
end $$;

-- SKILLS TABLE
create table if not exists skills (
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

do $$
begin
  if not exists (select 1 from pg_policies where policyname = 'Skills are viewable by everyone.' and tablename = 'skills') then
    create policy "Skills are viewable by everyone." on skills for select using (true);
  end if;
  if not exists (select 1 from pg_policies where policyname = 'Authenticated users can suggest skills.' and tablename = 'skills') then
    create policy "Authenticated users can suggest skills." on skills for insert with check (auth.role() = 'authenticated');
  end if;
end $$;

-- RESOURCES TABLE (Posts)
create table if not exists resources (
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

do $$
begin
  if not exists (select 1 from pg_policies where policyname = 'Public resources are viewable by everyone.' and tablename = 'resources') then
    create policy "Public resources are viewable by everyone." on resources for select using (status = 'published');
  end if;
  if not exists (select 1 from pg_policies where policyname = 'Users can view all their own resources.' and tablename = 'resources') then
    create policy "Users can view all their own resources." on resources for select using (auth.uid() = user_id);
  end if;
  if not exists (select 1 from pg_policies where policyname = 'Users can insert their own resources.' and tablename = 'resources') then
    create policy "Users can insert their own resources." on resources for insert with check (auth.uid() = user_id);
  end if;
  if not exists (select 1 from pg_policies where policyname = 'Users can update their own resources.' and tablename = 'resources') then
    create policy "Users can update their own resources." on resources for update using (auth.uid() = user_id);
  end if;
  if not exists (select 1 from pg_policies where policyname = 'Users can delete their own resources.' and tablename = 'resources') then
    create policy "Users can delete their own resources." on resources for delete using (auth.uid() = user_id);
  end if;
end $$;
