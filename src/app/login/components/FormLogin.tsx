import Button from "@/app/dashboard/components/Button";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";

let time: ReturnType<typeof setTimeout> = setTimeout(() => {});

const FormLogin = () => {
  const [activeForm, setActiveForm] = useState(false);
  const [keyPressed, setKeyPressed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formDataLogin, setFormDataLogin] = useState<{
    username: string;
    password: string;
  }>({
    username: "",
    password: "",
  });

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormDataLogin({
      ...formDataLogin,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnFocus = () => {
    setActiveForm(true);
  };

  const handleOnBlur = () => {
    setActiveForm(false);
  };

  const handleKeyPressed = () => {
    if (time) {
      clearTimeout(time);
      setKeyPressed(false);
    }

    setKeyPressed(true);
    time = setTimeout(() => {
      setKeyPressed(false);
    }, 50);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        callbackUrl: "/dashboard",
        username: formDataLogin.username,
        password: formDataLogin.password,
      });

      setLoading(false);

      if (res?.ok && res.error === null && res.url) {
        redirect("/dashboard");
      }

      if (res?.error) {
        toast(res?.error || "Something was wrong", {
          type: "error",
          theme: "dark",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full max-w-sm h-full max-h-96 bg-slate-900 rounded-lg drop-shadow-xl p-8 flex flex-col justify-between  transition-all ${
        activeForm ? "shadow-purple-950/80" : ""
      } ${keyPressed ? "shadow-2xl shadow-purple-800" : "shadow-lg"}`}
    >
      <h1 className="text-white font-bold text-3xl text-left">Login</h1>
      <div className="flex flex-col gap-2">
        <label htmlFor="username" className="text-slate-400">
          Username:
        </label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Insert username"
          onChange={handleOnChange}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          onKeyDown={handleKeyPressed}
          value={formDataLogin.username}
          className="w-full p-4 bg-slate-700 rounded-full text-white text-lg"
        />
        <label htmlFor="password" className="text-slate-400">
          Password:
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Insert password"
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          onKeyDown={handleKeyPressed}
          onChange={handleOnChange}
          value={formDataLogin.password}
          className="w-full p-4 bg-slate-700 rounded-full text-white text-lg"
        />
      </div>
      <Button type="submit" loading={loading}>
        Login
      </Button>
    </form>
  );
};

export default FormLogin;
