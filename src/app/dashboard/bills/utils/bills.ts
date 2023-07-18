import { BillsEnum } from "@/types/enums/dashboard";
import { IBill } from "@/types/interfaces/bill";
import { IMoney } from "@/types/interfaces/money";
import { BillsType } from "@/types/types/dashboard";
import { ItemSelect } from "@/types/types/select";

export const typesOfBills: Array<BillsType> = [
  {
    id: 1,
    name: BillsEnum[1],
  },
  {
    id: 2,
    name: BillsEnum[2],
  },
  {
    id: 3,
    name: BillsEnum[3],
  },
  {
    id: 4,
    name: BillsEnum[4],
  },
  {
    id: 5,
    name: BillsEnum[5],
  },
  {
    id: 6,
    name: BillsEnum[6],
  },
];

export const initialStateForm: IBill = {
  billType: 1,
  assets: 1,
  billNumber: "",
  amountMoney: 0.0,
  typeOfCurrency: "",
  report: "",
  user: "",
};

export const createSelectItems = (data: Array<IMoney>): Array<ItemSelect> => {
  return data?.map((item) => ({
    id: item.id as string,
    label: item.name,
    value: item.id as string,
  }));
};
