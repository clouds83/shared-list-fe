import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/utils/cn'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: 'text' | 'password' | 'email' | 'number' | 'url'
  error?: boolean
  valid?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', className, error, valid, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-12 w-full flex-shrink-0 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm',
          'focus-visible:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black',
          'disabled:cursor-not-allowed disabled:opacity-50',
          {
            'border-red-500 focus-visible:ring-red-500': error,
            'border-green-500 focus-visible:ring-green-500': valid,
          },
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)

Input.displayName = 'Input'

export default Input
