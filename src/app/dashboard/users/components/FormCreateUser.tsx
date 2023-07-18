import FieldSet from "@/app/components/FieldSet";
import Form from "@/app/components/Form";
import {
  useSignupMutation,
  useUpdateUserMutation,
} from "@/redux/services/userApi";
import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
} from "react";
import { toast } from "react-toastify";
import Button from "../../components/Button";
import InputText from "../../components/InputText";

type Props = {
  setFormDataUser: Dispatch<
    SetStateAction<{
      id?: string;
      username: string;
      password: string;
    }>
  >;
  formDataUser: {
    id?: string;
    username: string;
    password: string;
  };
};

const FormCreateUser = ({ setFormDataUser, formDataUser }: Props) => {
  const router = useRouter();

  const [signUp, { isError, isLoading, isSuccess, error }] =
    useSignupMutation();

  const [
    updateUser,
    {
      isError: isErrorUpdate,
      isLoading: isLoadingUpdate,
      isSuccess: isSuccessUpdate,
      error: errorUpdate,
    },
  ] = useUpdateUserMutation();

  const handleReset = () => {
    setFormDataUser({
      username: "",
      password: "",
    });
  };

  useEffect(() => {
    if (isSuccess && !isError) {
      toast("Creación del usuario exitosa", {
        type: "success",
        theme: "dark",
      });
    }

    if (!isSuccess && isError) {
      toast(JSON.stringify(error), {
        type: "error",
        theme: "dark",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, error, router]);

  useEffect(() => {
    if (isSuccessUpdate && !isErrorUpdate) {
      toast("Modificación del usuario exitosa", {
        type: "success",
        theme: "dark",
      });
    }

    if (!isSuccessUpdate && isErrorUpdate) {
      toast(JSON.stringify(errorUpdate), {
        type: "error",
        theme: "dark",
      });
    }
  }, [errorUpdate, isErrorUpdate, isSuccessUpdate]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormDataUser({
      ...formDataUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formDataUser.id) {
      updateUser({
        id: formDataUser.id || "",
        user: {
          id: formDataUser.id,
          username: formDataUser.username,
          password:
            formDataUser.password === "" ? undefined : formDataUser.password,
        },
      });
    } else {
      signUp({ ...formDataUser });
    }
    setFormDataUser({ password: "", username: "" });
  };

  return (
    <div>
      <Form onSubmit={handleOnSubmit}>
        <FieldSet title={formDataUser.id ? "Editar Usuario" : "Crear usuario"}>
          <InputText
            label="Nombre de Usuario"
            name="username"
            value={formDataUser.username}
            placeholder="Inserte un nombre de usuario"
            onChange={handleOnChange}
          />
          <InputText
            label="Contraseña"
            name="password"
            value={formDataUser.password}
            placeholder="Inserte una contraseña"
            onChange={handleOnChange}
            type="password"
          />
        </FieldSet>

        <div className="flex gap-x-2 mt-5 w-full justify-center">
          <Button loading={isLoading || isLoadingUpdate} type="submit">
            Guardar
          </Button>
          {formDataUser.id && (
            <Button type="reset" onClick={handleReset}>
              Cancelar
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
};

export default FormCreateUser;
