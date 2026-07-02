const colorMap = {
  primary: 'bg-primary-50 text-primary-700 ring-primary-600/20',
  secondary: 'bg-secondary-100 text-secondary-700 ring-secondary-500/20',
  success: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  warning: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  danger: 'bg-red-50 text-red-700 ring-red-600/20',
  neutral: 'bg-neutral-100 text-neutral-600 ring-neutral-500/20',
};

const outlineMap = {
  primary: 'border-primary-200 text-primary-700',
  secondary: 'border-secondary-200 text-secondary-700',
  success: 'border-emerald-200 text-emerald-700',
  warning: 'border-amber-200 text-amber-700',
  danger: 'border-red-200 text-red-700',
  neutral: 'border-neutral-200 text-neutral-600',
};

export default function Badge({ children, color = 'primary', variant = 'solid', className = '' }) {
  if (variant === 'outline') {
    return (
      <span
        className={`inline-flex items-center rounded-full border bg-transparent px-2.5 py-0.5 text-xs font-medium ${outlineMap[color]} ${className}`}
      >
        {children}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${colorMap[color]} ${className}`}
    >
      {children}
    </span>
  );
}
