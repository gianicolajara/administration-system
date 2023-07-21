import { useDesactivateUserMutation } from "@/redux/services/userApi";
import { IUser } from "@/types/interfaces/user";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Button from "../../components/Button";
import ButtonIcon from "../../components/ButtonIcon";

type Props = {
  user: IUser;
  // eslint-disable-next-line no-unused-vars
  handleSetFormUser: (user: IUser) => void;
};

const ItemUser = ({ user, handleSetFormUser }: Props) => {
  const [desactivate, { isLoading }] = useDesactivateUserMutation();

  return (
    <>
      <td className="border-2 border-neutral-700 p-4">{user.username}</td>
      <td className="border-2 border-neutral-700 px-2">
        <div className="flex items-center gap-x-2">
          <ButtonIcon
            loading={isLoading}
            onClick={() => desactivate(user.id)}
            toolTip="Desactivar/Activar un usuario"
          >
            {user.active ? (
              <AiFillEye size={20} />
            ) : (
              <AiFillEyeInvisible size={20} />
            )}
          </ButtonIcon>
          <Button onClick={() => handleSetFormUser(user)}>Editar</Button>
        </div>
      </td>
    </>
  );
};

export default ItemUser;
