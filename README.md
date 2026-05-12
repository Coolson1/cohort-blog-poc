# Cohort Blog

A simple blog proof-of-concept using Next.js App Router, Supabase Postgres, and Tailwind CSS.

## Setup

1. Copy `.env.local.example` to `.env.local`
2. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Install dependencies

```bash
npm install
```

4. Run the development server

```bash
npm run dev
```

## Supabase Table

Create a `posts` table with:

- `id` uuid primary key default `gen_random_uuid()`
- `author` text
- `body` text
- `created_at` timestamp default `now()`

If the table does not exist yet, run the SQL in `supabase.sql` from the Supabase SQL editor.

If you use row-level security, make sure the `posts` table has public select and insert policies enabled.

## Pages

- `/` — post list
- `/new` — create post
- `/post/[id]` — post detail
