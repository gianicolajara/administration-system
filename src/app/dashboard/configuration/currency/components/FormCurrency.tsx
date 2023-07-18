import FieldSet from "@/app/components/FieldSet";
import Form from "@/app/components/Form";
import Button from "@/app/dashboard/components/Button";
import InputText from "@/app/dashboard/components/InputText";
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
import { toast } from "react-toastify";

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
      toast("Creación de la moneda exitosa", {
        type: "success",
        theme: "dark",
      });
      handleReset();
    }

    if (!isSuccess && isError) {
      toast(JSON.stringify(error), {
        type: "error",
        theme: "dark",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, error, isError, setFormData]);

  useEffect(() => {
    if (isSuccessUpdate && !isErrorUpdate) {
      toast("Modificación de la moneda exitosa", {
        type: "success",
        theme: "dark",
      });
      handleReset();
    }

    if (!isSuccessUpdate && isErrorUpdate) {
      toast(JSON.stringify(errorUpdate), {
        type: "error",
        theme: "dark",
      });
    }
  }, [errorUpdate, handleReset, isErrorUpdate, isSuccessUpdate]);

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
        <div className="mt-4 flex gap-x-2">
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
