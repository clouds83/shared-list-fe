<<<<<<< HEAD
import { Button, Input } from '@/app/_components';
import Link from 'next/link';

export default function Register() {
  return (
    <>
      <h1 className="text-center text-2xl font-bold">Register</h1>

      <form className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="email">Email</label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password">Password</label>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password">Confirm Password</label>
          <Input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your password"
          />
        </div>

        <Button as="button" type="submit" className="w-full">
          Register user
        </Button>
=======
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
>>>>>>> e24849220fe58eee32b98bb74243de39973774b5
      </form>

      <p className="text-center text-sm">
        Already have an account?{' '}
<<<<<<< HEAD
        <Link href="/login" className="text-blue-600">
          Login.
        </Link>
=======
        <a href="/login" className="text-blue-600">
          Login.
        </a>
>>>>>>> e24849220fe58eee32b98bb74243de39973774b5
      </p>
    </>
  );
}
