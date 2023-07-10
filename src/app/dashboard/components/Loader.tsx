import { BiLoader } from "react-icons/bi";

const Loader = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      {<BiLoader className="text-white animate-spin" size={20} />}
    </div>
  );
};

export default Loader;
