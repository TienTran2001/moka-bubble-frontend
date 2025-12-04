import { useNavigate } from 'react-router';
import { Button } from '~/components/ui/Button';
import { useAuthStore } from '~/stores/useAuthStore';

const Logout = () => {
  const navigate = useNavigate();
  const signOut = useAuthStore((state) => state.signOut);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/auth/sign-in');
    } catch (error) {
      console.error(error);
    }
  };
  return <Button onClick={handleSignOut}>Logout</Button>;
};

export default Logout;
