import ModalDelete from "@/app/components/ModalDelete";
import { IMoney } from "@/types/interfaces/money";
import { Dispatch, SetStateAction } from "react";

type Props = {
  open: boolean;
  currency?: IMoney;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleClose: () => void;
  // eslint-disable-next-line no-unused-vars
  onYes: (item: IMoney) => void;
  loading: boolean;
  isSuccess: boolean;
  isError: boolean;
};

const ModalCurrency = ({
  currency,
  open,
  setOpen,
  handleClose,
  onYes,
  loading,
  isError,
  isSuccess,
}: Props) => {
  return (
    <ModalDelete<IMoney>
      handleClose={handleClose}
      isError={isError}
      isSuccess={isSuccess}
      loading={loading}
      name={currency?.name as string}
      onYes={onYes}
      open={open}
      setOpen={setOpen}
      item={currency}
    />
  );
};

export default ModalCurrency;
