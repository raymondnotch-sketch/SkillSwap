import { request } from './api.js';

export async function getSessions(matchId) {
  if (matchId) {
    try {
      const res = await request(`/sessions/match/${matchId}`);
      return Array.isArray(res) ? res : [];
    } catch (error) {
      console.warn('Failed to fetch match sessions:', error);
      return [];
    }
  }

  // Fetch sessions for user's active matches
  try {
    const rawMatches = await request('/matches/my');
    if (!Array.isArray(rawMatches)) return [];
    
    const activeMatches = rawMatches.filter((m) => m.status === 'accepted' || m.status === 'active');
    const sessionPromises = activeMatches.map((m) =>
      request(`/sessions/match/${m.id}`).catch(() => [])
    );

    const sessionLists = await Promise.all(sessionPromises);
    return sessionLists.flat();
  } catch (error) {
    console.warn('Failed to fetch user sessions:', error);
    return [];
  }
}

export async function createSession(data) {
  return request('/sessions', {
    method: 'POST',
    data: {
      match_id: data.matchId || data.match_id,
      scheduled_at: data.scheduledAt || data.scheduled_at,
      duration_minutes: data.durationMinutes || data.duration_minutes || 60,
      notes: data.notes || '',
    },
  });
}

export async function completeSession(sessionId) {
  return request(`/sessions/${sessionId}/complete`, {
    method: 'POST',
  });
}

export async function cancelSession(sessionId) {
  return request(`/sessions/${sessionId}/cancel`, {
    method: 'POST',
  });
}

export async function generateRoomUrl(sessionId) {
  return request(`/sessions/${sessionId}/room`, {
    method: 'POST',
  });
}

export function getTimeSlots() {
  return [
    '09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
  ];
}
