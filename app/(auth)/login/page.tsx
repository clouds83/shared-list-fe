import { api } from '@/lib/api';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { handleLogin } from '@/server/actions/auth';

export default function Login() {
  // const { data: session } = useSession();

  async function onLogin(formData: FormData) {
    'use server';

    await handleLogin(formData);

    redirect('/dashboard');
  }

  return (
    <>
      <h2 className="text-center text-2xl">Login</h2>

      <form action={onLogin} className="grid gap-4">
        <div className="grid">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="border"
            required
          />
        </div>

        <div className="grid">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="border"
            required
          />
        </div>

        <button type="submit" className="bg-green-600">
          Login
        </button>
      </form>

      <p className="text-center text-sm">
        Already have an account?{' '}
        <a href="/register" className="text-blue-600">
          Register.
        </a>
      </p>
    </>
  );
}
