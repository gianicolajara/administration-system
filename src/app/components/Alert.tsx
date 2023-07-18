import { ReactNode } from "react";

type Alerts = "error" | "successfully" | "danger";

const colors: { [type: string]: string } = {
  "error": "bg-red-500 border-2 border-red-300",
  "successfully": "bg-green-500 border-2 border-red-300",
  "danger": "bg-orange-500 border-2 border-orange-300",
};

type Props = {
  type?: Alerts;
  children: ReactNode;
};

const Alert = ({ children, type = "error" }: Props) => {
  return (
    <article
      className={`w-full ${colors[type]} text-white h-min p-2 rounded-lg`}
    >
      {children}
    </article>
  );
};

export default Alert;
