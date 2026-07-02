import { forwardRef } from 'react';
import FormField from './FormField';

const Input = forwardRef(
  (
    { label, error, helper, description, required, disabled, id, className = '', ...props },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <FormField
        label={label}
        error={error}
        helper={helper}
        description={description}
        required={required}
        id={inputId}
        className={className}
      >
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${inputId}-error` : helper ? `${inputId}-helper` : undefined}
          className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 transition-colors focus:outline-none focus:ring-2 ${
            disabled
              ? 'cursor-not-allowed opacity-50 bg-neutral-50'
              : error
                ? 'border-danger-300 focus:border-danger-400 focus:ring-danger-50'
                : 'border-neutral-200 focus:border-primary-300 focus:ring-primary-50'
          }`}
          {...props}
        />
      </FormField>
    );
  }
);

Input.displayName = 'Input';
export default Input;
