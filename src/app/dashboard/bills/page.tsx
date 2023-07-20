"use client";

import ModalDelete from "@/app/components/ModalDelete";
import SubTitle from "@/app/components/SubTitle";
import useForm from "@/hooks/useForm";
import useModal from "@/hooks/useModal";
import {
  useDeleteBillMutation,
  useGetAllBillesQuery,
} from "@/redux/services/billApi";
import { IBill, IBillResponse } from "@/types/interfaces/bill";
import { Value } from "@wojtekmaj/react-daterange-picker/dist/cjs/shared/types";
import { useEffect, useState } from "react";
import FormCreateBill from "./Components/FormCreateBill";
import ModalBill from "./Components/ModalBill";
import TableBilles from "./Components/TableBilles";
import { initialStateForm } from "./utils/bills";

const Create = () => {
  const [multiPickerValue, setMultiPickerValue] = useState<Value>([null, null]);

  const { isLoading, data, refetch } = useGetAllBillesQuery({
    startDate: multiPickerValue
      ? (multiPickerValue as Array<Date>)[0]?.toString()
      : undefined,
    endDate: multiPickerValue
      ? (multiPickerValue as Array<Date>)[1]?.toString()
      : undefined,
  });

  const { formData, handleChange, setFormData, handleReset } = useForm<IBill>({
    initialState: initialStateForm,
  });

  const { handleClose, handleOpen, open, saveData, setSaveData, setOpen } =
    useModal<IBillResponse>();

  useEffect(() => {
    if (multiPickerValue !== null) {
      refetch();
    }
  }, [multiPickerValue, refetch]);

  const {
    handleClose: handleCloseDelete,
    handleOpen: handleOpenDelete,
    open: openDelete,
    saveData: saveDataDelete,
    setSaveData: setSaveDataDelete,
    setOpen: setOpenDelete,
  } = useModal<IBillResponse>();

  const [deleteChange, { isLoading: deleteLoading, isSuccess, isError }] =
    useDeleteBillMutation();

  return (
    <>
      <ModalDelete<IBillResponse>
        handleClose={handleCloseDelete}
        isError={isError}
        isSuccess={isSuccess}
        loading={deleteLoading}
        name={saveDataDelete?.billNumber as string}
        onYes={(item) => deleteChange(item.id as string)}
        open={openDelete}
        setOpen={setOpenDelete}
        item={saveDataDelete}
      />
      <ModalBill
        open={open}
        bill={saveData}
        setOpen={setOpen}
        handleClose={handleClose}
      />
      <section className="w-full h-full">
        <div className="mb-4">
          <SubTitle>Facturas</SubTitle>
        </div>
        <section className="grid grid-cols-1 grid-rows-[auto,_auto] lg:grid-cols-2 lg:grid-rows-1 lg:gap-x-2 gap-y-2">
          <FormCreateBill
            formData={formData}
            handleChange={handleChange}
            setFormData={setFormData}
            handleReset={handleReset}
          />
          <TableBilles
            loading={isLoading}
            billes={data}
            setFormData={setFormData}
            setModalData={setSaveData}
            handleOpen={handleOpen}
            valueDatePicker={multiPickerValue}
            onChangeDatePicker={setMultiPickerValue}
            handleOpenDelete={handleOpenDelete}
            setModalDataDelete={setSaveDataDelete}
          />
        </section>
      </section>
    </>
  );
};

export default Create;
