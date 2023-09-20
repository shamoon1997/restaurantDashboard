import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function CheckUserAuthenticated() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return null;
  }

  if (status === 'authenticated') {
    router.push('/home');
    return null;
  }

  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }

  return null;
}
