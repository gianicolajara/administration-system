"use client";

import FieldSet from "@/app/components/FieldSet";
import Form from "@/app/components/Form";
import Select from "@/app/components/Select";
import SubTitle from "@/app/components/SubTitle";
import useForm from "@/hooks/useForm";
import {
  httpErrorMessageHandle,
  httpSuccessMessageHandle,
} from "@/lib/alertHttp";
import {
  useCreateConfigurationMutation,
  useGetConfigurationQuery,
} from "@/redux/services/configurationApi";
import { useGetAllCurrenciesQuery } from "@/redux/services/currencyApi";
import { IConfiguration } from "@/types/interfaces/configuration";
import { IMoney } from "@/types/interfaces/money";
import { ItemSelect } from "@/types/types/select";
import { FormEvent, useEffect } from "react";
import Button from "../../components/Button";
import Loader from "../../components/Loader";

const initialState = {
  change: "",
};
const Generals = () => {
  const { data: dataConfiguration, isLoading: isLoadingGetAllConfiguration } =
    useGetConfigurationQuery();

  const { formData, handleChange, setFormData } = useForm<IConfiguration>({
    initialState,
  });

  const { isLoading: isLoadingGetAll, data } =
    useGetAllCurrenciesQuery("Changes");

  const [createConfiguration, { isSuccess, isError, error, isLoading }] =
    useCreateConfigurationMutation();

  const generateSelectOptions = (items: Array<IMoney>): Array<ItemSelect> => {
    if (!items || items.length === 0) return [];

    return items?.map((item) => ({
      id: item.id as string,
      label: item.name as string,
      value: item.id as string,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createConfiguration(formData);
  };

  useEffect(() => {
    if (isSuccess && !isError) {
      httpSuccessMessageHandle("Cambio exitoso");
    }

    if (!isSuccess && isError) {
      httpErrorMessageHandle(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, error, isError]);

  useEffect(() => {
    setFormData({
      change: dataConfiguration?.change?.id || "",
    });
  }, [dataConfiguration, setFormData]);

  if (isLoadingGetAllConfiguration) return <Loader />;
  return (
    <section className="w-full h-full">
      <div className="mb-4">
        <SubTitle>Generales</SubTitle>
      </div>

      <Form onSubmit={handleSubmit}>
        <FieldSet title="Facturas">
          <Select
            onChange={handleChange}
            items={generateSelectOptions(data as Array<IMoney>)}
            isLoading={isLoadingGetAll || isLoadingGetAllConfiguration}
            name="change"
            value={formData.change as string}
            label="Calcular totales con"
            placeholder="Seleccione una moneda"
            description="Con este valor se calculara el total de las facturas"
          />
        </FieldSet>
        <div className="mt-4 w-full flex justify-center">
          <Button type="submit" loading={isLoading}>
            Guardar Configuraciones
          </Button>
        </div>
      </Form>
    </section>
  );
};

export default Generals;
