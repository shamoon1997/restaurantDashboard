import { signIn } from 'next-auth/react';
import Layout from '../components/Layout/Layout';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const LoginPage = () => {
  const router = useRouter();
  const session = useSession();
  console.log('session', session);

  if (session.status === 'loading') {
    return <p>Loading...</p>;
  }
  if (session.status === 'authenticated') {
    router.push('/home');
    return null;
  }

  const handleLogin = async () => {
    const response = await signIn('google');
    console.log('response: ', response);
    if (response?.error) {
      console.error('Google login failed:', response.error);
    }
  };

  return (
    <Layout>
      <div className="d-flex justify-content-center align-items-center flex-column vh-100">
        <h2 className="mb-4">Welcome to Dashboard</h2>
        <button className="btn btn-success btn-block" onClick={handleLogin}>
          <Image
            src="/googleLogo.png" // Adjust the path to your Google logo image
            alt="Google Logo"
            width={20} // Adjust the width as needed
            height={20} // Adjust the height as needed
            className="mr-2" // Add some margin to the right for spacing
          />{' '}
          Authenticate with Google
        </button>
      </div>
    </Layout>
  );
};

export default LoginPage;
