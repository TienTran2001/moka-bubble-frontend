import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';

import { Button } from '~/components/ui/Button';
import { Input } from '~/components/ui/Input';
import {
  signUpPayloadSchema,
  signUpSchema,
  type SignUpInput,
} from '~/features/auth/schemas';
import { useAuthStore } from '~/stores/useAuthStore';

type SignUpFormProps = {
  onSuccessRedirectTo?: string;
};

export const SignUpForm: React.FC<SignUpFormProps> = ({
  onSuccessRedirectTo = '/auth/sign-in?username=',
}) => {
  const navigate = useNavigate();
  const signUp = useAuthStore((state) => state.signUp);
  const errorServer = useAuthStore((state) => state.errorServer);

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    mode: 'onSubmit',
  });

  const onSubmit = async (values: SignUpInput) => {
    const payload = signUpPayloadSchema.parse(values);
    const success = await signUp(payload);

    if (success) {
      navigate(onSuccessRedirectTo + values.username);
      toast.success('Sign up successful');
    }
  };

  useEffect(() => {
    setFocus('lastName');
  }, [setFocus]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="flex md:flex-row flex-col gap-2 md:gap-4">
        <Input
          type="text"
          label="Last Name"
          placeholder="Sakai"
          disabled={isSubmitting}
          errorMessage={errors.lastName?.message?.toString()}
          {...register('lastName')}
        />
        <Input
          type="text"
          label="First Name"
          placeholder="Moka"
          disabled={isSubmitting}
          errorMessage={errors.firstName?.message?.toString()}
          {...register('firstName')}
        />
      </div>

      <Input
        type="text"
        label="Username"
        placeholder="Moka"
        disabled={isSubmitting}
        errorMessage={errors.username?.message?.toString()}
        {...register('username')}
      />

      <Input
        type="text"
        label="Email"
        placeholder="moka@gmail.com"
        disabled={isSubmitting}
        errorMessage={errors.email?.message?.toString()}
        {...register('email')}
      />

      <div className="flex md:flex-row flex-col gap-2 md:gap-4">
        <Input
          type="password"
          label="Password"
          placeholder="********"
          disabled={isSubmitting}
          errorMessage={errors.password?.message?.toString()}
          {...register('password')}
        />
        <Input
          type="password"
          label="Confirm Password"
          placeholder="********"
          disabled={isSubmitting}
          errorMessage={errors.confirmPassword?.message?.toString()}
          {...register('confirmPassword')}
        />
      </div>

      {errorServer && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
          {errorServer}
        </div>
      )}

      <Link
        to="/auth/sign-in"
        className="text-sm text-telegram-text-secondary hover:underline my-4 flex justify-end"
      >
        Already have an account? Sign in now
      </Link>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Signing up...' : 'Continue'}
      </Button>
    </form>
  );
};
