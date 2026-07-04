import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Handshake, MessageSquare, Bell,
  BookOpen, Trophy, Users, User, Settings,
  HelpCircle, MessageCircle, LogOut, Shield,
  ChevronLeft, ChevronRight, X, Calendar, Clock,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { DASHBOARD_NAV_GROUPS, DASHBOARD_BOTTOM_NAV, DASHBOARD_HIDDEN_NAV, APP_NAME } from '../../constants';

const iconMap = {
  Dashboard: LayoutDashboard,
  Matches: Handshake,
  Messages: MessageSquare,
  Notifications: Bell,
  'Learning Paths': BookOpen,
  Leaderboard: Trophy,
  Community: Users,
  Events: Calendar,
  'Session Booking': Clock,
  Profile: User,
  Settings: Settings,
  Help: HelpCircle,
  Feedback: MessageCircle,
  Administration: Shield,
};

function NavItem({ item, collapsed, isActive }) {
  const Icon = iconMap[item.label] || LayoutDashboard;

  if (collapsed) {
    return (
      <Link
        to={item.path}
        className="group relative flex items-center justify-center rounded-xl p-2.5 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        aria-label={item.label}
      >
        <Icon className="h-5 w-5" />
        <div className="absolute left-full ml-2 hidden rounded-lg bg-neutral-900 px-2.5 py-1.5 text-xs font-medium text-white shadow-md group-hover:block whitespace-nowrap">
          {item.label}
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={item.path}
      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
        isActive
          ? 'bg-primary-50 text-primary-700'
          : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
      }`}
      aria-current={isActive ? 'page' : undefined}
    >
      <Icon className="h-5 w-5 shrink-0" />
      <span>{item.label}</span>
    </Link>
  );
}

export default function Sidebar({ isMobileOpen, onMobileClose, isCollapsed, onToggleCollapse, onHoverChange }) {
  const location = useLocation();
  const { logout } = useAuth();
  const [hoveredCollapsed, setHoveredCollapsed] = useState(false);

  const effectiveCollapsed = isCollapsed && !hoveredCollapsed;

  const isActive = (path) => {
    if (path === '/dashboard') return location.pathname === '/dashboard';
    return location.pathname.startsWith(path);
  };

  const sidebarContent = (
    <div className={`flex h-full flex-col ${effectiveCollapsed ? 'w-16' : 'w-64'}`}>
      <div className={`flex h-16 items-center border-b border-neutral-100 ${effectiveCollapsed ? 'justify-center px-0' : 'gap-2 px-6'}`}>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-600 text-sm font-bold text-white">
          S
        </div>
        {!effectiveCollapsed && (
          <span className="text-lg font-semibold tracking-tight text-neutral-900">{APP_NAME}</span>
        )}
      </div>

      <nav className={`flex-1 overflow-y-auto py-4 ${effectiveCollapsed ? 'px-2 space-y-4' : 'px-3 space-y-6'}`} aria-label="Dashboard navigation">
        {DASHBOARD_NAV_GROUPS.map((group) => (
          <div key={group.label}>
            {!effectiveCollapsed && (
              <p className="mb-1 px-3 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                {group.label}
              </p>
            )}
            <div className={`${effectiveCollapsed ? 'flex flex-col items-center gap-1' : 'space-y-0.5'}`}>
              {group.items.map((item) => (
                <NavItem
                  key={item.path}
                  item={item}
                  collapsed={effectiveCollapsed}
                  isActive={isActive(item.path)}
                />
              ))}
            </div>
          </div>
        ))}

        {!effectiveCollapsed && (
          <div>
            <p className="mb-1 px-3 text-xs font-semibold uppercase tracking-wider text-neutral-300 opacity-50">
              {DASHBOARD_HIDDEN_NAV[0].label}
            </p>
            <div className="space-y-0.5 opacity-30">
              {DASHBOARD_HIDDEN_NAV.map((item) => {
                const Icon = iconMap[item.label] || Shield;
                return (
                  <div
                    key={item.path}
                    className="flex cursor-not-allowed items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-neutral-400"
                    aria-disabled="true"
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      <div className={`border-t border-neutral-100 py-3 ${effectiveCollapsed ? 'px-2 space-y-1' : 'px-3 space-y-0.5'}`}>
        {DASHBOARD_BOTTOM_NAV.map((item) => {
          const Icon = iconMap[item.label] || HelpCircle;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 rounded-xl text-sm font-medium text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
                effectiveCollapsed ? 'justify-center p-2.5' : 'px-3 py-2.5'
              }`}
              aria-label={effectiveCollapsed ? item.label : undefined}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!effectiveCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
        <button
          onClick={logout}
          className={`flex w-full items-center gap-3 rounded-xl text-sm font-medium text-neutral-500 transition-colors hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
            effectiveCollapsed ? 'justify-center p-2.5' : 'px-3 py-2.5'
          }`}
          aria-label={effectiveCollapsed ? 'Sign Out' : undefined}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!effectiveCollapsed && <span>Sign Out</span>}
        </button>
      </div>

      {!effectiveCollapsed && (
        <button
          onClick={onToggleCollapse}
          className="hidden border-t border-neutral-100 p-3 text-neutral-400 transition-colors hover:text-neutral-600 lg:flex items-center justify-center"
          aria-label="Collapse sidebar"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      )}
      {effectiveCollapsed && (
        <button
          onClick={onToggleCollapse}
          className="hidden border-t border-neutral-100 p-3 text-neutral-400 transition-colors hover:text-neutral-600 lg:flex items-center justify-center"
          aria-label="Expand sidebar"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <motion.aside
        className="hidden lg:flex lg:flex-col fixed left-0 top-0 h-screen bg-white border-r border-neutral-200/60 z-30"
        animate={{ width: effectiveCollapsed ? 64 : 256 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        onMouseEnter={() => {
          if (isCollapsed) {
            setHoveredCollapsed(true);
            onHoverChange?.(true);
          }
        }}
        onMouseLeave={() => {
          setHoveredCollapsed(false);
          onHoverChange?.(false);
        }}
      >
        {sidebarContent}
      </motion.aside>

      {/* Mobile drawer overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-neutral-900/50 lg:hidden"
            onClick={onMobileClose}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.aside
            initial={{ x: -288 }}
            animate={{ x: 0 }}
            exit={{ x: -288 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-soft-xl lg:hidden"
          >
            <div className="flex h-full flex-col">
              <div className="flex h-16 items-center justify-between border-b border-neutral-100 px-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-sm font-bold text-white">
                    S
                  </div>
                  <span className="text-lg font-semibold tracking-tight text-neutral-900">{APP_NAME}</span>
                </div>
                <button
                  onClick={onMobileClose}
                  className="rounded-lg p-1.5 text-neutral-500 transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                  aria-label="Close navigation menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6" aria-label="Mobile navigation">
                {DASHBOARD_NAV_GROUPS.map((group) => (
                  <div key={group.label}>
                    <p className="mb-1 px-3 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                      {group.label}
                    </p>
                    <div className="space-y-0.5">
                      {group.items.map((item) => {
                        const Icon = iconMap[item.label] || LayoutDashboard;
                        const active = isActive(item.path);
                        return (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={onMobileClose}
                            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
                              active
                                ? 'bg-primary-50 text-primary-700'
                                : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                            }`}
                            aria-current={active ? 'page' : undefined}
                          >
                            <Icon className="h-5 w-5 shrink-0" />
                            <span>{item.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </nav>

              <div className="border-t border-neutral-100 px-3 py-3 space-y-0.5">
                {DASHBOARD_BOTTOM_NAV.map((item) => {
                  const Icon = iconMap[item.label] || HelpCircle;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={onMobileClose}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
                <button
                  onClick={() => { logout(); onMobileClose(); }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-neutral-500 transition-colors hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                  aria-label="Sign Out"
                >
                  <LogOut className="h-5 w-5 shrink-0" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
