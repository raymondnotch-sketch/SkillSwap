import { getSuggestions } from './matches.js';
import { getSessions } from './sessions.js';
import { getNotifications } from './notifications.js';
import { getConversations } from './messages.js';

export async function getDashboardData() {
  try {
    const [suggestions, sessions, notifications, conversations] = await Promise.all([
      getSuggestions(5).catch(() => []),
      getSessions().catch(() => []),
      getNotifications().catch(() => []),
      getConversations().catch(() => []),
    ]);

    const upcomingSessions = Array.isArray(sessions) ? sessions : [];
    const notificationsPreview = Array.isArray(notifications) ? notifications.slice(0, 5) : [];
    const recentMessages = Array.isArray(conversations) ? conversations.slice(0, 5) : [];

    return {
      upcomingSessions,
      recentActivity: [],
      suggestedSkills: suggestions.map((s) => ({
        id: s.user?.id || s.id,
        name: s.offer_skill || s.user?.full_name || 'Skill Swap Suggestion',
        partner: s.user?.full_name || 'Student',
        avatar: s.user?.avatar_url || '',
        matchScore: s.score || 90,
      })),
      recentMessages,
      leaderboardPreview: [],
      notificationsPreview,
    };
  } catch (error) {
    console.warn('Failed to compile dashboard data:', error);
    return {
      upcomingSessions: [],
      recentActivity: [],
      suggestedSkills: [],
      recentMessages: [],
      leaderboardPreview: [],
      notificationsPreview: [],
    };
  }
}
