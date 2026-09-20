import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Sparkles, LogIn } from 'lucide-react';
import { APP_NAME, NAV_LINKS } from '../../constants';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Add shadow on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-white border-b border-neutral-200 shadow-xs'
          : 'bg-white/90 border-b border-neutral-100'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8 h-16">

        {/* ── Logo ── */}
        <Link
          to="/"
          className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-lg"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-sm font-bold text-white shadow-xs">
            S
          </div>
          <span className="font-bold text-neutral-900 text-base tracking-tight">
            {APP_NAME}
          </span>
        </Link>

        {/* ── Desktop Nav Links ── */}
        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="relative px-3 py-1.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            >
              {isActive(link.path) && (
                <motion.span
                  layoutId="navbar-pill"
                  className="absolute inset-0 rounded-lg bg-primary-50"
                  transition={{ type: 'spring', bounce: 0.15, duration: 0.3 }}
                />
              )}
              <span
                className={`relative z-10 block text-sm font-medium transition-colors duration-150 ${
                  isActive(link.path)
                    ? 'text-primary-700 font-semibold'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {link.label}
              </span>
            </Link>
          ))}
        </div>

        {/* ── Desktop Right CTAs ── */}
        <div className="hidden items-center gap-2 lg:flex">
          <Link
            to="/login"
            className="flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium text-neutral-600 transition-colors duration-150 hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          >
            <LogIn className="h-4 w-4" aria-hidden="true" />
            Log in
          </Link>
          <Link
            to="/signup"
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-lg"
          >
            <button className="flex items-center gap-1.5 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-xs transition-colors duration-150 hover:bg-primary-700 focus:outline-none">
              Get Started
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </Link>
        </div>

        {/* ── Mobile Hamburger ── */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-600 transition-colors hover:bg-neutral-100 lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X size={18} />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Menu size={18} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </nav>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="overflow-hidden border-t border-neutral-100 bg-white lg:hidden"
          >
            <div className="px-4 pb-5 pt-2 space-y-0.5">
              {NAV_LINKS.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ x: -16, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.03, duration: 0.15 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150 ${
                      isActive(link.path)
                        ? 'bg-primary-50 text-primary-700 font-semibold'
                        : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                    }`}
                  >
                    {isActive(link.path) && (
                      <span className="mr-2 h-1.5 w-1.5 rounded-full bg-primary-600" />
                    )}
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Divider */}
              <div className="mx-3 my-3 h-px bg-neutral-100" />

              {/* Mobile auth buttons */}
              <div className="space-y-2 pt-1">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors duration-150 hover:bg-neutral-50"
                >
                  <LogIn className="h-4 w-4" aria-hidden="true" />
                  Log in
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-xs transition-colors duration-150 hover:bg-primary-700"
                >
                  Get Started Free
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
