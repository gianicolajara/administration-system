import InputRadio from "@/app/dashboard/components/InputRadio";
import { IBill } from "@/types/interfaces/bill";
import { BillsType } from "@/types/types/dashboard";
import { ChangeEvent } from "react";

type Props = {
  typesOfBills: Array<BillsType>;
  FormData: IBill;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const ListBillType = ({ typesOfBills, FormData, onChange }: Props) => {
  return (
    <div className="w-full flex flex-wrap gap-x-4">
      {typesOfBills.map((item) => (
        <InputRadio
          key={item.id.toString()}
          label={item.name}
          name="billType"
          checked={FormData.billType.toString() === item.id.toString()}
          value={item.id.toString()}
          onChange={onChange}
        />
      ))}
    </div>
  );
};

export default ListBillType;
