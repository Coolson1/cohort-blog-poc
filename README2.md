COHORT BLOG

WHAT IT DOES

This project is a minimal cohort blog proof-of-concept built with Next.js App Router and Supabase. It lets users create short posts, view the post list, and read each post in detail.

STACK

- Next.js (App Router)
- React
- Tailwind CSS
- Supabase (Postgres)
- @supabase/supabase-js

HOW TO RUN LOCALLY

1. Copy `.env.local.example` to `.env.local`
2. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` and go to "supabase.sql" file in the project copy and paste the instructions in you supabase SQL Editor. 

note: And after creation of a post try refreshing the page.

3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the local development server:
   ```bash
   npm run dev
   ```
5. Open the app in your browser at `http://127.0.0.1:3000`

ONE THING AI GOT WRONG

The AI originally did not ensure the create-post form redirected back to the blog list after submission. I fixed that by updating the form handler to use `await router.replace('/')` so users return directly to the homepage after creating a post.
