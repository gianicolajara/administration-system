import { ReactNode } from "react";
import Loader from "./Loader";

type Props = {
  children: ReactNode;
  loading?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  toolTip?: string;
};

const Button = ({
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
      className="group px-1 py-1 lg:px-2 lg:py-1 bg-primary text-white font-bold rounded-full hover:bg-primary/75 transition-all min-w-max disabled:bg-gray-600 text-sm lg:text-base relative"
    >
      {loading ? <Loader /> : children}
      {toolTip && (
        <span className="group-hover:opacity-100 transition-opacity duration-500 bg-neutral-900 border-2 border-neutral-700 text-xl text-white rounded-lg absolute left-1/2 -translate-x-1/2 translate-y-full z-[99] min-w-max p-1 opacity-0">
          {toolTip}
        </span>
      )}
    </button>
  );
};

export default Button;
