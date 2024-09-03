'use client';

import { forwardRef, ReactNode } from 'react';
import clsx from 'clsx';
import { cn } from '@/lib/utils/cn';
import Link from 'next/link';
import { Url } from 'next/dist/shared/lib/router/router';

type BaseProps = {
  variant?:
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'link'
    | 'destructive';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  Icon?: ReactNode;
  iconRight?: boolean;
  iconClass?: string;
  className?: string;
  children?: ReactNode;
};

type ActionProps = BaseProps &
  (
    | (React.ButtonHTMLAttributes<HTMLButtonElement> & {
        as: 'button';
      })
    | (React.AnchorHTMLAttributes<HTMLAnchorElement> & {
        as: 'a';
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
    destructive: 'bg-red-600 text-white hover:bg-red-500 active:bg-red-600',
  },
  size: {
    xs: 'h-9 px-4 text-xs',
    sm: 'h-10 px-5 text-sm',
    md: 'h-12 px-6',
    lg: 'h-14 px-8 text-lg',
  },
};

const Action = forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      Icon,
      iconRight,
      iconClass,
      className,
      ...props
    }: ActionProps,
    ref,
  ) => {
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

    const Content = () => {
      return (
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
    };

    if (props.as === 'a') {
      const { as, href, ...rest } = props;

      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classes}
          {...rest}
          href={href as Url}
        >
          <Content />
        </Link>
      );
    }

    if (props.as === 'button') {
      const { as, ...rest } = props;

      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          className={classes}
          {...rest}
        >
          <Content />
        </button>
      );
    }

    return null;
  },
);

Action.displayName = 'Action';

export default Action;
