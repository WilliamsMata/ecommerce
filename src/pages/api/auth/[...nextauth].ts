import NextAuth, { NextAuthOptions, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

import { checkUserEmailPassword, oAuthToDbUser } from "@/server/users";
import { SessionUser } from "@/interfaces";

interface MySession extends Session {
  accessToken: string;
  user: SessionUser;
}

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    Credentials({
      name: "Custom Login",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "your-email@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "••••••••",
        },
      },
      async authorize(credentials) {
        return await checkUserEmailPassword(
          credentials!.email,
          credentials!.password
        );
      },
    }),
    // ...add more providers here
  ],

  // Custom pages
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },

  session: {
    maxAge: 2592000, //30d
    strategy: "jwt",
    updateAge: 86400, // each day
  },

  // Callbacks
  callbacks: {
    // This callback is executed when a JWT token is created for the user session. It is used to customize the content of the JWT token and add additional information.
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;

        switch (account.type) {
          case "credentials":
            token.user = user;
            break;

          case "oauth":
            token.user = await oAuthToDbUser(user.email || "", user.name || "");
            break;
        }
      }

      return token;
    },

    //This callback is executed after a user successfully logs in. It is used to customize the data that is stored in the user session. For example, additional information about the user can be added to the session for later use in the application.
    async session({ session, token, user }) {
      const mySession: MySession = session as MySession;

      mySession.accessToken = token.accessToken as string;
      mySession.user = token.user as SessionUser;

      return session;
    },
  },
};

export default NextAuth(authOptions);
