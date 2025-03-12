import axios from "axios";
import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user: {
      title: string;
      firstname: string;
      username: string;
      lastname: string;
      jwt: string;
      role: string;
    } & DefaultSession["user"];
  }
  interface User {
    title: string;
    firstname: string;
    username: string;
    lastname: string;
    jwt: string;
    role: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials) return null;

        try {
          const payload = {
            identifier: credentials.email,
            password: credentials.password,
          };

          const res = await axios.post(
            `${process.env.BACKEND}/api/auth/local`,
            payload,
            { headers: { "Content-Type": "application/json" } },
          );

          if (!res.data || !res.data.user) {
            console.error("Login failed: Invalid response", res.data);
            return null;
          }

          return {
            id: res.data.user.id,
            email: res.data.user.email,
            title: res.data.user.title,
            username: res.data.user.username,
            firstname: res.data.user.firstname,
            lastname: res.data.user.lastname,
            jwt: res.data.jwt,
            role: res.data.user.role, // FIXED: Getting role from user object
          };
        } catch (error) {
          console.error("Login error:", error.response?.data || error.message);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        return { ...token, ...user };
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = { ...token } as any;
      return session;
    },
  },
});
