"use client";

import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

import { IUser } from "../../../../../types/interfaces/user";
import InputText from "../../components/InputText";
import Loader from "../../components/Loader";
import ItemUser from "./ItemUser";

type Props = {
  users?: Array<IUser>;
  loading: boolean;
  setFormDataUser: Dispatch<
    SetStateAction<{
      id?: string | undefined;
      username: string;
      password?: string | undefined;
    }>
  >;
};

const ListOfUsers = ({ users, loading, setFormDataUser }: Props) => {
  const [filter, setFilter] = useState("");

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  if (loading) return <Loader />;

  if (!users) return <p>Algo fue mal</p>;
  if (users?.length === 0) return <p>Sin Data</p>;

  const handleSetFormUser = (item: IUser) => {
    setFormDataUser({
      id: item.id,
      username: item.username,
      password: undefined,
    });
  };

  return (
    <div className="">
      <div className="py-4">
        <InputText
          onChange={handleOnChange}
          value={filter}
          label="Filtro"
          name="filter"
        />
      </div>
      <table className="w-full border-2 border-slate-800 table-fixed">
        <thead>
          <tr>
            <th className="border-2 border-slate-800">Nombre</th>
            <th className="border-2 border-slate-800">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter((item) => item.username.includes(filter))
            .map((item) => (
              <ItemUser
                user={item}
                handleSetFormUser={handleSetFormUser}
                key={item.id}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListOfUsers;
