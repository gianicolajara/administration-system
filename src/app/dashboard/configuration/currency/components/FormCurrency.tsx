import FieldSet from "@/app/components/FieldSet";
import Form from "@/app/components/Form";
import Button from "@/app/dashboard/components/Button";
import InputText from "@/app/dashboard/components/InputText";
import {
  httpErrorMessageHandle,
  httpSuccessMessageHandle,
} from "@/lib/alertHttp";
import {
  useCreateCurrencyMutation,
  useUpdateCurrencyMutation,
} from "@/redux/services/currencyApi";
import { IMoney } from "@/types/interfaces/money";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
} from "react";

type Props = {
  // eslint-disable-next-line no-unused-vars
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  formData: IMoney;
  setFormData: Dispatch<SetStateAction<IMoney>>;
  handleReset: () => void;
};

const FormCurrency = ({
  handleChange,
  formData,
  setFormData,
  handleReset,
}: Props) => {
  const [createCurrency, { isError, isSuccess, isLoading, error }] =
    useCreateCurrencyMutation();

  const [
    updateCurrency,
    {
      isError: isErrorUpdate,
      isSuccess: isSuccessUpdate,
      isLoading: isLoadingUpdate,
      error: errorUpdate,
    },
  ] = useUpdateCurrencyMutation();

  useEffect(() => {
    if (isSuccess && !isError) {
      httpSuccessMessageHandle("Creación de la moneda exitosa");
      handleReset();
    }

    if (!isSuccess && isError) {
      httpErrorMessageHandle(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, error, isError, setFormData]);

  useEffect(() => {
    if (isSuccessUpdate && !isErrorUpdate) {
      httpSuccessMessageHandle("Modificación de la moneda exitosa");
      handleReset();
    }

    if (!isSuccessUpdate && isErrorUpdate) {
      httpErrorMessageHandle(errorUpdate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorUpdate, isErrorUpdate, isSuccessUpdate]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.id) {
      updateCurrency({
        id: formData.id as string,
        currency: {
          name: formData.name,
        },
      });
    } else {
      createCurrency(formData);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <FieldSet
          title={`${formData.id ? "Modificar moneda" : "Crear Moneda"}`}
        >
          <InputText
            label="Nombre"
            name="name"
            onChange={handleChange}
            value={formData.name}
            placeholder="Ingrese un nombre de moneda"
          />
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

export default FormCurrency;
