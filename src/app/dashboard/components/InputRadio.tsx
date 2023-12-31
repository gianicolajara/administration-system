import { ChangeEvent } from "react";

type Props = {
  name: string;
  value: string | number;
  label: string;
  checked: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  defaultCheck?: boolean;
};

const InputRadio = ({ label, name, value, checked, onChange }: Props) => {
  return (
    <label className="text-white">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="appearance-none w-5 h-5 rounded-full border-4 border-neutral-400 transition-all relative checked:border-8 checked:border-neutral-400 select-none top-1 right-1"
      />
      {label}
    </label>
  );
};

export default InputRadio;
