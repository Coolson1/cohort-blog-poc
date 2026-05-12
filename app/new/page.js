'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createSupabase } from '../../lib/supabase';

export default function NewPostPage() {
  const router = useRouter();
  const [author, setAuthor] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    if (!author.trim() || !body.trim()) {
      setError('Author and body are required.');
      return;
    }
    setLoading(true);
    let supabase;

    try {
      supabase = createSupabase();
    } catch (clientError) {
      setLoading(false);
      setError(clientError.message);
      return;
    }

    const { error: insertError } = await supabase.from('posts').insert([{ author: author.trim(), body: body.trim() }]);
    setLoading(false);

    if (insertError) {
      console.error('Supabase insert error:', insertError);
      const permissionHint = insertError.message?.toLowerCase().includes('permission')
        ? ' Check your Supabase table policies or disable row level security for the posts table.'
        : '';
      setError(`Unable to create post: ${insertError.message}${insertError.details ? ` - ${insertError.details}` : ''}${permissionHint}`);
      return;
    }

    await router.replace('/');
  };

  return (
    <main className="min-h-screen bg-slate-100 py-14 text-slate-900">
      <div className="mx-auto max-w-2xl px-6">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Write for your cohort</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">Create a new post</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">Share your latest update in a clean, modern post layout.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50">
          {error && <p className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</p>}

          <div className="space-y-3">
            <label htmlFor="author" className="text-sm font-semibold text-slate-700">Author</label>
            <input
              id="author"
              type="text"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="Your name"
            />
          </div>

          <div className="space-y-3">
            <label htmlFor="body" className="text-sm font-semibold text-slate-700">Body</label>
            <textarea
              id="body"
              value={body}
              onChange={(event) => setBody(event.target.value)}
              rows={8}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="Write your post..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Posting...' : 'Create Post'}
          </button>
        </form>
      </div>
    </main>
  );
}
