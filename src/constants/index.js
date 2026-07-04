export const APP_NAME = 'SkillSwap';

export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'How It Works', path: '/how-it-works' },
  { label: 'About', path: '/about' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Contact', path: '/contact' },
];

export const FOOTER_LINKS = {
  product: [
    { label: 'How It Works', path: '/how-it-works' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Contact', path: '/contact' },
  ],
  company: [
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ],
  legal: [
    { label: 'Privacy', path: '/privacy' },
    { label: 'Terms', path: '/terms' },
  ],
};

export const DASHBOARD_NAV_GROUPS = [
  {
    label: 'Main',
    items: [
      { label: 'Dashboard', path: '/dashboard' },
      { label: 'Matches', path: '/matches' },
      { label: 'Messages', path: '/messages' },
      { label: 'Notifications', path: '/notifications' },
    ],
  },
  {
    label: 'Learning',
    items: [
      { label: 'Learning Paths', path: '/learning' },
    ],
  },
  {
    label: 'Community',
    items: [
      { label: 'Leaderboard', path: '/leaderboard' },
      { label: 'Community', path: '/community' },
      { label: 'Events', path: '/events' },
    ],
  },
  {
    label: 'Sessions',
    items: [
      { label: 'Session Booking', path: '/sessions' },
    ],
  },
  {
    label: 'Profile',
    items: [
      { label: 'Profile', path: '/profile' },
      { label: 'Settings', path: '/settings' },
    ],
  },
];

export const DASHBOARD_BOTTOM_NAV = [
  { label: 'Help', path: '/help' },
  { label: 'Feedback', path: '/feedback' },
];

export const DASHBOARD_HIDDEN_NAV = [
  { label: 'Administration', path: '/admin' },
];

export const PATH_TITLES = {
  '/dashboard': 'Dashboard',
  '/matches': 'Matches',
  '/messages': 'Messages',
  '/notifications': 'Notifications',
  '/learning': 'Learning Paths',
  '/leaderboard': 'Leaderboard',
  '/community': 'Community',
  '/profile': 'Profile',
  '/profile/edit': 'Edit Profile',
  '/settings': 'Settings',
  '/events': 'Events',
  '/sessions': 'Session Booking',
  '/help': 'Help',
  '/feedback': 'Feedback',
  '/admin': 'Administration',
  '/admin/dashboard': 'Admin Dashboard',
  '/admin/verification': 'Verification Queue',
  '/admin/reports': 'Reports',
  '/admin/users': 'User Management',
};
