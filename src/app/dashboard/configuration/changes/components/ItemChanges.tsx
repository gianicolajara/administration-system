import Button from "@/app/dashboard/components/Button";
import { useDeleteChangeMutation } from "@/redux/services/changesApi";
import { IChanges, IChangesResponse } from "@/types/interfaces/changes";
import { Dispatch, SetStateAction } from "react";

type Props = {
  changes: IChangesResponse;
  setFormData: Dispatch<SetStateAction<IChanges>>;
};

const ItemChanges = ({ changes, setFormData }: Props) => {
  const [deleteChange, { isLoading }] = useDeleteChangeMutation();

  const handleSetFormData = (change: IChangesResponse) => {
    setFormData({
      id: change.id as string,
      from: change.from.id as string,
      to: change.to.id as string,
      amount: change.amount,
    });
  };

  return (
    <>
      <td className="border-2 border-slate-800 p-2">{changes.from.name}</td>
      <td className="border-2 border-slate-800 p-2">{changes.to.name}</td>
      <td className="border-2 border-slate-800 p-2">{changes.amount}</td>
      <td className="border-2 border-slate-800 p-2">
        <div className="flex gap-x-2">
          <Button onClick={() => handleSetFormData(changes)}>Editar</Button>
          <Button
            onClick={() => deleteChange(changes.id ?? "")}
            loading={isLoading}
          >
            Borrar
          </Button>
        </div>
      </td>
    </>
  );
};

export default ItemChanges;
