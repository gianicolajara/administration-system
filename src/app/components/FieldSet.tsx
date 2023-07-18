import { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

const FieldSet = ({ children, title }: Props) => {
  return (
    <fieldset className="flex gap-x-4 border-2 border-slate-800 p-5 mt-5 w-full">
      <legend className="bg-white py-1 px-2 rounded-lg text-slate-950 font-bold">
        {title}
      </legend>
      {children}
    </fieldset>
  );
};

export default FieldSet;
