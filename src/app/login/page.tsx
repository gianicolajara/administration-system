"use client";

import { useState } from "react";

let time: ReturnType<typeof setTimeout> = setTimeout(() => {});

const Login = () => {
  const [activeForm, setActiveForm] = useState(false);
  const [keyPressed, setKeyPressed] = useState(false);

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

  return (
    <section className="w-screen h-screen bg-slate-950 grid place-items-center">
      <form
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
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            onKeyDown={handleKeyPressed}
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
            className="w-full p-4 bg-slate-700 rounded-full text-white text-lg"
          />
        </div>
        <button className="px-8 py-3 bg-purple-600 text-white font-bold rounded-full hover:bg-purple-500 active:bg-purple-950 transition-all">
          Login
        </button>
      </form>
    </section>
  );
};

export default Login;
