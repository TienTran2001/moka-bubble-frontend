import type { SignInSchema } from '~/features/auth/schemas';
import { axiosInstance } from '~/lib/axiosInstance';
import type { IUser } from '~/types/user';

interface SignInResponse {
  data: {
    accessToken: string;
  };
}

interface FetchMeResponse {
  data: {
    me: IUser;
  };
}

export const authService = {
  signIn: async (signInInput: SignInSchema): Promise<SignInResponse> => {
    const response = await axiosInstance.post('/auth/sign-in', signInInput);

    return response.data;
  },

  fetchMe: async (): Promise<IUser> => {
    const response = await axiosInstance.get<FetchMeResponse>('/users/me', {
      withCredentials: true,
    });

    return response.data.data.me;
  },

  signOut: async (): Promise<void> => {
    await axiosInstance.post('/auth/sign-out');
  },

  refreshToken: async (): Promise<string> => {
    const response = await axiosInstance.post('/auth/refresh');
    return response.data.data.accessToken;
  },
};
