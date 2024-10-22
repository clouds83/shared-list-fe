'use client'

import Action from './Action'
import Input from './Input'
import { auth, ValidationErrors } from '@/server/actions/authActions'
import { useFormState } from 'react-dom'

export default function AuthForm({ type }: { type: 'login' | 'register' }) {
  const initialState = { errors: {} as ValidationErrors }

  const [formState, formAction] = useFormState((prevState: any, formData: any) => {
    return auth(type, initialState, formData)
  }, initialState)

  return (
    <form action={formAction} className='grid gap-4'>
      <div className='grid'>
        <label htmlFor='email'>Email</label>
        <Input type='email' id='email' name='email' className='border' autoComplete='on' required />
      </div>

      <div className='grid'>
        <label htmlFor='password'>Password</label>
        <Input type='password' id='password' name='password' className='border' required />
      </div>

      {formState?.errors && (
        <ul>
          {Object.entries(formState.errors).map(([key, error]) => (
            <li key={key}>{error}</li>
          ))}
        </ul>
      )}

      <Action as='button' type='submit'>
        {type === 'login' ? 'Login' : 'Register'}
      </Action>
    </form>
  )
}
