import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import User from '../../../models/User';
import connectDB from '../../../lib/db';

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

      if (user.user.email) {
        const userData = await User.findOne({ email: user.user.email });
        if (!userData) {
          await User.create({ email: user.user.email, name: user.user.name });
        }
      }

      return true;
    },
  },
  secret,
};
export default NextAuth(authOptions);
