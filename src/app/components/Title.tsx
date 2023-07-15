import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Title = ({ children }: Props) => {
  return <h1 className="text-4xl font-bold mb-5">{children}</h1>;
};

export default Title;
