import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  helperText?: string;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    label, 
    error, 
    leftIcon, 
    rightIcon, 
    helperText, 
    className, 
    fullWidth = true,
    ...props 
  }, ref) => {
    
    return (
      <div className={clsx(fullWidth ? 'w-full' : 'w-auto')}>
        {label && (
          <label 
            htmlFor={props.id} 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            className={clsx(
              'bg-white border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error 
                ? 'border-red-300 text-red-900 placeholder-red-300' 
                : 'border-gray-300 text-gray-900 placeholder-gray-400',
              fullWidth ? 'w-full' : 'w-auto',
              className
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={props.id ? `${props.id}-error` : undefined}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              {rightIcon}
            </div>
          )}
        </div>
        
        {error && (
          <p 
            className="mt-1 text-sm text-red-600" 
            id={props.id ? `${props.id}-error` : undefined}
          >
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;