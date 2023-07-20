import ModalDelete from "@/app/components/ModalDelete";
import { IChangesResponse } from "@/types/interfaces/changes";
import { Dispatch, SetStateAction } from "react";

type Props = {
  open: boolean;
  changes?: IChangesResponse;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleClose: () => void;
  // eslint-disable-next-line no-unused-vars
  onYes: (item: IChangesResponse) => void;
  loading: boolean;
  isSuccess: boolean;
  isError: boolean;
};

const ModalChanges = ({
  changes,
  open,
  setOpen,
  handleClose,
  onYes,
  loading,
  isError,
  isSuccess,
}: Props) => {
  return (
    <ModalDelete<IChangesResponse>
      handleClose={handleClose}
      isError={isError}
      isSuccess={isSuccess}
      loading={loading}
      name={`de ${changes?.from.name} a ${changes?.to.name}`}
      onYes={onYes}
      open={open}
      setOpen={setOpen}
      item={changes}
    />
  );
};

export default ModalChanges;
