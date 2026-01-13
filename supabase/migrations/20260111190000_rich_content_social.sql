-- Add rich content fields to resources
do $$
begin
  if not exists (select 1 from information_schema.columns where table_name = 'resources' and column_name = 'content') then
    alter table resources add column content text;
  end if;
  if not exists (select 1 from information_schema.columns where table_name = 'resources' and column_name = 'learning_points') then
    alter table resources add column learning_points jsonb default '[]'::jsonb;
  end if;
  if not exists (select 1 from information_schema.columns where table_name = 'resources' and column_name = 'thumbnail_url') then
    alter table resources add column thumbnail_url text;
  end if;
  if not exists (select 1 from information_schema.columns where table_name = 'resources' and column_name = 'duration') then
    alter table resources add column duration text;
  end if;
end $$;

-- Create likes table
create table if not exists likes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  resource_id uuid references resources(id) on delete cascade not null,
  created_at timestamp with time zone default now(),
  unique(user_id, resource_id)
);

alter table likes enable row level security;

do $$
begin
  if not exists (select 1 from pg_policies where policyname = 'Likes are viewable by everyone.' and tablename = 'likes') then
    create policy "Likes are viewable by everyone." on likes for select using (true);
  end if;
  if not exists (select 1 from pg_policies where policyname = 'Authenticated users can toggle likes.' and tablename = 'likes') then
    create policy "Authenticated users can toggle likes." on likes for insert with check (auth.uid() = user_id);
  end if;
  if not exists (select 1 from pg_policies where policyname = 'Users can remove their own likes.' and tablename = 'likes') then
    create policy "Users can remove their own likes." on likes for delete using (auth.uid() = user_id);
  end if;
end $$;

-- Create bookmarks table
create table if not exists bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  resource_id uuid references resources(id) on delete cascade not null,
  created_at timestamp with time zone default now(),
  unique(user_id, resource_id)
);

alter table bookmarks enable row level security;

do $$
begin
  if not exists (select 1 from pg_policies where policyname = 'Bookmarks are private.' and tablename = 'bookmarks') then
    create policy "Bookmarks are private." on bookmarks for select using (auth.uid() = user_id);
  end if;
  if not exists (select 1 from pg_policies where policyname = 'Authenticated users can toggle bookmarks.' and tablename = 'bookmarks') then
    create policy "Authenticated users can toggle bookmarks." on bookmarks for insert with check (auth.uid() = user_id);
  end if;
  if not exists (select 1 from pg_policies where policyname = 'Users can remove their own bookmarks.' and tablename = 'bookmarks') then
    create policy "Users can remove their own bookmarks." on bookmarks for delete using (auth.uid() = user_id);
  end if;
end $$;

-- Create comments table (for richness)
create table if not exists comments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  resource_id uuid references resources(id) on delete cascade not null,
  content text not null,
  created_at timestamp with time zone default now()
);

alter table comments enable row level security;

do $$
begin
  if not exists (select 1 from pg_policies where policyname = 'Comments are viewable by everyone.' and tablename = 'comments') then
    create policy "Comments are viewable by everyone." on comments for select using (true);
  end if;
  if not exists (select 1 from pg_policies where policyname = 'Authenticated users can comment.' and tablename = 'comments') then
    create policy "Authenticated users can comment." on comments for insert with check (auth.uid() = user_id);
  end if;
  if not exists (select 1 from pg_policies where policyname = 'Users can update/delete their own comments.' and tablename = 'comments') then
    create policy "Users can update/delete their own comments." on comments for all using (auth.uid() = user_id);
  end if;
end $$;
