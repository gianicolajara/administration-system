import { ItemSelect } from "@/types/types/select";
import { ChangeEvent } from "react";
import Loader from "../dashboard/components/Loader";

type Props = {
  items: Array<ItemSelect>;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  isLoading: boolean;
  name: string;
  value: string;
  label: string;
  placeholder: string;
  description?: string;
};

const Select = ({
  items,
  onChange,
  isLoading,
  name,
  value,
  label,
  placeholder,
  description,
}: Props) => {
  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-col w-full">
      <label htmlFor={name} className="text-white mb-1">
        {label}
      </label>
      <select
        className="w-full bg-neutral-950 rounded-lg p-2 text-white focus:ring-2 focus:ring-slate-200/50 focus:outline-none transition-all border-2 border-neutral-600 focus:border-neutral-200"
        onChange={onChange}
        name={name}
        value={value}
        id={name}
      >
        <option value="">{placeholder}</option>
        {items.map((item) => (
          <option key={item.id} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      {description && (
        <small className=" text-neutral-500 mt-1">{description}</small>
      )}
    </div>
  );
};

export default Select;
