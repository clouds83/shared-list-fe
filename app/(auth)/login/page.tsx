<<<<<<< HEAD
'use client';

import { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import authenticateAction from '@/server/actions/auth/authenticate-action';
import { Button, Input } from '@/app/_components';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
=======
import { api } from '@/lib/api';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { handleLogin } from '@/server/actions/authActions';

export default function Login() {
  // const { data: session } = useSession();
>>>>>>> e24849220fe58eee32b98bb74243de39973774b5

  async function onLogin(formData: FormData) {
    'use server';

    await handleLogin(formData);

<<<<<<< HEAD
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const user = await authenticateAction(email, password);

    if (user) {
      router.push('/dashboard');
    }
  };
=======
    redirect('/dashboard');
  }
>>>>>>> e24849220fe58eee32b98bb74243de39973774b5

  return (
    <>
      <h1 className="text-center text-2xl font-bold">Login</h1>

<<<<<<< HEAD
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
=======
      <form action={onLogin} className="grid gap-4">
        <div className="grid">
>>>>>>> e24849220fe58eee32b98bb74243de39973774b5
          <label htmlFor="email">Email</label>
          <Input
            type="email"
            id="email"
            name="email"
            className="border"
<<<<<<< HEAD
            placeholder="Enter your email"
=======
>>>>>>> e24849220fe58eee32b98bb74243de39973774b5
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password">Password</label>
          <Input
            type="password"
            id="password"
            name="password"
            className="border"
<<<<<<< HEAD
            placeholder="Enter your password"
=======
>>>>>>> e24849220fe58eee32b98bb74243de39973774b5
            required
          />
        </div>

        <Button as="button" type="submit" variant="primary" className="w-full">
          Login
        </Button>
      </form>

      <p className="text-center text-sm">
        Already have an account?{' '}
        <Link href="/register" className="text-blue-600">
          Register.
        </Link>
      </p>
    </>
  );
}
