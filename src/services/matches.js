import { request } from './api.js';

export const MATCH_TABS = [
  { key: 'suggestions', label: 'Suggestions' },
  { key: 'pending', label: 'Pending' },
  { key: 'accepted', label: 'Accepted' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Completed' },
  { key: 'cancelled', label: 'Cancelled' },
];

export async function getMatchTabs() {
  return MATCH_TABS;
}

export async function getSuggestions(limit = 20) {
  try {
    const suggestions = await request(`/matches/suggestions?limit=${limit}`);
    return Array.isArray(suggestions) ? suggestions : [];
  } catch (error) {
    console.warn('Failed to fetch match suggestions:', error);
    return [];
  }
}

export async function getMatches() {
  try {
    const rawMatches = await request('/matches/my');
    const matchesByStatus = {
      pending: [],
      accepted: [],
      active: [],
      completed: [],
      cancelled: [],
    };

    if (Array.isArray(rawMatches)) {
      rawMatches.forEach((match) => {
        const status = match.status || 'pending';
        if (matchesByStatus[status]) {
          matchesByStatus[status].push(match);
        } else {
          matchesByStatus.pending.push(match);
        }
      });
    }

    return matchesByStatus;
  } catch (error) {
    console.warn('Failed to fetch user matches:', error);
    return {
      pending: [],
      accepted: [],
      active: [],
      completed: [],
      cancelled: [],
    };
  }
}

export async function createMatchRequest(targetUserId, offerSkillId, requestSkillId) {
  return request('/matches', {
    method: 'POST',
    data: {
      target_user_id: targetUserId,
      offer_skill_id: offerSkillId,
      request_skill_id: requestSkillId,
    },
  });
}

export async function acceptMatch(id) {
  return request(`/matches/${id}/accept`, {
    method: 'POST',
  });
}

export async function declineMatch(id) {
  return request(`/matches/${id}/decline`, {
    method: 'POST',
  });
}

export async function cancelMatch(id) {
  return request(`/matches/${id}/cancel`, {
    method: 'POST',
  });
}
