"use client";

import { ReactNode } from "react";
import LeftNavbar from "./components/LeftNavbar";
import Navbar from "./components/Navbar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="w-screen h-screen bg-slate-950">
      <div
        className={`grid grid-cols-[50px_,1fr] lg:grid-cols-[200px_,1fr] grid-rows-1 w-full h-full`}
      >
        <LeftNavbar />
        <div className="w-full h-full flex flex-col">
          <div className="w-full h-[50px] border-b-2 border-slate-800 flex-grow-0 flex-shrink-0 p-2 flex items-center">
            <Navbar />
          </div>
          <div className="w-full h-full text-white p-5 overflow-y-scroll overflow-x-hidden">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Layout;
