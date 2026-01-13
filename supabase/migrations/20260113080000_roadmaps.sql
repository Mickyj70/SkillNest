-- Roadmaps Table
create table if not exists roadmaps (
  id uuid primary key default gen_random_uuid(),
  skill_id uuid references skills(id) on delete cascade unique not null,
  title text not null,
  description text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Roadmap Steps (Modules/Chapters)
create table if not exists roadmap_steps (
  id uuid primary key default gen_random_uuid(),
  roadmap_id uuid references roadmaps(id) on delete cascade not null,
  title text not null,
  description text,
  order_index integer not null,
  created_at timestamp with time zone default now()
);

-- Roadmap Items (Connections to Resources)
create table if not exists roadmap_items (
  id uuid primary key default gen_random_uuid(),
  step_id uuid references roadmap_steps(id) on delete cascade not null,
  resource_id uuid references resources(id) on delete set null,
  title text, -- Override title if needed
  order_index integer not null,
  created_at timestamp with time zone default now()
);

-- RLS
alter table roadmaps enable row level security;
alter table roadmap_steps enable row level security;
alter table roadmap_items enable row level security;

-- Everyone can view
create policy "Roadmaps are viewable by everyone." on roadmaps for select using (true);
create policy "Roadmap steps are viewable by everyone." on roadmap_steps for select using (true);
create policy "Roadmap items are viewable by everyone." on roadmap_items for select using (true);

-- Only admins can manage (Admins handle everything in admin dashboard)
-- Note: Simplified for now, in production we'd use a more robust admin check
create policy "Admins can manage roadmaps." on roadmaps for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
create policy "Admins can manage roadmap_steps." on roadmap_steps for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
create policy "Admins can manage roadmap_items." on roadmap_items for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
