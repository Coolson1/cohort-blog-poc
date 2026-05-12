create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  author text not null,
  body text not null,
  created_at timestamp default now()
);

alter table public.posts enable row level security;

create policy "Allow public insert"
on public.posts
for insert
with check (true);

create policy "Allow public select"
on public.posts
for select
using (true);