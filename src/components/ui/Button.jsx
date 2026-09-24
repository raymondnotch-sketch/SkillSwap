import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const variants = {
  primary:
    'bg-primary-600 text-white shadow-xs hover:bg-primary-700 focus-visible:ring-primary-500',

  secondary:
    'bg-neutral-900 text-white shadow-xs hover:bg-neutral-800 focus-visible:ring-neutral-500',

  accent:
    'bg-accent-600 text-white shadow-xs hover:bg-accent-700 focus-visible:ring-accent-500',

  outline:
    'border border-neutral-200 bg-white text-neutral-700 shadow-xs hover:bg-neutral-50 hover:border-neutral-300 hover:text-neutral-900 focus-visible:ring-primary-500',

  ghost:
    'bg-transparent text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 focus-visible:ring-primary-500',

  danger:
    'bg-danger-600 text-white shadow-xs hover:bg-danger-700 focus-visible:ring-danger-500',

  success:
    'bg-success-600 text-white shadow-xs hover:bg-success-700 focus-visible:ring-success-500',

  soft:
    'bg-primary-50 text-primary-700 hover:bg-primary-100 focus-visible:ring-primary-500',

  'soft-success':
    'bg-success-50 text-success-700 hover:bg-success-100 focus-visible:ring-success-500',

  'soft-warning':
    'bg-warning-50 text-warning-700 hover:bg-warning-100 focus-visible:ring-warning-500',

  'soft-danger':
    'bg-danger-50 text-danger-700 hover:bg-danger-100 focus-visible:ring-danger-500',

  glass:
    'border border-neutral-200 bg-white text-neutral-800 shadow-xs hover:bg-neutral-50 focus-visible:ring-primary-500',

  shimmer:
    'bg-primary-600 text-white shadow-xs hover:bg-primary-700 focus-visible:ring-primary-500',
};

const sizes = {
  xs: 'px-2.5 py-1.5 text-xs rounded-lg gap-1.5',
  sm: 'px-3.5 py-2 text-xs rounded-lg gap-2',
  md: 'px-4 py-2 text-sm rounded-lg gap-2',
  lg: 'px-5 py-2.5 text-base rounded-xl gap-2.5',
  xl: 'px-6 py-3 text-lg rounded-xl gap-3',
  icon: 'p-2 rounded-lg',
  'icon-sm': 'p-1.5 rounded-md',
  'icon-lg': 'p-2.5 rounded-xl',
};

const MotionButton = motion.create('button');

const Button = forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      type = 'button',
      className = '',
      disabled = false,
      loading = false,
      icon: Icon,
      iconRight: IconRight,
      fullWidth = false,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    if (process.env.NODE_ENV !== 'production' && !children && !props['aria-label']) {
      console.warn('Button: icon-only buttons need an aria-label prop.');
    }

    return (
      <MotionButton
        ref={ref}
        type={type}
        whileTap={{ scale: isDisabled ? 1 : 0.98 }}
        transition={{ duration: 0.1 }}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        className={`
          group inline-flex items-center justify-center
          font-medium
          transition-colors duration-150
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
          disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none
          ${variants[variant] ?? variants.primary}
          ${sizes[size] ?? sizes.md}
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `}
        {...props}
      >
        {/* Content */}
        <span className="flex items-center justify-center gap-[inherit]">
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : Icon ? (
            <Icon
              className="h-4 w-4 shrink-0"
              aria-hidden="true"
            />
          ) : null}

          {children && <span className="truncate">{children}</span>}

          {IconRight && !loading && (
            <IconRight
              className="h-4 w-4 shrink-0"
              aria-hidden="true"
            />
          )}
        </span>
      </MotionButton>
    );
  }
);

Button.displayName = 'Button';
export default Button;

// Button Group Component for combining buttons
export function ButtonGroup({ children, className = '', vertical = false }) {
  return (
    <div
      className={`inline-flex ${vertical ? 'flex-col' : 'flex-row'} ${className}`}
    >
      {children}
    </div>
  );
}

// Icon Button Component (simpler API for icon-only buttons)
export const IconButton = forwardRef(({ icon: Icon, size = 'icon', ...props }, ref) => {
  return (
    <Button ref={ref} size={size} {...props}>
      {/* Children rendered inside button, but icon provided via prop */}
    </Button>
  );
});

IconButton.displayName = 'IconButton';
