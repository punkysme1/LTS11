create table if not exists public.turots_content (
  id uuid primary key default gen_random_uuid(),
  content_type text not null check (content_type in ('article', 'information', 'announcement')),
  slug text not null check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  title text not null check (char_length(btrim(title)) between 1 and 240),
  excerpt text not null default '' check (char_length(excerpt) <= 600),
  body text not null default '' check (char_length(body) <= 100000),
  cover_image_url text,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  featured boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (content_type, slug)
);

create index if not exists turots_content_publication_idx
  on public.turots_content (content_type, published_at desc)
  where status = 'published';

alter table public.turots_content enable row level security;
revoke all privileges on public.turots_content from public, anon, authenticated;
grant select on public.turots_content to anon, authenticated;
grant insert, update, delete on public.turots_content to authenticated;

drop policy if exists "public read published turots content" on public.turots_content;
create policy "public read published turots content" on public.turots_content
  for select to anon, authenticated using (status = 'published');

drop policy if exists "admins manage turots content" on public.turots_content;
create policy "admins manage turots content" on public.turots_content
  for all to authenticated
  using (exists (select 1 from public.turots_admins a where a.user_id = (select auth.uid())))
  with check (exists (select 1 from public.turots_admins a where a.user_id = (select auth.uid())));

create table if not exists public.turots_guestbook (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(btrim(name)) between 2 and 100),
  affiliation text check (affiliation is null or char_length(affiliation) <= 160),
  message text not null check (char_length(btrim(message)) between 4 and 2000),
  status text not null default 'pending' check (status in ('pending', 'accepted', 'rejected')),
  created_at timestamptz not null default now(),
  moderated_at timestamptz
);

create index if not exists turots_guestbook_status_created_idx
  on public.turots_guestbook (status, created_at desc);

alter table public.turots_guestbook enable row level security;
revoke all privileges on public.turots_guestbook from public, anon, authenticated;
grant select, insert on public.turots_guestbook to anon;
grant select, insert, update, delete on public.turots_guestbook to authenticated;

drop policy if exists "public read accepted guestbook entries" on public.turots_guestbook;
create policy "public read accepted guestbook entries" on public.turots_guestbook
  for select to anon, authenticated using (status = 'accepted');

drop policy if exists "visitors submit pending guestbook entries" on public.turots_guestbook;
create policy "visitors submit pending guestbook entries" on public.turots_guestbook
  for insert to anon, authenticated with check (status = 'pending');

drop policy if exists "admins read all guestbook entries" on public.turots_guestbook;
create policy "admins read all guestbook entries" on public.turots_guestbook
  for select to authenticated
  using (exists (select 1 from public.turots_admins a where a.user_id = (select auth.uid())));

drop policy if exists "admins moderate guestbook entries" on public.turots_guestbook;
create policy "admins moderate guestbook entries" on public.turots_guestbook
  for update to authenticated
  using (exists (select 1 from public.turots_admins a where a.user_id = (select auth.uid())))
  with check (exists (select 1 from public.turots_admins a where a.user_id = (select auth.uid())));

drop policy if exists "admins delete guestbook entries" on public.turots_guestbook;
create policy "admins delete guestbook entries" on public.turots_guestbook
  for delete to authenticated
  using (exists (select 1 from public.turots_admins a where a.user_id = (select auth.uid())));
