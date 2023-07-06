import InputRadio from "@/app/dashboard/components/InputRadio";
import { ChangeEvent } from "react";
import {
  BillsType,
  FormDataCreateBill,
} from "../../../../../../types/types/dashboard";

type Props = {
  typesOfBills: Array<BillsType>;
  FormData: FormDataCreateBill;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const ListBillType = ({ typesOfBills, FormData, onChange }: Props) => {
  return (
    <>
      {typesOfBills.map((item) => (
        <InputRadio
          key={item.id.toString()}
          label={item.name}
          name="billType"
          checked={FormData.billType === item.id.toString()}
          value={item.id.toString()}
          onChange={onChange}
        />
      ))}
    </>
  );
};

export default ListBillType;
