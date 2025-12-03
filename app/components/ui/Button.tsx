import * as React from 'react';
import { cn } from '~/lib/cn';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost';
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', children, ...props }, ref) => {
    const base =
      'relative inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#e6f3ff] disabled:cursor-not-allowed cursor-pointer';

    const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
      primary:
        'bg-[#2AABEE] text-white shadow-sm shadow-sky-300/60 hover:bg-[#229ed9] disabled:bg-sky-300/70',
      ghost:
        'bg-transparent text-[#2AABEE] hover:bg-sky-50 border border-sky-100',
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
