import { ChangeEvent } from "react";

type Props = {
  label: string;
  value: string | number;
  name: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
};

const TextArea = ({ label, name, onChange, value, placeholder }: Props) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-white">
        {label}
      </label>
      <textarea
        name={name}
        cols={30}
        rows={10}
        onChange={onChange}
        value={value}
        className="w-full bg-neutral-950 rounded-lg p-2 text-white focus:ring-2 focus:ring-slate-200/50 focus:outline-none transition-all resize-none border-2 border-neutral-600 focus:border-neutral-200"
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextArea;
