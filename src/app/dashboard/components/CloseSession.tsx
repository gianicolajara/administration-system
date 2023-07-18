"use client";

import P from "@/app/components/P";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "./Button";

const CloseSession = () => {
  const [loading, setLoading] = useState(false);
  const { data } = useSession();
  const route = useRouter();

  const handleLogOut = async () => {
    setLoading(true);

    await signOut({
      redirect: false,
      callbackUrl: "/login",
    });

    setLoading(false);

    route.replace("/login");
  };

  return (
    <div className="flex gap-x-2 w-full min-w-max items-center justify-between">
      <div></div>
      <div className="flex gap-x-2">
        <P>
          Bienvenido, <strong>{data?.user?.username}</strong>
        </P>
        <Button loading={loading} onClick={handleLogOut}>
          Cerrar Sesion
        </Button>
      </div>
    </div>
  );
};

export default CloseSession;
