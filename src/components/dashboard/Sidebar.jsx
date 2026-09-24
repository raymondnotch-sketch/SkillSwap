import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Handshake, MessageSquare, Bell,
  BookOpen, Trophy, Users, User, Settings, HelpCircle,
  MessageCircle, LogOut, Shield, ChevronLeft, ChevronRight,
  Calendar, Clock,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import {
  DASHBOARD_NAV_GROUPS, DASHBOARD_BOTTOM_NAV,
  DASHBOARD_HIDDEN_NAV, APP_NAME,
} from '../../constants';

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

/* ── Tooltip wrapper for collapsed state ── */
function Tooltip({ label, children }) {
  return (
    <div className="group/tip relative">
      {children}
      <span className="pointer-events-none absolute left-full top-1/2 z-50 ml-3 -translate-y-1/2 whitespace-nowrap rounded-lg bg-neutral-900 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover/tip:opacity-100">
        {label}
        <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-neutral-900" />
      </span>
    </div>
  );
}

/* ── NavItem ── */
function NavItem({ item, collapsed, isActive }) {
  const Icon = iconMap[item.label] || LayoutDashboard;

  if (collapsed) {
    return (
      <Tooltip label={item.label}>
        <Link
          to={item.path}
          className={`flex items-center justify-center rounded-xl p-2.5 transition-all duration-150 ${
            isActive
              ? 'bg-primary-600 text-white shadow-md shadow-primary-500/30'
              : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800'
          }`}
          aria-current={isActive ? 'page' : undefined}
        >
          <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
        </Link>
      </Tooltip>
    );
  }

  return (
    <Link
      to={item.path}
      className={`group relative flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition-all duration-150 ${
        isActive
          ? 'bg-primary-50 font-semibold text-primary-700'
          : 'font-medium text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
      }`}
      aria-current={isActive ? 'page' : undefined}
    >
      {/* Active left bar */}
      {isActive && (
        <motion.span
          layoutId="sidebar-active-bar"
          className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r-full bg-primary-600"
          transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
        />
      )}
      <Icon
        className={`h-[17px] w-[17px] shrink-0 transition-colors duration-150 ${
          isActive ? 'text-primary-600' : 'text-neutral-400 group-hover:text-neutral-600'
        }`}
        aria-hidden="true"
      />
      <span className="truncate">{item.label}</span>
    </Link>
  );
}

