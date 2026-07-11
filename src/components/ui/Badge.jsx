const colorMap = {
  primary: 'bg-primary-50 text-primary-700 ring-primary-600/20',
  secondary: 'bg-neutral-100 text-neutral-700 ring-neutral-600/20',
  success: 'bg-success-50 text-success-700 ring-success-600/20',
  warning: 'bg-warning-50 text-warning-700 ring-warning-600/20',
  danger: 'bg-danger-50 text-danger-700 ring-danger-600/20',
  neutral: 'bg-neutral-100 text-neutral-600 ring-neutral-500/20',
  info: 'bg-blue-50 text-blue-700 ring-blue-600/20',
};

const solidMap = {
  primary: 'bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow',
  secondary: 'bg-gradient-to-br from-neutral-700 to-neutral-800 text-white shadow',
  success: 'bg-gradient-to-br from-success-500 to-success-600 text-white shadow',
  warning: 'bg-gradient-to-br from-warning-500 to-warning-600 text-white shadow',
  danger: 'bg-gradient-to-br from-danger-500 to-danger-600 text-white shadow',
  neutral: 'bg-neutral-700 text-white shadow',
  info: 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow',
};

const outlineMap = {
  primary: 'border border-primary-200 text-primary-700 bg-transparent',
  secondary: 'border border-neutral-200 text-neutral-700 bg-transparent',
  success: 'border border-success-200 text-success-700 bg-transparent',
  warning: 'border border-warning-200 text-warning-700 bg-transparent',
  danger: 'border border-danger-200 text-danger-700 bg-transparent',
  neutral: 'border border-neutral-200 text-neutral-600 bg-transparent',
  info: 'border border-blue-200 text-blue-700 bg-transparent',
};

const sizeMap = {
  sm: 'px-2 py-0.5 text-[10px]',
  md: 'px-2.5 py-0.5 text-xs',
  lg: 'px-3 py-1 text-sm',
};

export default function Badge({
  children,
  color = 'primary',
  variant = 'default',
  size = 'md',
  icon: Icon,
  className = '',
}) {
  const content = (
    <>
      {Icon && <Icon className="h-3 w-3 shrink-0" aria-hidden="true" />}
      {children}
    </>
  );

  if (variant === 'solid') {
    return (
      <span
        className={`inline-flex items-center gap-1 rounded-full font-medium ${sizeMap[size]} ${solidMap[color]} ${className}`}
      >
        {content}
      </span>
    );
  }

  if (variant === 'outline') {
    return (
      <span
        className={`inline-flex items-center gap-1 rounded-full font-medium transition-colors ${sizeMap[size]} ${outlineMap[color]} ${className}`}
      >
        {content}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium ring-1 ring-inset transition-colors ${sizeMap[size]} ${colorMap[color]} ${className}`}
    >
      {content}
    </span>
  );
}
