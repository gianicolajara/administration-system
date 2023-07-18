import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const SubTitle = ({ children }: Props) => {
  return (
    <h2 className="text-lg lg:text-2xl lg:font-bold text-white">{children}</h2>
  );
};

export default SubTitle;
