import { ReactNode, ElementType } from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/utils';

type ContainerProps<T extends ElementType> = {
  as?: T;
  className?: string;
  children: ReactNode;
} & ComponentPropsWithoutRef<T>;

export function Container<T extends ElementType = 'div'>({
  as,
  className,
  children,
  ...props
}: ContainerProps<T>) {
  const Component = as || 'div';
  return (
    <Component
      className={cn('mx-auto w-full max-w-[1280px] px-6 xl:px-8', className)}
      {...props}
    >
      {children}
    </Component>
  );
}
