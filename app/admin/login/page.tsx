'use client';

import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const [error, setError] = useState('');

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const result = await signIn('credentials', {
      email: data.get('email'),
      password: data.get('password'),
      redirect: false
    });

    if (result?.error) {
      setError('Invalid credentials');
      return;
    }

    window.location.href = '/admin';
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <form onSubmit={onSubmit} className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-8">
        <h1 className="mb-6 text-2xl font-semibold text-slate-100">Admin Sign In</h1>
        <div className="space-y-4">
          <input name="email" type="email" required placeholder="Email" className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100" />
          <input name="password" type="password" required placeholder="Password" className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100" />
        </div>
        {error ? <p className="mt-3 text-sm text-rose-400">{error}</p> : null}
        <button className="mt-6 w-full rounded-lg bg-indigo-500 px-4 py-2 font-medium text-white">Sign in</button>
      </form>
    </main>
  );
}
