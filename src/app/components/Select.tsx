import { ChangeEvent } from "react";
import { ItemSelect } from "../../../types/types/select";
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
};

const Select = ({
  items,
  onChange,
  isLoading,
  name,
  value,
  label,
  placeholder,
}: Props) => {
  if (isLoading) return <Loader />;

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <select
        className="w-full h-[50px] bg-slate-800 px-2"
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
    </div>
  );
};

export default Select;
