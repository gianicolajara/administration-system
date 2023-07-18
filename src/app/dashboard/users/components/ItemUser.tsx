import { useDesactivateUserMutation } from "@/redux/services/userApi";
import { IUser } from "@/types/interfaces/user";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Loader from "../../components/Loader";

type Props = {
  user: IUser;
  // eslint-disable-next-line no-unused-vars
  handleSetFormUser: (user: IUser) => void;
};

const ItemUser = ({ user, handleSetFormUser }: Props) => {
  const [desactivate, { isLoading }] = useDesactivateUserMutation();

  return (
    <>
      <td className="border-2 border-slate-800 p-4">{user.username}</td>
      <td className="border-2 border-slate-800 px-2">
        <button
          className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 mr-2"
          disabled={isLoading}
          onClick={() => desactivate(user.id)}
        >
          {isLoading ? (
            <Loader />
          ) : user.active ? (
            <AiFillEye size={20} />
          ) : (
            <AiFillEyeInvisible size={20} />
          )}
        </button>
        <button
          className="p-2 bg-slate-800 rounded-full hover:bg-slate-700"
          onClick={() => handleSetFormUser(user)}
        >
          Editar
        </button>
      </td>
    </>
  );
};

export default ItemUser;
