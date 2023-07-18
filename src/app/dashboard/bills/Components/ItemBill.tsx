import Button from "@/app/dashboard/components/Button";
import { useDeleteBillMutation } from "@/redux/services/billApi";
import { AssetsEnum, BillsEnum } from "@/types/enums/dashboard";
import { IBill, IBillResponse } from "@/types/interfaces/bill";
import { Dispatch, SetStateAction } from "react";

type Props = {
  bill: IBillResponse;
  setFormData: Dispatch<SetStateAction<IBill>>;
  setModalData: Dispatch<SetStateAction<IBillResponse | undefined>>;
  handleOpen: () => void;
};

const ItemBill = ({ bill, setFormData, setModalData, handleOpen }: Props) => {
  const [deleteBill, { isLoading }] = useDeleteBillMutation();

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

  return (
    <>
      <td className="border-2 border-slate-800 p-4">{bill.billNumber}</td>
      <td className="border-2 border-slate-800 p-4">
        {BillsEnum[bill.billType]}
      </td>
      <td className="border-2 border-slate-800 p-4">
        {AssetsEnum[bill.assets]}
      </td>
      <td className="border-2 border-slate-800 p-4">
        {bill.typeOfCurrency.name}
      </td>
      <td className="border-2 border-slate-800 p-4">{bill.amountMoney}</td>
      <td className="border-2 border-slate-800 p-4">
        <div className="flex gap-x-2">
          <Button onClick={() => handleOpenModal(bill)}>Ver</Button>
          <Button onClick={() => handleSetFormData(bill)}>Editar</Button>
          <Button
            loading={isLoading}
            onClick={() => deleteBill(bill.id as string)}
          >
            Borrar
          </Button>
        </div>
      </td>
    </>
  );
};

export default ItemBill;
