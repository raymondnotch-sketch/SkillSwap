const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

function buildHeaders(token, isFormData = false) {
  const headers = {};
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  const authToken = token || (typeof window !== 'undefined' ? window.localStorage.getItem('skillswap_auth_token') : null);

  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  return headers;
}

export async function request(path, { method = 'GET', data, token } = {}) {
  const isFormData = typeof FormData !== 'undefined' && data instanceof FormData;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: buildHeaders(token, isFormData),
    body: data ? (isFormData ? data : JSON.stringify(data)) : undefined,
  });

  const contentType = response.headers.get('content-type') || '';
  const body = contentType.includes('application/json')
    ? await response.json().catch(() => null)
    : null;

  if (!response.ok) {
    const message = body?.error || body?.message || response.statusText || 'Request failed';
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }

  return body;
}
