import { request } from './api.js';

export async function getNotifications() {
  try {
    const list = await request('/notifications');
    if (!Array.isArray(list)) return [];

    return list.map((item) => ({
      id: item.id,
      text: item.title || item.message || item.text || 'Notification',
      title: item.title,
      type: item.type || 'info',
      read: !!item.read,
      created_at: item.created_at,
      time: item.created_at ? new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recently',
    }));
  } catch (error) {
    console.warn('Failed to fetch notifications:', error);
    return [];
  }
}

export async function markAsRead(id) {
  return request(`/notifications/${id}/read`, {
    method: 'PATCH',
  });
}

export async function markAllRead() {
  return request('/notifications/read-all', {
    method: 'PATCH',
  });
}
