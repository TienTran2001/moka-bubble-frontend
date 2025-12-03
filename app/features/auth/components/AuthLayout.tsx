import type { ReactNode } from 'react';

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
  return (
    <main className="auth-page">
      <div className="auth-shell">
        {/* Left panel - giống Telegram promo */}
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
              Gửi tin nhắn nhanh chóng, đồng bộ trên mọi thiết bị,
            </p>
          </div>

          <div className="auth-shell-left-footer">
            Đăng nhập để tiếp tục các cuộc hội thoại, nhóm và kênh yêu thích của
            bạn.
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
            Bằng việc tiếp tục, bạn đồng ý với Điều khoản dịch vụ &amp; Chính
            sách bảo mật.
          </p>
        </div>
      </div>
    </main>
  );
};
