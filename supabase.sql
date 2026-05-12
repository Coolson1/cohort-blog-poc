create extension if not exists pgcrypto;

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  author text not null,
  body text not null,
  created_at timestamp with time zone default now()
);

alter table public.posts enable row level security;

create policy "Allow all selects" on public.posts
  for select using (true);

create policy "Allow all inserts" on public.posts
  for insert with (true);

create policy "Allow all updates" on public.posts
  for update using (true);

create policy "Allow all deletes" on public.posts
  for delete using (true);
