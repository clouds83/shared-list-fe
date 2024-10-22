'use client';

import { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import authenticateAction from '@/server/actions/auth/authenticate-action';
import { Button, Input } from '@/app/_components';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const user = await authenticateAction(email, password);

    if (user) {
      router.push('/dashboard');
    }
  };

  return (
    <>
      <h1 className="text-center text-2xl font-bold">Login</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="email">Email</label>
          <Input
            type="email"
            id="email"
            name="email"
            className="border"
            placeholder="Enter your email"
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
            placeholder="Enter your password"
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
