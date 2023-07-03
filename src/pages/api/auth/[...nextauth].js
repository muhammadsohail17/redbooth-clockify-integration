import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import mongoose from 'mongoose';
import connectDB from '@/data/db';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Add your authentication logic here
        const { email, password } = credentials;

        try {
          await connectDB();
          // Define your user schema and model using Mongoose
          const User = mongoose.models.users || mongoose.model('users', {
            rbUserId: Number,
            name: String,
            username: String,
            email: String,
            password: String,
            status: Boolean
          });

          // Query the user collection for the provided email
          const user = await User.findOne({ email });
          console.log(user);

          if (user && password === user.password) {
            // If the user is found and the password matches, return the user object
            console.log('User authenticated!');
            return user;
          } else {
            // If the user is not found or the password is incorrect, return null
            console.log('User failed!');
            return null;
          }
        } catch (error) {
          // Handle error connecting to MongoDB or during authentication
          console.error('Error:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    // Set the session expiration time to 1 hour (3600 seconds)
    maxAge: 604800,
  },
});

