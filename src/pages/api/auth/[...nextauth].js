import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// const uri = process.env.MONGODB_URI;

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Add your authentication logic here
        const res = await fetch("http://localhost:3001/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });
        const user = await res.json();

        console.log("nextAuthuser", user);

        if (user) {
          return user; // Return the user object on successful authentication
        } else {
          return null; // Return null on failed authentication
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      session.user = token;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authOptions);
