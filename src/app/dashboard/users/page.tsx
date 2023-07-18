"use client";

import { useGetAllUsersQuery } from "@/redux/services/userApi";
import { useState } from "react";
import FormCreateUser from "./components/FormCreateUser";
import ListOfUsers from "./components/ListOfUsers";

const Users = () => {
  const { data, isLoading } = useGetAllUsersQuery("Users");

  const [formDataUser, setFormDataUser] = useState<{
    id?: string;
    username: string;
    password: string;
  }>({
    username: "",
    password: "",
  });

  return (
    <section className="grid grid-cols-1 grid-rows-[auto,_auto] lg:grid-cols-2 lg:grid-rows-1 lg:gap-x-2 gap-y-2">
      <FormCreateUser
        setFormDataUser={setFormDataUser}
        formDataUser={formDataUser}
      />
      <ListOfUsers
        users={data}
        loading={isLoading}
        setFormDataUser={setFormDataUser}
      />
    </section>
  );
};

export default Users;
