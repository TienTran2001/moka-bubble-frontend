import { toast } from 'sonner';
import { Button } from '~/components/ui/Button';
import Logout from '~/features/auth/components/Logout';
import { axiosInstance } from '~/lib/axiosInstance';
import { useAuthStore } from '~/stores/useAuthStore';
import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Moka Moka' },
    { name: 'description', content: 'Welcome to Moka Bubble' },
  ];
}

export default function Home() {
  const user = useAuthStore((state) => state.user);

  const handleClickRefresh = async () => {
    try {
      await axiosInstance.get('/users/test', {
        withCredentials: true,
      });
      toast.success('OK');
    } catch (error) {
      console.error(error);
      toast.error('Error');
    }
  };

  return (
    <div className="flex gap-4 items-center justify-center mt-40">
      <h1 className="text-3xl font-bold underline">{user?.displayName}</h1>

      <Logout />
      <Button onClick={handleClickRefresh}>Refresh</Button>
    </div>
  );
}
