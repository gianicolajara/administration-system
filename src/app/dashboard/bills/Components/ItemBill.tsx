import Button from "@/app/dashboard/components/Button";
import { formatDateYYYYmmdd } from "@/lib/formatDate";
import { AssetsEnum, BillsEnum } from "@/types/enums/dashboard";
import { IBill, IBillResponse } from "@/types/interfaces/bill";
import { Dispatch, SetStateAction } from "react";

type Props = {
  bill: IBillResponse;
  setFormData: Dispatch<SetStateAction<IBill>>;
  setModalData: Dispatch<SetStateAction<IBillResponse | undefined>>;
  handleOpen: () => void;
  handleOpenDelete: () => void;
  setModalDataDelete: Dispatch<SetStateAction<IBillResponse | undefined>>;
};

const ItemBill = ({
  bill,
  setFormData,
  setModalData,
  handleOpen,
  setModalDataDelete,
  handleOpenDelete,
}: Props) => {
  const handleSetFormData = (bill: IBillResponse) => {
    setFormData({
      id: bill.id as string,
      amountMoney: bill.amountMoney,
      assets: bill.assets,
      billNumber: bill.billNumber,
      billType: bill.billType,
      report: bill.report,
      typeOfCurrency: bill.typeOfCurrency.id as string,
      user: bill.user.id as string,
    });
  };

  const handleOpenModal = (bill: IBillResponse) => {
    setModalData(bill);
    handleOpen();
  };

  const handleOpenModalDelete = (bill: IBillResponse) => {
    setModalDataDelete(bill);
    handleOpenDelete();
  };

  console.log(bill);

  return (
    <>
      <td className="border-2 border-neutral-700 p-4">{bill.billNumber}</td>
      <td className="border-2 border-neutral-700 p-4">
        {formatDateYYYYmmdd(bill.createAt as Date)}
      </td>
      <td className="border-2 border-neutral-700 p-4">
        {BillsEnum[bill.billType]}
      </td>
      <td className="border-2 border-neutral-700 p-4">
        {AssetsEnum[bill.assets]}
      </td>
      <td className="border-2 border-neutral-700 p-4">
        {bill.typeOfCurrency.name}
      </td>
      <td className="border-2 border-neutral-700 p-4">{bill.amountMoney}</td>

      <td className="border-2 border-neutral-700 p-4">
        <div className="flex gap-x-2">
          <Button onClick={() => handleOpenModal(bill)}>Ver</Button>
          <Button onClick={() => handleSetFormData(bill)}>Editar</Button>
          <Button onClick={() => handleOpenModalDelete(bill)}>Borrar</Button>
        </div>
      </td>
    </>
  );
};

export default ItemBill;
