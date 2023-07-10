import { useSignupMutation } from "@/redux/services";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "../../components/Button";
import InputText from "../../components/InputText";

const FormCreateUser = () => {
  const router = useRouter();

  const [signUp, { isError, isLoading, isSuccess, error }] =
    useSignupMutation();

  const [formDataUser, setFormDataUser] = useState<{
    username: string;
    password: string;
  }>({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (isSuccess && !isError) {
      toast("Creación del usuario exitosa", {
        type: "success",
        theme: "dark",
      });
      /*  setUsers([...users, (data as { message: string; user: IUser }).user]); */
    }

    if (!isSuccess && isError) {
      toast(JSON.stringify(error), {
        type: "error",
        theme: "dark",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, error, router]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormDataUser({
      ...formDataUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUp({ ...formDataUser });
    setFormDataUser({ password: "", username: "" });
  };

  return (
    <form
      className="h-min border-2 border-slate-800 p-5 rounded-lg"
      onSubmit={handleOnSubmit}
    >
      <fieldset className="flex gap-x-4 border-2 border-slate-800 p-5">
        <legend className="bg-white py-1 px-2 rounded-lg text-slate-950 font-bold">
          Crear usuario
        </legend>
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
      </fieldset>

      <Button loading={isLoading} type="submit">
        Guardar
      </Button>
    </form>
  );
};

export default FormCreateUser;
