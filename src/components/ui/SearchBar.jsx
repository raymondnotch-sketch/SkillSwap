import { forwardRef } from 'react';
import { Search } from 'lucide-react';

const SearchBar = forwardRef(
  ({ placeholder = 'Search...', value, onChange, className = '', ...props }, ref) => {
    return (
      <div className={`relative ${className}`}>
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full rounded-xl border border-neutral-200 bg-white py-2.5 pl-10 pr-4 text-sm text-neutral-900 placeholder:text-neutral-400 transition-colors focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-50"
          {...props}
        />
      </div>
    );
  }
);

SearchBar.displayName = 'SearchBar';
export default SearchBar;
