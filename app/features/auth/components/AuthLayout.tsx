import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { Navigate } from 'react-router';
import { useAuthStore } from '~/stores/useAuthStore';

type AuthLayoutProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export const AuthLayout = ({
  title,
  description,
  children,
}: AuthLayoutProps) => {
  const { accessToken, loading, refresh } = useAuthStore();

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      let currentAccessToken = useAuthStore.getState().accessToken;

      if (!currentAccessToken) {
        try {
          await refresh();
          currentAccessToken = useAuthStore.getState().accessToken;
        } catch (error) {
          console.error('Refresh token failed:', error);
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [refresh]);

  if (accessToken) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="auth-page">
      <div className="auth-shell">
        {/* Left panel */}
        <div className="auth-shell-left">
          <div>
            <div className="auth-shell-left-header">
              <div>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGUQV91E1RBUIcJ62uLSA0w8f569WZLMWIKg&s"
                  alt="moka"
                  className="size-[100px] object-cover rounded-full"
                />
              </div>
              <div className="auth-shell-left-title">
                <span className="auth-shell-left-title-main">Moka Bubble</span>
                <span className="auth-shell-left-title-sub">
                  Fast. Secure. Easy to use.
                </span>
              </div>
            </div>

            <h2 className="auth-shell-left-heading">
              Welcome to your Moka Bubble
            </h2>
            <p className="auth-shell-left-text">
              Send messages quickly, synced across all devices,
            </p>
          </div>

          <div className="auth-shell-left-footer">
            Sign in to continue your conversations, groups, and favorite
            channels.
          </div>
        </div>

        {/* Right panel - form auth */}
        <div className="auth-shell-right">
          <div className="auth-shell-right-header">
            <h1 className="auth-shell-right-title">{title}</h1>
            {description && (
              <p className="auth-shell-right-description">{description}</p>
            )}
          </div>

          {children}

          <p className="auth-shell-right-footer">
            By continuing, you agree to the Terms of Service &amp; Privacy
            Policy.
          </p>
        </div>
      </div>
    </main>
  );
};
