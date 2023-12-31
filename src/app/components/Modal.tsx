import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
import ButtonIcon from "../dashboard/components/ButtonIcon";

type Props = {
  open: boolean;
  children: ReactNode;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleClose: () => void;
};

const Modal = ({ children, open, setOpen, handleClose }: Props) => {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>("#modal");
    setMounted(true);
  }, []);

  return mounted && ref.current && open
    ? createPortal(
        <div
          className="w-screen h-screen bg-neutral-900/80 absolute top-0 left-0 flex justify-center items-center z-[999]"
          id="overlay"
          onClick={() => setOpen(false)}
        >
          <div
            className="max-w-[600px] max-h-[600px] bg-neutral-950 w-full h-min p-4 rounded-lg drop-shadow-lg relative border-2 border-neutral-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute right-0 top-0 p-4">
              <ButtonIcon onClick={handleClose}>
                <AiOutlineClose size={15} className="text-white" />
              </ButtonIcon>
            </div>
            {children}
          </div>
        </div>,
        ref.current
      )
    : null;
};

export default Modal;
