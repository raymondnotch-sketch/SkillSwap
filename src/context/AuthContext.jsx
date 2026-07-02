import { createContext, useState, useCallback, useMemo } from 'react';

export const AuthContext = createContext(null);

const MOCK_USER = {
  id: 'user-1',
  name: 'Alex Chen',
  email: 'alex@skillswap.dev',
  initials: 'AC',
  bio: '',
  location: '',
  rating: 0,
  reviewCount: 0,
  sessionsCompleted: 0,
  joinedAt: new Date().toISOString(),
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(MOCK_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const login = useCallback((_email, _password) => {
    setUser(MOCK_USER);
    setIsAuthenticated(true);
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const register = useCallback((userData) => {
    const newUser = {
      id: `user-${Date.now()}`,
      name: userData.name || '',
      email: userData.email || '',
      initials:
        (userData.name || '')
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2) || '?',
      avatar: null,
      joinedAt: new Date().toISOString(),
      bio: '',
      location: '',
      rating: 0,
      reviewCount: 0,
      sessionsCompleted: 0,
    };
    setUser(newUser);
    setIsAuthenticated(true);
    return { success: true, user: newUser };
  }, []);

  const value = useMemo(
    () => ({ user, isAuthenticated, login, logout, register }),
    [user, isAuthenticated, login, logout, register]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
