import { ReactNode } from "react";
import Loader from "./Loader";

type Props = {
  children: ReactNode;
  loading?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
};

const ButtonIcon = ({ children, loading, type = "button", onClick }: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className="p-1  bg-primary text-white font-bold rounded-full hover:bg-primary/75 transition-all min-w-max disabled:bg-gray-600 text-sm lg:text-base"
    >
      {loading ? <Loader /> : children}
    </button>
  );
};

export default ButtonIcon;
