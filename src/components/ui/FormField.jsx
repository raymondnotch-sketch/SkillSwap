export default function FormField({
  label,
  error,
  helper,
  description,
  required,
  id,
  className = '',
  children,
}) {
  const fieldId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={className}>
      {label && (
        <label htmlFor={fieldId} className="mb-1.5 block text-sm font-medium text-neutral-700">
          {label}
          {required && (
            <span className="ml-0.5 text-danger-500" aria-hidden="true">
              *
            </span>
          )}
          {required && <span className="sr-only">(required)</span>}
        </label>
      )}
      {description && <p className="mb-2 text-xs text-neutral-400">{description}</p>}
      {children}
      {error && (
        <p
          id={fieldId ? `${fieldId}-error` : undefined}
          className="mt-1 text-xs text-danger-600"
          role="alert"
        >
          {error}
        </p>
      )}
      {helper && !error && (
        <p id={fieldId ? `${fieldId}-helper` : undefined} className="mt-1 text-xs text-neutral-400">
          {helper}
        </p>
      )}
    </div>
  );
}
