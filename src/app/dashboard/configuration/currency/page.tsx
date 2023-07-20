"use client";

import SubTitle from "@/app/components/SubTitle";
import useForm from "@/hooks/useForm";
import useModal from "@/hooks/useModal";
import {
  useDeleteCurrencyMutation,
  useGetAllCurrenciesQuery,
} from "@/redux/services/currencyApi";
import { IMoney } from "@/types/interfaces/money";
import FormCurrency from "./components/FormCurrency";
import ModalCurrency from "./components/ModalCurrency";
import TableCurrency from "./components/TableCurrency";

const initialState: IMoney = {
  name: "",
};

const Currency = () => {
  const { data, isLoading } = useGetAllCurrenciesQuery("Currency");

  const { formData, handleChange, setFormData, handleReset } = useForm({
    initialState,
  });

  const { handleClose, handleOpen, open, saveData, setSaveData, setOpen } =
    useModal<IMoney>();

  const [deleteCurrency, { isLoading: deleteLoading, isSuccess, isError }] =
    useDeleteCurrencyMutation();

  return (
    <>
      <ModalCurrency
        handleClose={handleClose}
        isError={isError}
        isSuccess={isSuccess}
        loading={deleteLoading}
        onYes={(item) =>
          deleteCurrency({
            id: item.id as string,
          })
        }
        open={open}
        setOpen={setOpen}
        currency={saveData}
      />

      <div className="w-full h-full">
        <div className="mb-4">
          <SubTitle>Monedas</SubTitle>
        </div>
        <div className="grid grid-cols-1 grid-rows-[auto,_auto] lg:grid-cols-2 lg:grid-rows-1 lg:gap-x-2 gap-y-2">
          <FormCurrency
            formData={formData}
            handleChange={handleChange}
            setFormData={setFormData}
            handleReset={handleReset}
          />
          <TableCurrency
            currencies={data}
            loading={isLoading}
            setFormData={setFormData}
            setSaveData={setSaveData}
            handleOpen={handleOpen}
          />
        </div>
      </div>
    </>
  );
};

export default Currency;
