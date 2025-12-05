import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { Button } from '~/components/ui/Button';
import { Input } from '~/components/ui/Input';
import { signInSchema, type SignInSchema } from '~/features/auth/schemas';
import { useAuthStore } from '~/stores/useAuthStore';

type SignInFormProps = {
  onSuccessRedirectTo?: string;
};

export const SignInForm: React.FC<SignInFormProps> = ({
  onSuccessRedirectTo = '/',
}) => {
  const navigate = useNavigate();
  const signIn = useAuthStore((state) => state.signIn);
  const errorServer = useAuthStore((state) => state.errorServer);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    mode: 'onSubmit',
  });

  const onSubmit = async (values: SignInSchema) => {
    const success = await signIn(values);

    if (success) {
      navigate(onSuccessRedirectTo);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Input
        type="text"
        label="Username"
        placeholder="Nhập thông tin đăng nhập..."
        disabled={isSubmitting}
        errorMessage={errors.username?.message?.toString()}
        {...register('username')}
      />

      <Input
        type="password"
        label="Password"
        placeholder="Nhập mật khẩu..."
        disabled={isSubmitting}
        errorMessage={errors.password?.message?.toString()}
        {...register('password')}
      />

      {errorServer && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
          {errorServer}
        </div>
      )}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Đang đăng nhập...' : 'Tiếp tục'}
      </Button>
    </form>
  );
};
