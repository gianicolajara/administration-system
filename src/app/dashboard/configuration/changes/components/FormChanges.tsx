import FieldSet from "@/app/components/FieldSet";
import Form from "@/app/components/Form";
import Select from "@/app/components/Select";
import Button from "@/app/dashboard/components/Button";
import InputText from "@/app/dashboard/components/InputText";
import {
  httpErrorMessageHandle,
  httpSuccessMessageHandle,
} from "@/lib/alertHttp";
import {
  useCreateChangeMutation,
  useUpdateChangeMutation,
} from "@/redux/services/changesApi";
import { useGetAllCurrenciesQuery } from "@/redux/services/currencyApi";
import { IChanges } from "@/types/interfaces/changes";
import { IMoney } from "@/types/interfaces/money";
import { ChangeEvent, FormEvent, useEffect } from "react";
import { generateSelectOptions } from "../utils/createForm";

type Props = {
  formData: IChanges;
  handleChange: (
    // eslint-disable-next-line no-unused-vars
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  handleReset: () => void;
};

const FormChanges = ({ formData, handleChange, handleReset }: Props) => {
  const { isLoading: isLoadingGetAll, data } =
    useGetAllCurrenciesQuery("Changes");

  const [createChanges, { isError, isLoading, isSuccess, error }] =
    useCreateChangeMutation();

  const [
    updateChange,
    {
      isError: isErrorUpdate,
      isLoading: isLoadingUpdate,
      isSuccess: isSuccessUpdate,
      error: errorUpdate,
    },
  ] = useUpdateChangeMutation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.id) {
      updateChange({
        id: formData.id,
        change: {
          ...formData,
          amount: parseFloat(formData.amount as string),
        },
      });
    } else {
      createChanges(formData);
    }
  };

  useEffect(() => {
    if (isSuccess && !isError) {
      httpSuccessMessageHandle("Creación del cambio exitosa");
      handleReset();
    }

    if (!isSuccess && isError) {
      httpErrorMessageHandle(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, error, isError]);

  useEffect(() => {
    if (isSuccessUpdate && !isErrorUpdate) {
      httpSuccessMessageHandle("Modificación del cambio exitosa");
      handleReset();
    }

    if (!isSuccessUpdate && isErrorUpdate) {
      httpErrorMessageHandle(errorUpdate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorUpdate, isErrorUpdate, isSuccessUpdate]);

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <FieldSet title={formData.id ? "Modificar Cambio" : "Crear cambio"}>
          <div className="flex flex-col gap-y-2 w-full">
            <Select
              onChange={handleChange}
              items={generateSelectOptions(data as Array<IMoney>)}
              isLoading={isLoadingGetAll}
              name="from"
              value={formData.from as string}
              label="De"
              placeholder="Seleccione una moneda"
            />
            <Select
              onChange={handleChange}
              items={generateSelectOptions(data as Array<IMoney>)}
              isLoading={isLoadingGetAll}
              name="to"
              value={formData.to as string}
              label="A"
              placeholder="Seleccione una moneda"
            />
            <InputText
              type="number"
              label="Cantidad"
              name="amount"
              onChange={handleChange}
              value={formData.amount}
              placeholder="Ingrese una cantidad"
            />
          </div>
        </FieldSet>
        <div className="mt-4 flex gap-x-2 w-full justify-center">
          <Button type="submit" loading={isLoading || isLoadingUpdate}>
            Guardar
          </Button>

          {formData.id && <Button onClick={handleReset}>Cancelar</Button>}
        </div>
      </Form>
    </div>
  );
};

export default FormChanges;
