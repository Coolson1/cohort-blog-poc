import Link from 'next/link';
import { createSupabase } from '../lib/supabase';

// Force dynamic rendering so new posts appear immediately
// after creation and the list is not cached.
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const formatDate = (value) => new Date(value).toLocaleString();
const truncate = (text, length = 140) => text.length > length ? `${text.slice(0, length)}...` : text;

export default async function HomePage() {
  // Fetch all posts from Supabase in descending order
  const supabase = createSupabase();
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900 py-14">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-10 rounded-[2rem] border border-slate-200 bg-white/95 p-8 shadow-sm shadow-slate-200/50">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">Cohort Blog</h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">A modern minimal blog to share cohort updates with your group.</p>
            </div>
            <Link href="/new" className="inline-flex items-center justify-center whitespace-nowrap rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800">
              Create Post
            </Link>
          </div>
        </div>

        <div className="space-y-5">
          {error && <p className="rounded-3xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">Unable to load posts.</p>}
          {posts?.length ? (
            posts.map((post) => (
              <Link key={post.id} href={`/post/${post.id}`} className="group block rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-slate-300">
                <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500">
                  <span className="font-medium text-slate-700">{post.author}</span>
                  <span>{formatDate(post.created_at)}</span>
                </div>
                <p className="mt-5 text-xl font-semibold leading-8 text-slate-900 group-hover:text-slate-800">{truncate(post.body, 140)}</p>
              </Link>
            ))
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
              No posts yet. Create the first one.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
