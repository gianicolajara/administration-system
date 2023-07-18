"use client";

import SubTitle from "@/app/components/SubTitle";
import useForm from "@/hooks/useForm";
import { useGetAllCurrenciesQuery } from "@/redux/services/currencyApi";
import { IMoney } from "@/types/interfaces/money";
import FormCurrency from "./components/FormCurrency";
import TableCurrency from "./components/TableCurrency";

const initialState: IMoney = {
  name: "",
};

const Currency = () => {
  const { data, isLoading } = useGetAllCurrenciesQuery("Currency");

  const { formData, handleChange, setFormData, handleReset } = useForm({
    initialState,
  });

  return (
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
        />
      </div>
    </div>
  );
};

export default Currency;
