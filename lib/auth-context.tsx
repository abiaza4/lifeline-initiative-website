'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  user: { email: string } | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_EMAIL = 'admin@liss-southsudan.org';
const ADMIN_PASSWORD = 'LISS@2024';
const SESSION_KEY = 'liss-admin-session';
const SESSION_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if there's a valid session
    if (typeof window !== 'undefined') {
      const session = localStorage.getItem(SESSION_KEY);
      if (session) {
        try {
          const parsed = JSON.parse(session);
          if (parsed.expiry > Date.now()) {
            setIsAuthenticated(true);
            setUser({ email: parsed.email });
          } else {
            localStorage.removeItem(SESSION_KEY);
            setIsAuthenticated(false);
          }
        } catch (error) {
          localStorage.removeItem(SESSION_KEY);
          setIsAuthenticated(false);
        }
      }
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, password: string): boolean => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const session = {
        email,
        expiry: Date.now() + SESSION_EXPIRY,
      };
      if (typeof window !== 'undefined') {
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      }
      setIsAuthenticated(true);
      setUser({ email });
      return true;
    }
    return false;
  };

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(SESSION_KEY);
    }
    setIsAuthenticated(false);
    setUser(null);
  };

  if (isLoading || !mounted) {
    return <div className="flex items-center justify-center min-h-screen bg-background text-foreground">Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
