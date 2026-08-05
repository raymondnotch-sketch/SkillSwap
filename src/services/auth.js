import { request } from './api.js';

export function login({ email, password }) {
  return request('/auth/login', {
    method: 'POST',
    data: { email, password },
  });
}

export function register({ full_name, email, password, school, department, level }) {
  return request('/auth/register', {
    method: 'POST',
    data: { full_name, email, password, school, department, level },
  });
}

export function logout(token) {
  return request('/auth/logout', {
    method: 'POST',
    token,
  });
}

export function me(token) {
  return request('/auth/me', {
    token,
  });
}
