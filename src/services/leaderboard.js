import { request } from './api.js';

export async function getGlobalRankings() {
  try {
    const suggestions = await request('/matches/suggestions?limit=50').catch(() => []);
    if (!Array.isArray(suggestions)) return [];
    return suggestions.map((s, idx) => ({
      rank: idx + 1,
      name: s.user?.full_name || 'Student Mentor',
      school: s.user?.school || 'University',
      points: s.user?.reputation_score * 100 || 500,
      avatar: s.user?.avatar_url || '',
    }));
  } catch (error) {
    return [];
  }
}

export async function getSchoolRankings() {
  return getGlobalRankings();
}
