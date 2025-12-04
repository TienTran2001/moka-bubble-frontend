import { AuthLayout } from '~/features/auth/components/AuthLayout';
import { SignInForm } from '~/features/auth/components/SignInForm';

const SignIn = () => {
  return (
    <AuthLayout
      title="Login to Moka Bubble"
      description="Đăng nhập để trải nghiệm Moka Bubble"
    >
      <SignInForm />
    </AuthLayout>
  );
};

export default SignIn;
