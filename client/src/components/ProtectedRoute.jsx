'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      // Redirect to login if not authenticated
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
    } else if (!loading && isAuthenticated && adminOnly && user?.role !== 'admin') {
      // Redirect to home if not admin but admin access is required
      router.push('/');
    }
  }, [isAuthenticated, loading, router, pathname, user, adminOnly]);

  if (loading || !isAuthenticated || (adminOnly && user?.role !== 'admin')) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
