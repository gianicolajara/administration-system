import { useState } from "react";

const useModal = <T>() => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [saveData, setSaveData] = useState<T>();

  return {
    open,
    handleOpen,
    handleClose,
    setSaveData,
    saveData,
    setOpen,
  };
};

export default useModal;
