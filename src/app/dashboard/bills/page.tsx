"use client";

import SubTitle from "@/app/components/SubTitle";
import useForm from "@/hooks/useForm";
import useModal from "@/hooks/useModal";
import { useGetAllBillesQuery } from "@/redux/services/billApi";
import { IBill, IBillResponse } from "@/types/interfaces/bill";
import FormCreateBill from "./Components/FormCreateBill";
import ModalBill from "./Components/ModalBill";
import TableBilles from "./Components/TableBilles";
import { initialStateForm } from "./utils/bills";

const Create = () => {
  const { isLoading, data } = useGetAllBillesQuery();

  const { formData, handleChange, setFormData, handleReset } = useForm<IBill>({
    initialState: initialStateForm,
  });

  const { handleClose, handleOpen, open, saveData, setSaveData, setOpen } =
    useModal<IBillResponse>();

  return (
    <>
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
          />
        </section>
      </section>
    </>
  );
};

export default Create;
