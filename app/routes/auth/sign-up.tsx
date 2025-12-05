import { AuthLayout } from '~/features/auth/components/AuthLayout';
import { SignUpForm } from '~/features/auth/components/SignUpForm';

const SignUp = () => {
  return (
    <AuthLayout title="Sign up for Moka Bubble">
      <SignUpForm />
    </AuthLayout>
  );
};

export default SignUp;
