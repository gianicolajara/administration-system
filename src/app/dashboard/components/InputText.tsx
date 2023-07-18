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
      <label htmlFor={name} className="text-white">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className="w-full bg-neutral-900 rounded-lg p-2 text-white focus:ring-2 focus:ring-slate-200/50 focus:outline-none transition-all border-2 border-neutral-600 focus:border-neutral-200"
        step={type === "number" ? "0.01" : ""}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputText;
