import { handleRegistration } from '@/server/actions/authActions';
import { redirect } from 'next/navigation';

export default function Register() {
  async function onRegister(formData: FormData) {
    'use server';

    await handleRegistration(formData);

    redirect('/dashboard');
  }

  return (
    <>
      <h2 className="text-center text-2xl">Register</h2>

      <form action={onRegister} className="grid gap-4">
        <div className="grid">
          <label htmlFor="email">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="border"
          />
        </div>

        <div className="grid">
          <label htmlFor="email">Last Name</label>
          <input type="text" id="lastName" name="lastName" className="border" />
        </div>

        <div className="grid">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" className="border" />
        </div>

        <div className="grid">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="border"
          />
        </div>

        <div className="grid">
          <label htmlFor="password">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="border"
          />
        </div>

        <button type="submit">Register user</button>
      </form>

      <p className="text-center text-sm">
        Already have an account?{' '}
        <a href="/login" className="text-blue-600">
          Login.
        </a>
      </p>
    </>
  );
}
