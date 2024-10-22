import { Button, Input } from '@/app/_components'
import Link from 'next/link'

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
      </form>

      <p className="text-center text-sm">
        Already have an account?{' '}
        <Link href="/login" className="text-blue-600">
          Login.
        </Link>
      </p>
    </>
  )
}
