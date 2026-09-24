import { request } from './api.js';

export async function getLearningPaths() {
  try {
    const results = await request('/skills/search?q=').catch(() => []);
    if (!Array.isArray(results)) return [];
    return results.slice(0, 6).map((skill, idx) => ({
      id: skill.id || idx + 1,
      title: `${skill.skill_name || 'Skill'} Mastery`,
      category: skill.category || 'General',
      level: skill.proficiency_level || 'All Levels',
    }));
  } catch (error) {
    return [];
  }
}
