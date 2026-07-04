import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Bell, CheckCheck, MessageSquare, Handshake, Calendar,
  Star, Award, Users, AlertCircle, Clock, Inbox,
} from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';

const notificationGroups = [
  {
    date: 'Today',
    items: [
      { id: 1, type: 'reminder', icon: Clock, iconBg: 'bg-primary-100', iconColor: 'text-primary-600', title: 'Session Reminder', text: 'Your React Fundamentals session with Sarah Kim starts in 30 minutes.', time: '9:30 AM', read: false },
      { id: 2, type: 'match', icon: Handshake, iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600', title: 'New Match', text: 'You have a new match request from Emily Watson for UI/UX Design.', time: '8:15 AM', read: false },
      { id: 3, type: 'achievement', icon: Star, iconBg: 'bg-amber-100', iconColor: 'text-amber-600', title: 'Achievement Unlocked', text: 'Congratulations! You earned the "Quick Learner" badge.', time: '7:00 AM', read: true },
    ],
  },
  {
    date: 'Yesterday',
    items: [
      { id: 4, type: 'session', icon: Calendar, iconBg: 'bg-indigo-100', iconColor: 'text-indigo-600', title: 'Session Completed', text: 'Your TypeScript session with David Wilson has been marked as complete.', time: '4:30 PM', read: true },
      { id: 5, type: 'message', icon: MessageSquare, iconBg: 'bg-purple-100', iconColor: 'text-purple-600', title: 'New Message', text: 'Emily Parker sent you a message: "Thanks for the great session!"', time: '2:00 PM', read: true },
      { id: 6, type: 'match', icon: Handshake, iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600', title: 'Match Accepted', text: 'James Chen accepted your match request for UI/UX Design Basics.', time: '11:00 AM', read: true },
    ],
  },
  {
    date: 'This Week',
    items: [
      { id: 7, type: 'achievement', icon: Award, iconBg: 'bg-amber-100', iconColor: 'text-amber-600', title: 'Level Up', text: 'You reached Level 12! Keep learning to unlock more rewards.', time: 'Jul 1', read: true },
      { id: 8, type: 'system', icon: Bell, iconBg: 'bg-neutral-100', iconColor: 'text-neutral-600', title: 'System Update', text: 'SkillSwap has new features! Check out the updated learning paths.', time: 'Jun 30', read: true },
      { id: 9, type: 'reminder', icon: Clock, iconBg: 'bg-primary-100', iconColor: 'text-primary-600', title: 'Weekly Roundup', text: 'You completed 5 sessions this week. Great job keeping the streak!', time: 'Jun 29', read: true },
    ],
  },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(notificationGroups);
  const [filter, setFilter] = useState('all');

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'unread', label: 'Unread' },
    { key: 'match', label: 'Matches' },
    { key: 'reminder', label: 'Reminders' },
    { key: 'achievement', label: 'Achievements' },
  ];

  const markAllRead = () => {
    setNotifications((prev) =>
      prev.map((group) => ({
        ...group,
        items: group.items.map((item) => ({ ...item, read: true })),
      }))
    );
  };

  const unreadCount = notifications.reduce(
    (sum, group) => sum + group.items.filter((i) => !i.read).length,
    0
  );

  const filteredGroups = notifications.map((group) => {
    let items = group.items;
    if (filter === 'unread') {
      items = items.filter((i) => !i.read);
    } else if (filter !== 'all') {
      items = items.filter((i) => i.type === filter);
    }
    return { ...group, items };
  }).filter((group) => group.items.length > 0);

  const hasItems = filteredGroups.some((g) => g.items.length > 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="px-4 sm:px-6 lg:px-8 py-6 max-w-3xl mx-auto"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-bold tracking-tight text-neutral-900">Notifications</h1>
          {unreadCount > 0 && (
            <Badge color="primary" variant="solid">{unreadCount} new</Badge>
          )}
        </div>
        {unreadCount > 0 && (
          <Button variant="ghost" size="sm" icon={CheckCheck} onClick={markAllRead}>
            Mark all read
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-1">
        {filters.map((f) => {
          const count = f.key === 'unread'
            ? unreadCount
            : f.key === 'all'
              ? notifications.reduce((s, g) => s + g.items.length, 0)
              : notifications.reduce((s, g) => s + g.items.filter((i) => i.type === f.key).length, 0);
          return (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
                filter === f.key
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50'
              }`}
            >
              {f.label}
              {count > 0 && (
                <span className={`inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-xs font-semibold ${
                  filter === f.key ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-600'
                }`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {!hasItems ? (
        <Card>
          <EmptyState
            icon={Inbox}
            title="No notifications"
            description="You are all caught up! New notifications will appear here."
          />
        </Card>
      ) : (
        <div className="space-y-6">
          {filteredGroups.map((group) => (
            <div key={group.date}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                {group.date}
              </p>
              <div className="space-y-2">
                {group.items.map((notif) => {
                  const Icon = notif.icon;
                  return (
                    <Card
                      key={notif.id}
                      hover
                      className={`relative flex items-start gap-4 p-4 ${
                        !notif.read ? 'border-l-4 border-l-primary-500 bg-primary-50/30' : ''
                      }`}
                    >
                      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${notif.iconBg}`}>
                        <Icon className={`h-4.5 w-4.5 ${notif.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-semibold text-neutral-900">{notif.title}</p>
                          {!notif.read && (
                            <span className="h-2 w-2 shrink-0 rounded-full bg-primary-500" />
                          )}
                        </div>
                        <p className="mt-0.5 text-sm text-neutral-600">{notif.text}</p>
                        <p className="mt-1 text-xs text-neutral-400">{notif.time}</p>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
