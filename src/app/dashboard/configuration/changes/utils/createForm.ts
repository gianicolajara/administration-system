import { IChanges } from "../../../../../../types/interfaces/changes";
import { IMoney } from "../../../../../../types/interfaces/money";
import { ItemSelect } from "../../../../../../types/types/select";

export const generateSelectOptions = (
  items: Array<IMoney>
): Array<ItemSelect> => {
  if (!items || items.length === 0) return [];

  return items?.map((item) => ({
    id: item.id as string,
    label: item.name as string,
    value: item.id as string,
  }));
};

export const initialState: IChanges = {
  from: "",
  to: "",
  amount: 0,
};
