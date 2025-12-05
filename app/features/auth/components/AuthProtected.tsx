import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router';
import { useAuthStore } from '~/stores/useAuthStore';

const AuthProtected = () => {
  const { accessToken, loading, refresh, fetchMe } = useAuthStore();
  const [flagStart, setFlagStart] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      let currentAccessToken = useAuthStore.getState().accessToken;

      if (!currentAccessToken) {
        await refresh();
        currentAccessToken = useAuthStore.getState().accessToken;
      }

      if (currentAccessToken && !useAuthStore.getState().user) {
        await fetchMe();
      }

      if (isMounted) {
        setFlagStart(false);
      }
    };

    initializeAuth();

    return () => {
      isMounted = false;
    };
  }, [refresh, fetchMe]);

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
