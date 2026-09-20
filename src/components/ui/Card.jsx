import { motion } from 'framer-motion';

const variantStyles = {
  default:
    'rounded-xl border border-neutral-200 bg-white shadow-xs',
  interactive:
    'rounded-xl border border-neutral-200 bg-white shadow-xs cursor-pointer transition-all hover:border-neutral-300 hover:shadow-sm',
  info:
    'rounded-xl border border-primary-200 bg-primary-50/50',
  success:
    'rounded-xl border border-success-200 bg-success-50/50',
  warning:
    'rounded-xl border border-warning-200 bg-warning-50/50',
  danger:
    'rounded-xl border border-danger-200 bg-danger-50/50',
  stat:
    'rounded-xl border border-neutral-200 bg-white shadow-xs text-center',
  glass:
    'rounded-xl border border-neutral-200 bg-white shadow-xs',
  gradient:
    'rounded-xl border border-neutral-200 bg-white shadow-xs text-neutral-900',
};

export default function Card({
  children,
  className = '',
  variant = 'default',
  hover = false,
  ...props
}) {
  const Component = hover ? motion.div : 'div';
  const motionProps = hover
    ? {
        whileHover: { y: -1 },
        transition: { duration: 0.15 },
      }
    : {};

  return (
    <Component
      className={`${variantStyles[variant] ?? variantStyles.default} ${className}`}
      {...motionProps}
      {...props}
    >
      {children}
    </Component>
  );
}

