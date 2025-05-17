import { ReactNode } from 'react';
import clsx from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  border?: boolean;
  shadow?: 'none' | 'sm' | 'md' | 'lg';
}

const Card = ({ 
  children, 
  className, 
  padding = 'md',
  border = true,
  shadow = 'md'
}: CardProps) => {
  
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-8'
  };
  
  const borderClass = border ? 'border border-gray-200' : '';
  
  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow',
    lg: 'shadow-lg'
  };
  
  return (
    <div 
      className={clsx(
        'bg-white rounded-lg',
        paddingClasses[padding],
        borderClass,
        shadowClasses[shadow],
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;