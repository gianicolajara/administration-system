/* eslint-disable no-unused-vars */
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { dbConfig } from "../../../../../lib/dbConntect";
import User from "../../../../../models/user";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const db = dbConfig();

        const user = await User.findOne({
          username: credentials?.password,
        });

        if (user)
          return {
            id: user.id,
          };
        else return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.JWT_SECRET,
});

export { handler as GET, handler as POST };
