'use client';

import { ReactNode } from 'react';
import { cn } from '@/utils';
import Link, { LinkProps } from 'next/link';
import clsx from 'clsx';

type BaseProps = {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'error';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  Icon?: ReactNode;
  iconRight?: boolean;
  iconClass?: string;
  className?: string;
  children?: ReactNode;
};

type ButtonProps = BaseProps &
  (
    | (React.ButtonHTMLAttributes<HTMLButtonElement> & {
        as: 'button';
      })
    | (LinkProps & {
        as: 'link';
      })
  );

const baseClasses = clsx(
  'text-md inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors',
  'focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black',
  'disabled:pointer-events-none disabled:opacity-50',
);

const variantsClasses = {
  variant: {
    primary: 'bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-600',
    secondary:
      'bg-yellow-400 text-black hover:bg-yellow-300 active:bg-yellow-400',
    outline: 'border border-gray-300 hover:bg-gray-100 active:bg-gray-200',
    ghost: 'bg-gray-100 text-black hover:bg-gray-200 active:bg-gray-100',
    link: 'text-black underline-offset-4 hover:underline active:translate-y-0.5',
    error: 'bg-red-600 text-white hover:bg-red-500 active:bg-red-600',
  },
  size: {
    xs: 'h-9 px-4 text-xs',
    sm: 'h-10 px-5 text-sm',
    md: 'h-12 px-6',
    lg: 'h-14 px-8 text-lg',
  },
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  Icon,
  iconRight,
  iconClass,
  className,
  ...props
}: ButtonProps) {
  const iconOnly = !children;
  const classes = cn(
    baseClasses,
    variantsClasses.variant[variant],
    variantsClasses.size[size],
    {
      'flex-row-reverse': iconRight,
      'aspect-square p-0': iconOnly,
    },
    className,
  );

  const Content = () => (
    <>
      {Icon && (
        <span
          className={cn(
            iconRight ? '-mr-1' : '-ml-1',
            { ['m-0']: iconOnly },
            iconClass,
          )}
        >
          {Icon}
        </span>
      )}
      {children}
    </>
  );

  if (props.as === 'button') {
    const { as, ...rest } = props;
    return (
      <button
        type="button"
        className={classes}
        {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        <Content />
      </button>
    );
  }

  if (props.as === 'link') {
    const { as, ...rest } = props as LinkProps;

    return (
      <Link className={classes} {...rest}>
        <Content />
      </Link>
    );
  }

  return null;
}
