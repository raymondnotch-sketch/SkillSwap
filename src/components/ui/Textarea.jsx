import { forwardRef } from 'react';
import FormField from './FormField';

const Textarea = forwardRef(
  (
    { label, error, helper, description, required, disabled, id, className = '', ...props },
    ref
  ) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <FormField
        label={label}
        error={error}
        helper={helper}
        description={description}
        required={required}
        id={textareaId}
        className={className}
      >
        <textarea
          ref={ref}
          id={textareaId}
          disabled={disabled}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={
            error ? `${textareaId}-error` : helper ? `${textareaId}-helper` : undefined
          }
          className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 transition-colors focus:outline-none focus:ring-2 resize-none ${
            disabled
              ? 'cursor-not-allowed opacity-50 bg-neutral-50'
              : error
                ? 'border-danger-300 focus:border-danger-400 focus:ring-danger-50'
                : 'border-neutral-200 focus:border-primary-300 focus:ring-primary-50'
          }`}
          rows={4}
          {...props}
        />
      </FormField>
    );
  }
);

Textarea.displayName = 'Textarea';
export default Textarea;
