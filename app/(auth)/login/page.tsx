'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import authenticateAction from '@/server/actions/auth/authenticate-action'
import { Button, Input } from '@/app/_components'
import Link from 'next/link'

export default function Login() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const user = await authenticateAction(email, password)

      if (user) {
        router.replace('/dashboard')
      } else {
        setLoading(false)
        setError('Invalid email or password.')
      }
    } catch (err) {
      console.error('Authentication error:', err)
      setLoading(false)
      setError('An unexpected error occurred. Please try again later.')
    }
  }

  return (
    <>
      <h1 className="mb-6 text-center text-2xl font-bold">Login</h1>

      <form onSubmit={onLogin} className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
            disabled={loading}
          />
        </div>

        {error && <div className="text-sm text-red-600">{error}</div>}

        <Button
          as="button"
          type="submit"
          variant="primary"
          className="w-full"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </form>

      <p className="mt-4 text-center text-sm">
        Don't have an account?{' '}
        <Link href="/register" className="text-blue-600 hover:underline">
          Register.
        </Link>
      </p>
    </>
  )
}
