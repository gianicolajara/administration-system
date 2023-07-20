import Button from "@/app/dashboard/components/Button";
import { IMoney } from "@/types/interfaces/money";
import { Dispatch, SetStateAction } from "react";

type Props = {
  currency: IMoney;
  // eslint-disable-next-line no-unused-vars
  handleSetFormCurrency: (currency: IMoney) => void;
  setSaveData: Dispatch<SetStateAction<IMoney | undefined>>;
  handleOpen: () => void;
};

const ItemCurrency = ({
  currency,
  handleSetFormCurrency,
  setSaveData,
  handleOpen,
}: Props) => {
  const handleDelete = (item: IMoney) => {
    setSaveData(item);
    handleOpen();
  };

  return (
    <>
      <td className="border-2 border-neutral-700 p-4">{currency.name}</td>
      <td className="border-2 border-neutral-700 px-2">
        <div className="flex gap-x-1">
          <Button onClick={() => handleSetFormCurrency(currency)}>
            Editar
          </Button>
          <Button onClick={() => handleDelete(currency)}>Borrar</Button>
        </div>
      </td>
    </>
  );
};

export default ItemCurrency;
