import { useState } from 'react';
import { Bell, Search, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import UserMenu from './UserMenu';

export default function TopNav({ title, onMenuToggle }) {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="sticky top-0 z-30 h-[64px] border-b border-neutral-100 bg-white/95 backdrop-blur-md">
      {/* Accent line */}
      <div className="accent-line" />

      <div className="flex h-full items-center justify-between px-5 sm:px-6">

        {/* Left: mobile menu + title */}
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-neutral-600 transition-colors hover:bg-neutral-100 lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            aria-label="Toggle navigation menu"
          >
            <Menu className="h-[18px] w-[18px]" aria-hidden="true" />
          </button>

          <h1 className="truncate text-[17px] font-bold tracking-tight text-neutral-900">
            {title}
          </h1>
        </div>

        <div className="flex shrink-0 items-center gap-3">

          {/* Desktop search */}
          <div className="relative hidden md:flex items-center">
            <Search
              className="pointer-events-none absolute left-3 h-3.5 w-3.5 text-neutral-400"
              aria-hidden="true"
            />
            <input
              type="text"
              placeholder="Search…"
              className="h-8 w-44 rounded-xl border border-neutral-200 bg-neutral-50 pl-8 pr-10 text-sm text-neutral-900 transition-all duration-200 placeholder:text-neutral-400 hover:border-neutral-300 hover:bg-white focus:w-60 focus:border-primary-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/15"
              aria-label="Search the dashboard"
            />

          </div>

          {/* Mobile search toggle */}
          <button
            className="flex h-9 w-9 items-center justify-center rounded-xl text-neutral-600 transition-colors hover:bg-neutral-100 md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            onClick={() => setShowSearch(!showSearch)}
            aria-label="Toggle search"
            aria-expanded={showSearch}
          >
            {showSearch
              ? <X className="h-[18px] w-[18px]" aria-hidden="true" />
              : <Search className="h-[18px] w-[18px]" aria-hidden="true" />
            }
          </button>

          {/* Notifications */}
          <Link to="/notifications" tabIndex={-1}>
            <button
              className="relative flex h-9 w-9 items-center justify-center rounded-xl text-neutral-600 transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              aria-label="View notifications (3 unread)"
            >
              <Bell className="h-[18px] w-[18px]" aria-hidden="true" />
              <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-rose-500 px-1 text-[9px] font-bold text-white ring-2 ring-white">
                3
              </span>
            </button>
          </Link>

          <div className="mx-1 h-5 w-px bg-neutral-200" aria-hidden="true" />

          <UserMenu />
        </div>
      </div>

      {/* Mobile search expansion */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="border-t border-neutral-100 bg-white px-5 pb-3 pt-2.5 md:hidden"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 pl-4 pr-10 text-sm text-neutral-900 placeholder:text-neutral-400 transition-colors focus:border-primary-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-50"
                aria-label="Search"
                autoFocus
              />
              <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
