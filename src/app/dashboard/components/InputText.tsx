import { ChangeEvent, HTMLInputTypeAttribute } from "react";

type Props = {
  label: string;
  value: string | number;
  name: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
};

const InputText = ({
  label,
  onChange,
  value,
  name,
  type = "text",
  placeholder,
}: Props) => {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className="w-full h-[50px] bg-slate-800 p-2 text-white"
        step={type === "number" ? "0.01" : ""}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputText;
