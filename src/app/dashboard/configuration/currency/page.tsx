"use client";

import Title from "@/app/components/Title";
import useForm from "@/hooks/useForm";
import { useGetAllCurrenciesQuery } from "@/redux/services/currencyApi";
import { IMoney } from "../../../../../types/interfaces/money";
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
      <Title>Monedas</Title>
      <div className="grid grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 lg:gap-x-2 gap-y-2">
        <TableCurrency
          currencies={data}
          loading={isLoading}
          setFormData={setFormData}
        />
        <FormCurrency
          formData={formData}
          handleChange={handleChange}
          setFormData={setFormData}
          handleReset={handleReset}
        />
      </div>
    </div>
  );
};

export default Currency;
