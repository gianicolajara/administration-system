import { ReactNode } from "react";
import ListMenuItems from "./components/ListMenuItems";
import Navbar from "./components/Navbar";
import { menuItems } from "./config/menu";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="w-screen h-screen bg-slate-950">
      <div className="grid grid-cols-[200px_,1fr] grid-rows-1 w-full h-full">
        <nav className="w-full h-full border-r-2 border-slate-800 flex flex-col">
          <div className="w-full h-[75px] border-b-2 border-slate-800 flex justify-center items-center flex-col">
            <h1 className="text-white font-bold text-2xl">Dashboard</h1>
            <small className="text-slate-500">Beta</small>
          </div>
          <ListMenuItems listItems={menuItems} />
        </nav>
        <div className="w-full h-full flex flex-col">
          <div className="w-full h-[75px] border-b-2 border-slate-800 flex-grow-0 flex-shrink-0 p-4">
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
