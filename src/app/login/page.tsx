"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Loader from "../dashboard/components/Loader";
import FormLogin from "./components/FormLogin";

const Login = () => {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <div className="w-screen h-screen bg-neutral-950">
        <Loader />
      </div>
    );
  }

  if (status === "authenticated") {
    redirect("/dashboard");
  }
  return (
    <section className="w-screen h-screen bg-neutral-950 grid place-items-center p-2">
      <FormLogin />
    </section>
  );
};

export default Login;
