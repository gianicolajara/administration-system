"use client";

import { Dispatch, SetStateAction } from "react";

import Table from "@/app/components/Table";
import { IUser } from "@/types/interfaces/user";
import { BodyData, Head } from "@/types/types/table";
import Loader from "../../components/Loader";
import ItemUser from "./ItemUser";

type Props = {
  users?: Array<IUser>;
  loading: boolean;
  setFormDataUser: Dispatch<
    SetStateAction<{
      id?: string;
      username: string;
      password: string;
    }>
  >;
};

const ListOfUsers = ({ users, loading, setFormDataUser }: Props) => {
  if (loading) return <Loader />;

  if (!users) return <p>Algo fue mal</p>;
  if (users?.length === 0) return <p>Sin Data</p>;

  const handleSetFormUser = (item: IUser) => {
    setFormDataUser({
      id: item.id,
      username: item.username,
      password: "",
    });
  };

  const generateHead = (): Array<Head> => {
    return [
      {
        id: 1,
        name: "Nombre",
      },
      {
        id: 2,
        name: "Acciones",
      },
    ];
  };

  const generateBody = (): Array<BodyData> => {
    return users.map((item) => ({
      id: item.id as string,
      filter: item.username,
      subData: [
        {
          subItem: (
            <ItemUser user={item} handleSetFormUser={handleSetFormUser} />
          ),
        },
      ],
    }));
  };

  return <Table addFilter={true} head={generateHead()} body={generateBody()} />;
};

export default ListOfUsers;
