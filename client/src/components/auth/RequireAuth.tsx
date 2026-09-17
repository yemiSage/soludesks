import { useEffect, type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../lib/auth';

export const RequireAuth = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, openAuthModal } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) openAuthModal('signin');
  }, [isAuthenticated, openAuthModal]);

  if (!isAuthenticated) return <Navigate to="/" replace state={{ from: location }} />;
  return <>{children}</>;
};
