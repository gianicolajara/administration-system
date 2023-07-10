"use client";

import { useGetAllUsersQuery } from "@/redux/services";
import FormCreateUser from "./components/FormCreateUser";
import ListOfUsers from "./components/ListOfUsers";

const Users = () => {
  /* const [users, setUsers] = useState<Array<IUser>>([]); */

  /*  const { data: dataUsers, successfully: successfullyUsers } = useFetch({
    url: "http://localhost:3000/api/users",
    method: "GET",
    start: true,
  }); */

  /*  useEffect(() => {
    if (successfullyUsers) {
      setUsers((dataUsers as { message: string; users: Array<IUser> }).users);
    }
  }, [dataUsers, successfullyUsers]); */

  const { data, isLoading } = useGetAllUsersQuery("usersApi");

  return (
    <section className="grid grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 lg:gap-x-2 gap-y-2">
      <ListOfUsers users={data} loading={isLoading} />
      <FormCreateUser />
    </section>
  );
};

export default Users;
