import { Dispatch, SetStateAction } from "react";
import Button from "../dashboard/components/Button";
import Modal from "./Modal";
import P from "./P";

type Props<T> = {
  open: boolean;
  item?: T;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleClose: () => void;
  // eslint-disable-next-line no-unused-vars
  onYes: (item: T) => Promise<void>;
  loading: boolean;
  name: string;
};

const ModalDelete = <T,>({
  handleClose,
  loading,
  onYes,
  open,
  setOpen,
  item,
  name,
}: Props<T>) => {
  if (!item) return null;

  const handleOnYes = async (item: T) => {
    await onYes(item);
    handleClose();
  };

  return (
    <Modal open={open} setOpen={setOpen} handleClose={handleClose}>
      <P>¿Esta seguro que quiere eliminar {name}?</P>
      <div>
        <div className="flex gap-x-2 mt-4 w-full justify-center">
          <Button loading={loading} onClick={() => handleOnYes(item)}>
            Si
          </Button>
          <Button onClick={handleClose}>No</Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDelete;
