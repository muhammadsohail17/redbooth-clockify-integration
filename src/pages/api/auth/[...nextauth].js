import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { endPoints } from "@/rest_api/endpoints";

const { REST_API, HOST_URL } = endPoints;

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        rbUserId: { label: "RB USER ID", type: "number" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Add your authentication logic here
        const res = await fetch(`${HOST_URL}${REST_API.Account.LogIn}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            rbUserId: credentials?.rbUserId,
            email: credentials?.email,
            password: credentials?.password,
          }),
        });
        const responseJson = await res.json();

        console.log("nextAuthuser", responseJson);

        if (res.ok) {
          const user = responseJson;
          user.rbUserId = credentials.rbUserId;
          return user; // Return the user object on successful authentication
        } else {
          // Authentication failed
          throw new Error(responseJson.error); // Throw an error with the specific error message
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: user.token,
          refreshToken: user.refreshToken,
          rbUserId: user.rbUserId,
        };
      }

      return token;
    },

    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
          accessTokenExpires: token.accessTokenExpires,
          rbUserId: token.rbUserId,
        },
      };
    },
  },
  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authOptions);
