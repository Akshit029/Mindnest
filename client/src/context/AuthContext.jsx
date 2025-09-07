'use client';
import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';

const AuthContext = createContext({ user: null, loading: true, refresh: async () => {}, logout: async () => {} });

const getApiBase = () => {
  const raw = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_URI;
  if (!raw) return '/api';
  const trimmed = raw.replace(/\/+$/, '');
  return trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch(`${getApiBase()}/auth/me`, { credentials: 'include' });
      if (!res.ok) {
        setUser(null);
        return;
      }
      const data = await res.json();
      if (data?.success) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (_e) {
      setUser(null);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch(`${getApiBase()}/auth/logout`, { method: 'POST', credentials: 'include' });
    } finally {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      await refresh();
      if (mounted) setLoading(false);
    })();
    return () => { mounted = false; };
  }, [refresh]);

  const value = useMemo(() => ({ user, loading, refresh, logout }), [user, loading, refresh, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


