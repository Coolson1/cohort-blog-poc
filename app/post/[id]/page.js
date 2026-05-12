import Link from 'next/link';
import { createSupabase } from '../../../lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const formatDate = (value) => new Date(value).toLocaleString();

export default async function PostDetailPage({ params }) {
  const { id } = params;
  const supabase = createSupabase();
  const { data, error } = await supabase.from('posts').select('*').eq('id', id).single();
  const post = data;

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900 py-14">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-10 flex flex-col gap-5 rounded-[2rem] border border-slate-200 bg-white/95 p-8 shadow-sm shadow-slate-200/50 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Post detail</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">Read the full update</h1>
          </div>
          <Link href="/" className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800">
            Back to list
          </Link>
        </div>

        {error || !post ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center text-red-700">
            Post not found.
          </div>
        ) : (
          <article className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/40">
            <div className="mb-4">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900">{post.author}</h2>
              <p className="mt-2 text-sm text-slate-500">{formatDate(post.created_at)}</p>
            </div>
            <div className="whitespace-pre-line text-base leading-8 text-slate-700">{post.body}</div>
          </article>
        )}
      </div>
    </main>
  );
}
