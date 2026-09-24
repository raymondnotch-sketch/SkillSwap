const variants = {
  text: 'h-4 w-full',
  title: 'h-6 w-3/4',
  button: 'h-10 w-24 rounded-xl',
  card: 'h-32 w-full rounded-2xl',
  avatar: 'h-10 w-10 rounded-full',
  circle: 'rounded-full',
  rectangle: 'rounded-xl',
};
export default function Skeleton({ className = '', variant = 'text', count = 1 }) {
  const baseClasses = 'animate-pulse rounded-lg bg-neutral-200';

  const variantClasses = {
    text: 'h-4 w-full',
    title: 'h-6 w-3/4',
    avatar: 'h-10 w-10 rounded-full',
    card: 'h-48 w-full rounded-2xl',
    thumbnail: 'h-32 w-full rounded-xl',
    paragraph: 'h-4 w-full',
    'table-row': 'h-12 w-full',
  };

  if (variant === 'paragraph') {
    return (
      <div className="space-y-3" role="status" aria-label="Loading">
        <div className={`${baseClasses} h-5 w-3/4 ${className}`} />
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className={`${baseClasses} ${variantClasses[variant]} ${className}`} />
        ))}
        <div className={`${baseClasses} h-4 w-1/2 ${className}`} />
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

export default function Skeleton({ variant = 'text', className = '', ...props }) {
  return (
    <div
      className={`skeleton ${variants[variant] ?? variants.text} ${className}`}
      {...props}
    />
  );
}

// Pre-built skeleton layouts
export function SkeletonCard({ lines = 3 }) {
  return (
    <div className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-6 shadow-card">
      <Skeleton variant="title" />
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={i === lines - 1 ? 'w-2/3' : ''} />
      ))}
    </div>
  );
}

export function SkeletonList({ items = 3 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: items }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 rounded-xl border border-neutral-100 bg-white p-3"
        >
          <Skeleton variant="avatar" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-3 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkeletonStats() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-card"
        >
          <div className="flex items-start justify-between">
            <Skeleton className="h-11 w-11 rounded-xl" />
            <Skeleton className="h-5 w-12 rounded-full" />
          </div>
          <Skeleton className="mt-4 h-8 w-20" />
          <Skeleton className="mt-2 h-3 w-24" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonDashboard(){
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-8 w-48" />
        </div>
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>

      {/* Stats */}
      <SkeletonStats />

      {/* Cards */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <SkeletonCard lines={4} />
        <SkeletonCard lines={4} />
        <SkeletonCard lines={4} />
      </div>
    </div>
  );
}
