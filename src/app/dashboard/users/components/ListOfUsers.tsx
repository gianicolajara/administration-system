"use client";

import { IUser } from "../../../../../types/interfaces/user";
import Loader from "../../components/Loader";

type Props = {
  users?: Array<IUser>;
  loading: boolean;
};

const ListOfUsers = ({ users, loading }: Props) => {
  if (loading) return <Loader />;

  console.log(users);

  if (!users) return <p>Something was wrong</p>;

  return (
    <div className="border-2 border-slate-800 rounded-lg max-h-full">
      <table className="w-full border-2 border-slate-800 table-fixed">
        <thead>
          <tr>
            <th className="border-2 border-slate-800">Nombre</th>
            <th className="border-2 border-slate-800">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item) => (
            <tr key={item.id}>
              <td className="border-2 border-slate-800 p-4">{item.username}</td>
              <td className="border-2 border-slate-800 px-2">
                <button className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 mr-2">
                  Borrar
                </button>
                <button className="p-2 bg-slate-800 rounded-full hover:bg-slate-700">
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListOfUsers;
