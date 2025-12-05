import { z } from 'zod';

export const signInSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be at most 30 characters')
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers, and underscores'
    ),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password must be at most 100 characters'),
});

export const signUpSchema = z
  .object({
    username: z
      .string()
      .min(3, 'Username must be at least 3 characters')
      .max(30, 'Username must be at most 30 characters')
      .regex(
        /^[a-zA-Z0-9_]+$/,
        'Username can only contain letters, numbers, and underscores'
      ),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .max(100, 'Password must be at most 100 characters'),
    confirmPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .max(100, 'Password must be at most 100 characters'),
    firstName: z
      .string()
      .min(1, 'First name is required')
      .max(50, 'First name must be at most 50 characters')
      .trim(),
    lastName: z
      .string()
      .min(1, 'Last name is required')
      .max(50, 'Last name must be at most 50 characters')
      .trim(),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Invalid email format')
      .trim(),
    phone: z
      .string()
      .regex(/^[0-9+\-\s()]+$/, 'Invalid phone number format')
      .optional()
      .or(z.literal('')),
    bio: z
      .string()
      .max(500, 'Bio must be at most 500 characters')
      .optional()
      .or(z.literal('')),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const signUpPayloadSchema = signUpSchema.omit({ confirmPassword: true });

export type SignInInput = z.infer<typeof signInSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignUpPayloadInput = z.infer<typeof signUpPayloadSchema>;
