import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const variants = {
  primary:
    'bg-primary-600 text-white shadow-sm hover:bg-primary-700 hover:shadow-md focus-visible:ring-primary-500',
  secondary:
    'bg-secondary-900 text-white shadow-sm hover:bg-secondary-800 hover:shadow-md focus-visible:ring-secondary-500',
  outline:
    'border border-secondary-200 bg-white text-secondary-700 hover:bg-secondary-50 hover:border-secondary-300 focus-visible:ring-primary-500',
  ghost:
    'text-secondary-600 hover:bg-secondary-100 hover:text-secondary-900 focus-visible:ring-primary-500',
  danger:
    'bg-danger-600 text-white shadow-sm hover:bg-danger-700 hover:shadow-md focus-visible:ring-danger-500',
  success:
    'bg-success-600 text-white shadow-sm hover:bg-success-700 hover:shadow-md focus-visible:ring-success-500',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
  md: 'px-4 py-2 text-sm rounded-lg gap-2',
  lg: 'px-5 py-2.5 text-base rounded-xl gap-2',
  icon: 'p-2 rounded-lg',
};

const MotionButton = motion.create('button');

const Button = forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      className = '',
      disabled = false,
      loading = false,
      icon: Icon,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <MotionButton
        ref={ref}
        whileTap={{ scale: isDisabled ? 1 : 0.97 }}
        disabled={isDisabled}
        className={`inline-flex items-center justify-center font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : Icon ? (
          <Icon className="h-4 w-4" />
        ) : null}
        {children && <span>{children}</span>}
      </MotionButton>
    );
  }
);

Button.displayName = 'Button';
export default Button;
