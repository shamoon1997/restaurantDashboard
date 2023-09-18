import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import User from '../../../models/User';
import connectDB from '../../../lib/db';
import { createUser } from '../../../services/userService/index'; // Your user service to handle database operations

const fetchData = async (apiUrl) => {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    console.log('Data from API:', result);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const secret = process.env.NEXTAUTH_SECRET;

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn(user, account, profile) {
      connectDB();
      console.log('user ', user);
      // console.log('account ', account);
      // console.log('profile ', profile);
      // Create or update the user in your database based on the profile information
      if (user.user.email) {
        console.log('user.user.email: ', user.user.email);
        console.log('user.user.name', user.user.name);
        const userData = await User.findOne({ email: user.user.email });
        if (!userData) {
          await User.create({ email: user.user.email, name: user.user.name });
        }
        console.log('userData: ', userData);
      }

      return true; // Return true to continue the sign-in process
    },
  },
  secret,
};
export default NextAuth(authOptions);
