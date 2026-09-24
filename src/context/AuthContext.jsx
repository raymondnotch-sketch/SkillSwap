import { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import * as authService from '../services/auth.js';

export const AuthContext = createContext(null);

const TOKEN_KEY = 'skillswap_auth_token';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const loadSession = useCallback(async () => {
    const storedToken = window.localStorage.getItem(TOKEN_KEY);
    if (!storedToken) {
      setInitialized(true);
      return;
    }

    try {
      const profile = await authService.me(storedToken);
      setUser(profile);
      setToken(storedToken);
      setIsAuthenticated(true);
    } catch (error) {
      window.localStorage.removeItem(TOKEN_KEY);
      setUser(null);
      setToken(null);
      setIsAuthenticated(false);
    } finally {
      setInitialized(true);
    }
  }, []);

  useEffect(() => {
    loadSession();
  }, [loadSession]);

  const login = useCallback(async (email, password) => {
    const data = await authService.login({ email, password });
    const accessToken = data?.session?.access_token;

    if (!accessToken) {
      throw new Error('Login failed: missing access token.');
    }

    window.localStorage.setItem(TOKEN_KEY, accessToken);
    const profile = data?.profile ?? (await authService.me(accessToken));
    setUser(profile);
    setToken(accessToken);
    setIsAuthenticated(true);

    return { success: true };
  }, []);

  const logout = useCallback(async () => {
    if (token) {
      try {
        await authService.logout(token);
      } catch (error) {
        console.warn('Logout failed on server:', error);
      }
    }

    window.localStorage.removeItem(TOKEN_KEY);
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  }, [token]);

  const register = useCallback(async (userData) => {
    return authService.register(userData);
  }, []);

  const value = useMemo(
    () => ({ user, token, isAuthenticated, initialized, login, logout, register }),
    [user, token, isAuthenticated, initialized, login, logout, register]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
