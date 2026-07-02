export default function Skeleton({ className = '', variant = 'text', count = 1 }) {
  const baseClasses = 'animate-pulse rounded-lg bg-neutral-200';

  const variantClasses = {
    text: 'h-4 w-full',
    title: 'h-6 w-3/4',
    avatar: 'h-10 w-10 rounded-full',
    card: 'h-48 w-full rounded-2xl',
    thumbnail: 'h-32 w-full rounded-xl',
    paragraph: 'h-4 w-full',
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

  return (
    <div className="space-y-3" role="status" aria-label="Loading">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`${baseClasses} ${variantClasses[variant]} ${className}`} />
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  );
}
