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
      className="px-2 py-1 bg-purple-600 text-white font-bold rounded-full hover:bg-purple-500 active:bg-purple-950 transition-all min-w-max"
    >
      {loading ? <Loader /> : children}
    </button>
  );
};

export default Button;
