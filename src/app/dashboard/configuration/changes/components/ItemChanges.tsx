import Button from "@/app/dashboard/components/Button";
import { IChanges, IChangesResponse } from "@/types/interfaces/changes";
import { Dispatch, SetStateAction } from "react";

type Props = {
  changes: IChangesResponse;
  setFormData: Dispatch<SetStateAction<IChanges>>;
  setSaveData: Dispatch<SetStateAction<IChangesResponse | undefined>>;
  handleOpen: () => void;
};

const ItemChanges = ({
  changes,
  setFormData,
  setSaveData,
  handleOpen,
}: Props) => {
  const handleSetFormData = (change: IChangesResponse) => {
    setFormData({
      id: change.id as string,
      from: change.from.id as string,
      to: change.to.id as string,
      amount: change.amount,
      delete: change.delete,
    });
  };

  const handleOpenModalChangesDelte = (item: IChangesResponse) => {
    handleOpen();
    setSaveData(item);
  };

  return (
    <>
      <td className="border-2 border-neutral-700 p-2">{changes.from.name}</td>
      <td className="border-2 border-neutral-700 p-2">{changes.to.name}</td>
      <td className="border-2 border-neutral-700 p-2">{changes.amount}</td>
      <td className="border-2 border-neutral-700 p-2">
        <div className="flex gap-x-2">
          <Button onClick={() => handleSetFormData(changes)}>Editar</Button>
          <Button onClick={() => handleOpenModalChangesDelte(changes)}>
            Borrar
          </Button>
        </div>
      </td>
    </>
  );
};

export default ItemChanges;
