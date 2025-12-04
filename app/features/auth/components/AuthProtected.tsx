import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router';
import { useAuthStore } from '~/stores/useAuthStore';

const AuthProtected = () => {
  const { accessToken, user, loading, refresh, fetchMe } = useAuthStore();

  const [flagStart, setFlagStart] = useState(true);
  const initializeAuth = async () => {
    if (!accessToken) {
      await refresh();
    }

    if (accessToken && !user) {
      await fetchMe();
    }

    setFlagStart(false);
  };

  useEffect(() => {
    initializeAuth();
  }, []);

  if (flagStart || loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (!accessToken) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  return <Outlet />;
};

export default AuthProtected;
