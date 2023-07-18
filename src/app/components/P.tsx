import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

const P = ({ children, className }: Props) => {
  return (
    <p className={`text-white text-sm lg:text-lg ${className}`}>{children}</p>
  );
};

export default P;
