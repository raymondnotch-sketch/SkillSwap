import { request } from './api.js';

export async function getPendingVerifications() {
  try {
    const data = await request('/admin/verifications/pending');
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.warn('Failed to fetch pending verifications:', error);
    return [];
  }
}

export async function approveVerification(id) {
  return request(`/admin/verifications/${id}`, {
    method: 'PATCH',
    data: { status: 'verified' },
  });
}

export async function rejectVerification(id) {
  return request(`/admin/verifications/${id}`, {
    method: 'PATCH',
    data: { status: 'rejected' },
  });
}

export async function getReports(status) {
  try {
    const data = await request(`/admin/reports${status ? `?status=${status}` : ''}`);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.warn('Failed to fetch admin reports:', error);
    return [];
  }
}

export async function resolveReport(id, status = 'resolved') {
  return request(`/admin/reports/${id}`, {
    method: 'PATCH',
    data: { status },
  });
}

export async function getAdminStats() {
  try {
    const [pendingVerifs, reportsList] = await Promise.all([
      getPendingVerifications(),
      getReports(),
    ]);

    return {
      pendingVerificationsCount: pendingVerifs.length,
      openReportsCount: reportsList.filter((r) => r.status !== 'resolved').length,
      totalUsers: 0,
    };
  } catch (error) {
    return { pendingVerificationsCount: 0, openReportsCount: 0, totalUsers: 0 };
  }
}

export async function getRecentVerifications() {
  return getPendingVerifications();
}

export async function getRecentReports() {
  return getReports();
}

export async function getActivityLog() {
  return [];
}
