import { menuItems } from "../config/menu";
import ListMenuItems from "./ListMenuItems";

const LeftNavbar = () => {
  return (
    <nav className="w-full h-full border-r-2 border-slate-800 flex flex-col">
      <div
        className={`w-full h-[50px] border-b-2 border-slate-800 flex justify-center items-center flex-col`}
      >
        <h2 className="hidden lg:inline lg:text-2xl lg:font-bold text-white">
          Dashboard
        </h2>
      </div>
      <ListMenuItems listItems={menuItems} />
    </nav>
  );
};

export default LeftNavbar;
