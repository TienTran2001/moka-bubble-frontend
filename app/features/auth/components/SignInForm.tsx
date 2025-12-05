import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { toast } from 'sonner';

import { Button } from '~/components/ui/Button';
import { Input } from '~/components/ui/Input';
import { signInSchema, type SignInInput } from '~/features/auth/schemas';
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

  const searchParams = useSearchParams();
  const username = searchParams[0].get('username');

  console.log({
    username: username,
    searchParams: searchParams,
  });

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    mode: 'onSubmit',
  });

  const onSubmit = async (values: SignInInput) => {
    const success = await signIn(values);

    if (success) {
      navigate(onSuccessRedirectTo);
      toast.success('Sign in successful');
    }
  };

  useEffect(() => {
    if (username) setFocus('password');
    else setFocus('username');
  }, [setFocus, username]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Input
        type="text"
        label="Username"
        defaultValue={username ?? ''}
        placeholder="Enter your username..."
        disabled={isSubmitting}
        errorMessage={errors.username?.message?.toString()}
        {...register('username')}
      />

      <Input
        type="password"
        label="Password"
        placeholder="Enter your password..."
        disabled={isSubmitting}
        errorMessage={errors.password?.message?.toString()}
        {...register('password')}
      />

      {errorServer && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
          {errorServer}
        </div>
      )}
      <Link
        to="/auth/sign-up"
        className="text-sm text-telegram-text-secondary hover:underline my-4 flex justify-end"
      >
        Sign up for an account
      </Link>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Signing in...' : 'Continue'}
      </Button>
    </form>
  );
};
