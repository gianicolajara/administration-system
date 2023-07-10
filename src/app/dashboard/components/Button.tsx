import { ReactNode } from "react";
import Loader from "./Loader";

type Props = {
  children: ReactNode;
  loading?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
};

const Button = ({ children, loading, type = "button" }: Props) => {
  return (
    <button
      type={type}
      className="px-8 py-3 bg-purple-600 text-white font-bold rounded-full hover:bg-purple-500 active:bg-purple-950 transition-all mt-4"
    >
      {loading ? <Loader /> : children}
    </button>
  );
};

export default Button;
