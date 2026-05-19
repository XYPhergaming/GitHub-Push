import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export default function Button({
  children,
  variant = 'primary',
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'px-4 py-2 rounded-md font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2',
        variant === 'primary' &&
          'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed',
        variant === 'secondary' &&
          'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400 disabled:opacity-50',
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}