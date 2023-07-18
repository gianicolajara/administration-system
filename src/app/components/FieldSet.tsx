import { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
  className?: string;
};

const FieldSet = ({ children, title, className }: Props) => {
  return (
    <fieldset
      className={`flex gap-x-4 border-2 border-neutral-700 p-4 w-full rounded-lg mt-2 ${className}`}
    >
      <legend className="bg-neutral-800 border-2 border-neutral-700 p-1 rounded-lg text-white text-sm">
        {title}
      </legend>
      {children}
    </fieldset>
  );
};

export default FieldSet;
