/* eslint-disable no-unused-vars */

import { Mongoose } from "mongoose";
import { DefaultUser } from "next-auth";

declare global {
  var mongoose: {
    promise: Promise<Mongoose> | null;
    conn: Mongoose | null;
  };
}
declare module "next-auth" {
  interface Session {
    user?: DefaultUser & {
      id: string;
      username: string;
    };
  }
  interface User extends DefaultUser {
    username: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends JWT {
    user?: DefaultUser & {
      id: string;
      username: string;
    };
  }
}
