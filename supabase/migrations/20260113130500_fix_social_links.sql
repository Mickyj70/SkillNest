-- Link social tables to profiles instead of auth.users for easier joins in PostgREST

-- Fix Likes
alter table likes drop constraint if exists likes_user_id_fkey;
alter table likes 
add constraint likes_user_id_fkey 
foreign key (user_id) 
references profiles(id) 
on delete cascade;

-- Fix Bookmarks
alter table bookmarks drop constraint if exists bookmarks_user_id_fkey;
alter table bookmarks 
add constraint bookmarks_user_id_fkey 
foreign key (user_id) 
references profiles(id) 
on delete cascade;

-- Fix Comments
alter table comments drop constraint if exists comments_user_id_fkey;
alter table comments 
add constraint comments_user_id_fkey 
foreign key (user_id) 
references profiles(id) 
on delete cascade;

-- Ensure indices for performance
create index if not exists idx_likes_user_id on likes(user_id);
create index if not exists idx_bookmarks_user_id on bookmarks(user_id);
create index if not exists idx_comments_user_id on comments(user_id);
