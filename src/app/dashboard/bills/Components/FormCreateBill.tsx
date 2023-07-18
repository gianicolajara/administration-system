"use client";

import FieldSet from "@/app/components/FieldSet";
import Form from "@/app/components/Form";
import Select from "@/app/components/Select";
import {
  httpErrorMessageHandle,
  httpSuccessMessageHandle,
} from "@/lib/alertHttp";
import {
  useCreateBillMutation,
  useUpdateBillMutation,
} from "@/redux/services/billApi";
import { useGetAllCurrenciesQuery } from "@/redux/services/currencyApi";
import { AssetsEnum } from "@/types/enums/dashboard";
import { IBill } from "@/types/interfaces/bill";
import { IMoney } from "@/types/interfaces/money";
import { useSession } from "next-auth/react";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
} from "react";
import Button from "../../components/Button";
import InputText from "../../components/InputText";
import {
  createSelectItems,
  initialStateForm,
  typesOfBills,
} from "../utils/bills";
import ListBillType from "./ListBillType";

type Props = {
  formData: IBill;
  setFormData: Dispatch<SetStateAction<IBill>>;
  handleChange: (
    // eslint-disable-next-line no-unused-vars
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  handleReset: () => void;
};

const FormCreateBill = ({
  formData,
  setFormData,
  handleChange,
  handleReset,
}: Props) => {
  const { data: session } = useSession();

  const [createBill, { isError, isLoading, isSuccess, error }] =
    useCreateBillMutation();

  const [
    updateBill,
    {
      isError: isErrorUpdate,
      isLoading: isLoadingUpdate,
      isSuccess: isSuccessUpdate,
      error: errorUpdate,
    },
  ] = useUpdateBillMutation();

  const { data, isLoading: isLoadingCurrencies } =
    useGetAllCurrenciesQuery("Currency");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.id) {
      updateBill({
        id: formData.id,
        change: formData,
      });
    } else {
      createBill({
        ...formData,
        user: session?.user?.id,
      });
    }
  };

  useEffect(() => {
    if (isSuccess && !isError) {
      httpSuccessMessageHandle("Creación de la factura exitosa");
      setFormData(initialStateForm);
    }

    if (!isSuccess && isError) {
      httpErrorMessageHandle(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, error]);

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
    <Form onSubmit={handleSubmit}>
      <FieldSet title="Tipo de Factura">
        <ListBillType
          FormData={formData}
          onChange={handleChange}
          typesOfBills={typesOfBills}
        />
      </FieldSet>
      <FieldSet title="Activo Financiero">
        <div className="flex flex-col gap-y-2 w-full">
          <div className="flex gap-x-4 w-full">
            <label>
              <input
                type="radio"
                name="assets"
                value={AssetsEnum.Ingreso}
                onChange={handleChange}
                checked={
                  formData.assets.toString() === AssetsEnum.Ingreso.toString()
                }
                className="appearance-none w-5 h-5 rounded-full border-4 border-purple-950 transition-all relative checked:border-8 checked:border-purple-600 select-none top-1 right-1"
              />
              Ingreso
            </label>
            <label>
              <input
                type="radio"
                name="assets"
                value={AssetsEnum.Egreso}
                onChange={handleChange}
                checked={
                  formData.assets.toString() === AssetsEnum.Egreso.toString()
                }
                className="appearance-none w-5 h-5 rounded-full border-4 border-purple-950 transition-all relative checked:border-8 checked:border-purple-600 select-none top-1 right-1"
              />
              Egreso
            </label>
          </div>
          <Select
            items={createSelectItems(data as Array<IMoney>)}
            isLoading={isLoadingCurrencies}
            label="Tipo de moneda"
            onChange={handleChange}
            name="typeOfCurrency"
            placeholder="Seleccione un tipo de moneda"
            value={formData.typeOfCurrency as string}
          />
        </div>
      </FieldSet>

      <FieldSet title="Datos">
        <div className="flex flex-col w-full">
          <div className="flex w-full gap-x-5">
            <InputText
              label="Numero de Factura"
              name="billNumber"
              onChange={handleChange}
              value={formData.billNumber}
            />
          </div>
          <div className="flex w-full gap-x-5 ">
            <InputText
              label="Cantidad de dinero"
              name="amountMoney"
              onChange={handleChange}
              value={formData.amountMoney}
              type="number"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="report">Reporte</label>
            <textarea
              name="report"
              cols={30}
              rows={10}
              onChange={handleChange}
              value={formData.report}
              className="resize-none bg-slate-800 rounded p-4 w-full"
              placeholder="Ingrese una descripción o titulo de su factura"
            />
          </div>
          <div className="mt-2 w-full flex justify-center gap-x-2">
            <Button type="submit" loading={isLoading || isLoadingUpdate}>
              Guardar
            </Button>
            {formData.id && <Button onClick={handleReset}>Cancelar</Button>}
          </div>
        </div>
      </FieldSet>
    </Form>
  );
};

export default FormCreateBill;
