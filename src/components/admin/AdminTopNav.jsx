 import { Bell, Search, Menu, ShieldCheck } from 'lucide-react';
import Badge from '../ui/Badge';
import Avatar from '../ui/Avatar';


export default function AdminTopNav({ title, onMenuToggle }) {
  return (
    <header className="sticky top-0 z-20 border-b border-neutral-200 bg-white">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="rounded-lg p-2 text-neutral-500 transition-colors hover:bg-neutral-100 lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500"
            aria-label="Toggle admin navigation"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-neutral-400 hidden sm:block" />
            <h1 className="truncate text-lg font-semibold tracking-tight text-neutral-900">{title}</h1>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <div className="hidden sm:block">
            <div className="relative w-full max-w-xs">
              <input
                type="text"
                placeholder="Search users, reports..."
                className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2 pl-4 pr-10 text-sm text-neutral-900 focus:outline-none focus-visible:outline-none"
                aria-label="Search"
              />
              <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            </div>
          </div>

          <button
            className="relative rounded-xl p-2 text-neutral-500 transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500"
            aria-label="System notifications"
          >
            <Bell className="h-5 w-5" />
            <Badge color="danger" className="absolute -right-3 -top-1.5 h-4 min-w-4 px-1 text-[10px] leading-none">
              138
            </Badge>
          </button>

          <div className="flex items-center gap-2 border-1 border-neutral-200 pl-3">
            <Avatar initials="AD" size="sm" />
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-neutral-900">Admin User</p>
              <p className="text-xs text-neutral-500">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}