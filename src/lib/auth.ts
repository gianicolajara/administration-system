import User from "@/models/user";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConfig from "./dbConntect";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const db = dbConfig();

        db.connectDB();

        const user = await User.findOne({
          username: credentials?.username,
        });

        if (!user) throw new Error("Contraseña o Nombre incorrecto");

        if (!user.active) throw new Error("Usuario no valido para logear");

        const comparePassword = user.comparePassword(
          credentials?.password || "",
          user.password as string
        );

        if (!comparePassword)
          throw new Error("Usuario o Contraseña incorrectos");

        return {
          id: user.id as string,
          username: user.username,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = {
          id: user.id,
          username: user.username,
        };
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user = token.user;
      }

      return session;
    },
  },
};
