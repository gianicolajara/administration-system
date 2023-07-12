"use client";

import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import Button from "./Button";

const CloseSession = () => {
  const [loading, setLoading] = useState(false);
  const { data } = useSession();

  console.log({ data });

  const handleLogOut = async () => {
    setLoading(true);

    await signOut({
      redirect: true,
      callbackUrl: "/login",
    });

    setLoading(false);
  };

  return (
    <div className="flex gap-x-2 min-w-max">
      <p className="text-white">
        Bienvenido, <strong>{data?.user?.username}</strong>
      </p>
      <Button loading={loading} onClick={handleLogOut}>
        Cerrar Sesion
      </Button>
    </div>
  );
};

export default CloseSession;
