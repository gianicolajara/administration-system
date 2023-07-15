/* eslint-disable no-unused-vars */
import { FormEvent, ReactNode } from "react";

type Props = {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
};

const Form = ({ onSubmit, children }: Props) => {
  return (
    <form
      className="border-2 border-slate-800 p-5 rounded-lg max-h-min"
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
};

export default Form;
