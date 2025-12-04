import type { AxiosError } from 'axios';
import { create } from 'zustand';
import type { SignInSchema } from '~/features/auth/schemas';
import { authService } from '~/services/authService';
import type { IUser } from '~/types/user';

interface AuthState {
  accessToken: string | null;
  user: IUser | null;
  loading: boolean;
  errorServer: string | null;

  signIn: (signInInput: SignInSchema) => Promise<boolean>;
  fetchMe: () => Promise<void>;
  clearStore: () => void;
  signOut: () => Promise<void>;
  refresh: () => Promise<void>;
  setAccessToken: (accessToken: string) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  user: null,
  loading: false,
  errorServer: null,

  setAccessToken: (accessToken: string) => {
    set({ accessToken });
  },

  signIn: async (signInInput: SignInSchema) => {
    try {
      set({ loading: true, errorServer: null });

      const response = await authService.signIn(signInInput);
      const accessToken = response.data.accessToken;

      get().setAccessToken(accessToken);
      await get().fetchMe();

      return true;
    } catch (error) {
      const errorMessage =
        (error as AxiosError<{ message: string }>).response?.data?.message ??
        null;
      set({ errorServer: errorMessage });
      return false;
    } finally {
      set({ loading: false });
    }
  },

  fetchMe: async () => {
    try {
      set({ loading: true });
      const user = await authService.fetchMe();
      set({ user });
    } catch (error) {
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },

  clearStore: () => {
    set({ accessToken: null, user: null });
  },

  signOut: async () => {
    try {
      await authService.signOut();
      get().clearStore();
    } catch (error) {
      console.error(error);
    }
  },

  refresh: async () => {
    try {
      set({ loading: true });
      const { user, fetchMe } = get();
      const accessToken = await authService.refreshToken();

      get().setAccessToken(accessToken);
      if (!user) fetchMe();
    } catch (error) {
      console.error(error);
      get().clearStore();
    } finally {
      set({ loading: false });
    }
  },
}));
