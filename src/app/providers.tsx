"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

function NextAuthProvider(props: Props) {
  return <SessionProvider>{props.children}</SessionProvider>;
}

export default NextAuthProvider;
