import { User } from 'lucide-react';

export default function Avatar({ src, alt, initials, size = 'md', className = '', ...props }) {
  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-14 w-14 text-base',
    xl: 'h-20 w-20 text-xl',
  };

  if (src) {
    return (
      <img
        src={src}
        alt={alt || 'User avatar'}
        className={`rounded-full object-cover ${sizeClasses[size]} ${className}`}
        {...props}
      />
    );
  }

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-primary-100 font-semibold text-primary-700 ${sizeClasses[size]} ${className}`}
      aria-label={alt || initials || 'User avatar'}
      role="img"
      {...props}
    >
      {initials ? initials.slice(0, 2).toUpperCase() : <User className="h-1/2 w-1/2" />}
    </div>
  );
}
