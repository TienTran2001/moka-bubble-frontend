import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

import { Button } from '~/components/ui/Button';
import { Input } from '~/components/ui/Input';
import { signInSchema, type SignInSchema } from '~/features/auth/schemas';
import { axiosInstance } from '~/lib/axiosInstance';

type SignInFormProps = {
  onSuccessRedirectTo?: string;
};

export const SignInForm: React.FC<SignInFormProps> = ({
  onSuccessRedirectTo = '/',
}) => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    mode: 'onSubmit',
  });

  const onSubmit = async (values: SignInSchema) => {
    setServerError(null);

    try {
      // Gọi API đăng nhập
      console.log(values);
      await axiosInstance.post('/auth/sign-in', values);
      // TODO: Lưu token / user info nếu API trả về

      toast.success('Đăng nhập thành công!');
      // navigate(onSuccessRedirectTo);
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        'Đăng nhập thất bại. Vui lòng thử lại.';
      setServerError(message);
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

      {serverError && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
          {serverError}
        </div>
      )}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Đang đăng nhập...' : 'Tiếp tục'}
      </Button>
    </form>
  );
};
