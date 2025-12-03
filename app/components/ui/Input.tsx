import * as React from 'react';
import { cn } from '~/lib/cn';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  errorMessage?: string;
  label?: string;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, errorMessage, label, id, ...props }, ref) => {
    const inputId = id ?? props.name;

    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-slate-800"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={cn(
            'w-full rounded-xl border border-slate-200 bg-white/90 px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none ring-0 transition placeholder:text-slate-400 focus:border-[#2AABEE] focus:ring-2 focus:ring-[#2AABEE]/40 disabled:bg-slate-100 disabled:text-slate-400',
            errorMessage &&
              'border-red-400 focus:border-red-400 focus:ring-red-300/40',
            className
          )}
          {...props}
        />
        {errorMessage && <p className="text-xs text-red-500">{errorMessage}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
