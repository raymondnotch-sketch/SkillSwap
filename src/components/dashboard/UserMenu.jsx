import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Settings, HelpCircle, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Avatar from '../ui/Avatar';

export default function UserMenu({ name, subtitle, initials }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const { user, logout } = useAuth();

  const displayName = name ?? user?.name;
  const displaySubtitle = subtitle ?? user?.email;
  const displayInitials = initials ?? user?.initials ?? user?.name?.slice(0, 2);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    function handleEscape(event) {
      if (event.key === 'Escape') setIsOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const menuItems = [
    { label: 'View Profile', path: '/profile', icon: User },
    { label: 'Settings', path: '/settings', icon: Settings },
    { label: 'Help & Support', path: '/help', icon: HelpCircle },
  ];

  return (
    <div ref={menuRef} className="relative">
      {/* Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-xl px-2 py-1.5 transition-colors duration-150 hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        aria-label="Open user menu"
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <div className="relative">
          <Avatar initials={displayInitials} size="sm" />
          <span className="absolute -bottom-px -right-px h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" aria-hidden="true" />
        </div>
        <span className="hidden text-sm font-semibold text-neutral-700 md:block max-w-[100px] truncate">
          {displayName?.split(' ')[0] || 'Account'}
        </span>
        <ChevronDown
          className={`hidden h-3.5 w-3.5 text-neutral-400 transition-transform duration-200 md:block ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
            className="absolute right-0 top-full z-50 mt-2 w-56 origin-top-right rounded-2xl border border-neutral-200 bg-white p-1.5 shadow-xl shadow-neutral-900/10"
            role="menu"
            aria-label="User menu options"
          >
            {/* Header */}
            <div className="border-b border-neutral-100 px-3 py-2.5 mb-1">
              <p className="text-sm font-semibold text-neutral-900 truncate">{displayName || 'Guest User'}</p>
              <p className="text-xs text-neutral-400 truncate">{displaySubtitle || ''}</p>
            </div>

            {/* Items */}
            <div className="space-y-0.5">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-neutral-700 transition-colors duration-100 hover:bg-neutral-50 hover:text-neutral-900"
                    role="menuitem"
                  >
                    <Icon className="h-4 w-4 text-neutral-400 shrink-0" aria-hidden="true" />
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Logout */}
            <div className="mt-1 border-t border-neutral-100 pt-1">
              <button
                onClick={() => { setIsOpen(false); logout(); }}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-neutral-700 transition-colors duration-100 hover:bg-rose-50 hover:text-rose-600"
                role="menuitem"
              >
                <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" />
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
