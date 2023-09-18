import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function CheckUserAuthenticated() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return null; // or a loading indicator
  }

  if (status === 'authenticated') {
    router.push('/home');
    return null; // component will be unmounted anyway
  }

  if (status === 'unauthenticated') {
    router.push('/login');
    return null; // component will be unmounted anyway
  }

  return null;
}
