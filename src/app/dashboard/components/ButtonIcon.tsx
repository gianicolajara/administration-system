import { ReactNode } from "react";
import Loader from "./Loader";

type Props = {
  children: ReactNode;
  loading?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  toolTip?: string;
};

const ButtonIcon = ({
  children,
  loading,
  type = "button",
  onClick,
  toolTip,
}: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className="group p-1  bg-primary text-white font-bold rounded-full hover:bg-primary/75 transition-all min-w-max disabled:bg-gray-600 text-sm lg:text-base relative"
    >
      {loading ? <Loader /> : children}
      {toolTip && toolTip?.length > 0 && (
        <span className="group-hover:opacity-100 transition-opacity duration-500 bg-neutral-900 border-2 border-neutral-700 text-xs text-white rounded-lg absolute left-1/2 -translate-x-1/2 -translate-y-[200%]  z-[99] min-w-max p-1 opacity-0">
          {toolTip}
        </span>
      )}
    </button>
  );
};

export default ButtonIcon;
