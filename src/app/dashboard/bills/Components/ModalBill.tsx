import Modal from "@/app/components/Modal";
import Title from "@/app/components/Title";
import { formatDateYYYYmmdd } from "@/lib/formatDate";
import { AssetsEnum, BillsEnum } from "@/types/enums/dashboard";
import { IBillResponse } from "@/types/interfaces/bill";
import { Dispatch, SetStateAction } from "react";

type Props = {
  open: boolean;
  bill?: IBillResponse;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleClose: () => void;
};

const ModalBill = ({ bill, open, setOpen, handleClose }: Props) => {
  if (!bill) return null;

  return (
    <Modal open={open} setOpen={setOpen} handleClose={handleClose}>
      <div className="w-full h-full text-white">
        <Title>Factura #{bill.billNumber}</Title>
        <p>
          <strong>Creado por:</strong> {bill.user.username}
        </p>
        <p>
          <strong>Fecha creación:</strong>{" "}
          {formatDateYYYYmmdd(bill.createAt as Date)}
        </p>
        <p>
          <strong>Fecha ultima modificación:</strong>{" "}
          {formatDateYYYYmmdd(bill.updateAt as Date)}
        </p>
        <p>
          <strong>Tipo de factura:</strong> {BillsEnum[bill.billType]}
        </p>
        <p>
          <strong>Activo financiero:</strong> {AssetsEnum[bill.assets]}
        </p>
        <p>
          <strong>Dinero: </strong> {bill.amountMoney}{" "}
          {bill.typeOfCurrency.name}
        </p>
        <p>
          <strong>Reporte: </strong> {bill.report}
        </p>
      </div>
    </Modal>
  );
};

export default ModalBill;
