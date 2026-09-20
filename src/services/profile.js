import { request } from './api.js';

export async function getProfile(userId) {
  if (!userId) {
    return request('/auth/me');
  }
  return request(`/profiles/${userId}`);
}

export async function updateProfile(userId, data) {
  return request(`/profiles/${userId}`, {
    method: 'PATCH',
    data,
  });
}

export async function uploadAvatar(userId, file) {
  const formData = new FormData();
  formData.append('avatar', file);
  return request(`/profiles/${userId}/avatar`, {
    method: 'POST',
    data: formData,
  });
}

export async function uploadStudentId(userId, file) {
  const formData = new FormData();
  formData.append('student_id', file);
  return request(`/profiles/${userId}/student-id`, {
    method: 'POST',
    data: formData,
  });
}

export async function getMySkills() {
  return request('/skills/my');
}

export async function addSkill(skillData) {
  return request('/skills', {
    method: 'POST',
    data: skillData,
  });
}

export async function updateSkill(skillId, skillData) {
  return request(`/skills/${skillId}`, {
    method: 'PATCH',
    data: skillData,
  });
}

export async function deleteSkill(skillId) {
  return request(`/skills/${skillId}`, {
    method: 'DELETE',
  });
}

export async function searchSkills(query, category) {
  const params = new URLSearchParams();
  if (query) params.append('q', query);
  if (category) params.append('category', category);
  const queryString = params.toString();
  return request(`/skills/search${queryString ? `?${queryString}` : ''}`);
}

export async function getReviews(matchId) {
  if (matchId) {
    return request(`/reviews/match/${matchId}`).catch(() => []);
  }
  return [];
}
