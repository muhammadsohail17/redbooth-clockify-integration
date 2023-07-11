import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { registerUser } from "../../../data/dataModel";
import connectDB from "../../../data/db";
import bcrypt from "bcrypt";

// const uri = process.env.MONGODB_URI;

export const authOptions = {
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
          await connectDB()

          const user = await registerUser.findOne({ email });

          if (user) {
            // User found, compare the provided password with the stored hashed password
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (isPasswordValid) {
              // Passwords match, user is authenticated

              if (user.isVerified == true) {
                console.log('User authenticated!');
                console.log(user);
                return {
                  id: user._id.$oid,
                  email: user.email
                };
              } else {
                console.log("You haven't verified your account yet!")
                return null;
              }

            } else {
              // Passwords do not match
              console.log('password incorrect!');
              return null;
            }
          } else {
            // User not found
            console.log("user not found!")
            return null;
          }

          // if (user && password === user.password) {
          //   // If the user is found and the password matches, return the user object
          //   console.log('User authenticated!');
          //   return user;
          // } else {
          //   // If the user is not found or the password is incorrect, return null
          //   console.log('User failed!');
          //   return null;
          // }
        } catch (error) {
          // Handle error connecting to MongoDB or during authentication
          console.error('Error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {

      const dbUser = await registerUser.findOne({ email: token.email });
      // Send properties to the client, like an access_token and user id from a provider.
      session.user.id = dbUser._id.$oid;
      return session
    }
  },
  pages: {
    signIn: '/signin'
  }
}

export default NextAuth(authOptions);

// export async function connectToDatabase() {
//   const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//   try {
//     // Connect to the MongoDB database
//     await client.connect();
//     console.log('Connected to MongoDB');
//     return client;
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//     throw error;
//   }
// }