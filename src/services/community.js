import { request } from './api.js';

export async function getCategories() {
  try {
    const results = await request('/skills/search?q=');
    if (!Array.isArray(results)) return [];
    const categoriesSet = new Set(results.map((r) => r.category).filter(Boolean));
    return Array.from(categoriesSet).map((name, idx) => ({ id: idx + 1, name }));
  } catch (error) {
    return [
      { id: 1, name: 'Computer Science' },
      { id: 2, name: 'Design' },
      { id: 3, name: 'Languages' },
      { id: 4, name: 'Mathematics' },
    ];
  }
}

export async function getDiscussions() {
  return [];
}

export async function getPopularTopics() {
  return [];
}