/* ── Sidebar content ── */
function SidebarContent({ isCollapsed, onToggleCollapse, logout }) {
  const location = useLocation();

  const isActive = (path) =>
    path === '/dashboard'
      ? location.pathname === '/dashboard'
      : location.pathname.startsWith(path);

  return (
    <div className="flex h-full flex-col bg-white">
      {/* Logo header */}
      <div className={`flex h-[64px] shrink-0 items-center border-b border-neutral-100 ${isCollapsed ? 'justify-center px-3' : 'px-4'}`}>
        {isCollapsed ? (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-sm font-bold text-white shadow-xs">
            S
          </div>
        ) : (
          <Link
            to="/dashboard"
            className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-lg"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-sm font-bold text-white shadow-xs">
              S
            </div>
            <span className="font-bold text-neutral-900 text-base tracking-tight">{APP_NAME}</span>
          </Link>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Sidebar navigation">
        <div className="space-y-5">
          {DASHBOARD_NAV_GROUPS.map((group) => (
            <div key={group.label}>
              {!isCollapsed && (
                <p className="mb-1.5 px-3 text-[10px] font-bold uppercase tracking-[0.1em] text-neutral-400">
                  {group.label}
                </p>
              )}
              {isCollapsed && <div className="my-1.5 mx-2 h-px bg-neutral-100" />}
              <div className="space-y-0.5">
                {group.items.map((item) => (
                  <NavItem
                    key={item.path}
                    item={item}
                    collapsed={isCollapsed}
                    isActive={isActive(item.path)}
                  />
                ))}
              </div>
            </div>
          ))}

          {/* Hidden nav — dimmed preview */}
          {!isCollapsed && DASHBOARD_HIDDEN_NAV.length > 0 && (
            <div className="opacity-35 pointer-events-none select-none">
              <p className="mb-1.5 px-3 text-[10px] font-bold uppercase tracking-[0.1em] text-neutral-400">
                Admin
              </p>
              <div className="space-y-0.5">
                {DASHBOARD_HIDDEN_NAV.map((item) => {
                  const Icon = iconMap[item.label] || Shield;
                  return (
                    <div
                      key={item.path}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-neutral-500"
                    >
                      <Icon className="h-[17px] w-[17px] shrink-0" aria-hidden="true" />
                      <span>{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Footer nav */}
      <div className="border-t border-neutral-100 p-3 space-y-0.5">
        {DASHBOARD_BOTTOM_NAV.map((item) => {
          const Icon = iconMap[item.label] || HelpCircle;
          const active = location.pathname.startsWith(item.path);

          if (isCollapsed) {
            return (
              <Tooltip key={item.path} label={item.label}>
                <Link
                  to={item.path}
                  className={`flex items-center justify-center rounded-xl p-2.5 transition-all duration-150 ${
                    active ? 'bg-primary-50 text-primary-700' : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800'
                  }`}
                >
                  <Icon className="h-[17px] w-[17px]" aria-hidden="true" />
                </Link>
              </Tooltip>
            );
          }

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-150 ${
                active ? 'bg-primary-50 text-primary-700' : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
              }`}
            >
              <Icon className="h-[17px] w-[17px] shrink-0" aria-hidden="true" />
              <span>{item.label}</span>
            </Link>
          );
        })}

        {/* Logout */}
        {isCollapsed ? (
          <Tooltip label="Sign Out">
            <button
              onClick={logout}
              className="flex w-full items-center justify-center rounded-xl p-2.5 text-neutral-500 transition-colors duration-150 hover:bg-rose-50 hover:text-rose-600"
            >
              <LogOut className="h-[17px] w-[17px]" aria-hidden="true" />
            </button>
          </Tooltip>
        ) : (
          <button
            onClick={logout}
            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-neutral-600 transition-colors duration-150 hover:bg-rose-50 hover:text-rose-600"
          >
            <LogOut className="h-[17px] w-[17px] shrink-0" aria-hidden="true" />
            <span>Sign Out</span>
          </button>
        )}
      </div>

      {/* Collapse toggle */}
      <div className="border-t border-neutral-100 p-3 flex justify-center">
        <button
          onClick={onToggleCollapse}
          className="flex h-8 w-8 items-center justify-center rounded-xl text-neutral-400 transition-all duration-150 hover:bg-neutral-100 hover:text-neutral-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed
            ? <ChevronRight className="h-4 w-4" aria-hidden="true" />
            : <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          }
        </button>
      </div>
    </div>
  );
}

/* ── Sidebar export ── */
export default function Sidebar({ isMobileOpen, onMobileClose, isCollapsed, onToggleCollapse }) {
  const { logout } = useAuth();

  return (
    <>
      {/* Desktop sidebar */}
      <motion.aside
        className="hidden lg:flex lg:flex-col sticky top-0 h-screen border-r border-neutral-100 overflow-hidden self-start"
        animate={{ width: isCollapsed ? 72 : 240 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      >
        <SidebarContent
          isCollapsed={isCollapsed}
          onToggleCollapse={onToggleCollapse}
          logout={logout}
        />
      </motion.aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-neutral-950/40 backdrop-blur-sm lg:hidden"
            onClick={onMobileClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.aside
            className="fixed inset-y-0 left-0 z-50 w-64 border-r border-neutral-100 bg-white shadow-2xl lg:hidden"
            initial={{ x: -256 }}
            animate={{ x: 0 }}
            exit={{ x: -256 }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            aria-label="Mobile navigation"
          >
            <SidebarContent
              isCollapsed={false}
              onToggleCollapse={onMobileClose}
              logout={logout}
            />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
