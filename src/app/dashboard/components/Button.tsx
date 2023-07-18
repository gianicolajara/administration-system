import { ReactNode } from "react";
import Loader from "./Loader";

type Props = {
  children: ReactNode;
  loading?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
};

const Button = ({ children, loading, type = "button", onClick }: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className="px-1 py-1 lg:px-2 lg:py-1 bg-primary text-white font-bold rounded-full hover:bg-primary/75 transition-all min-w-max disabled:bg-gray-600 text-sm lg:text-base"
    >
      {loading ? <Loader /> : children}
    </button>
  );
};

export default Button;
