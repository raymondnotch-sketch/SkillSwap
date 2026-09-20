import { request } from './api.js';

export async function getConversations() {
  try {
    const rawMatches = await request('/matches/my');
    if (!Array.isArray(rawMatches)) return [];

    // Filter active/accepted matches as conversations
    const activeMatches = rawMatches.filter(
      (m) => m.status === 'accepted' || m.status === 'active'
    );

    return activeMatches.map((m) => {
      const partner = m.partner || m.other_user || {};
      return {
        id: m.id,
        matchId: m.id,
        name: partner.full_name || 'SkillSwap Partner',
        avatar: partner.avatar_url || '',
        lastMessage: m.last_message || 'Start your conversation',
        time: m.updated_at ? new Date(m.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recently',
        unread: m.unread_count || 0,
        online: false,
      };
    });
  } catch (error) {
    console.warn('Failed to fetch conversations:', error);
    return [];
  }
}

export async function getMessages(matchId) {
  if (!matchId) return [];
  try {
    const history = await request(`/messages/${matchId}`);
    return Array.isArray(history) ? history : [];
  } catch (error) {
    console.warn('Failed to fetch message history:', error);
    return [];
  }
}

export async function sendMessage(matchId, text) {
  if (!matchId || !text) return null;
  return request(`/messages/${matchId}`, {
    method: 'POST',
    data: { content: text },
  });
}

export async function markAsRead(matchId) {
  if (!matchId) return;
  return request(`/messages/${matchId}/read`, {
    method: 'PATCH',
  });
}
