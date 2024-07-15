import { FaCircleCheck } from "react-icons/fa6";

const FormSuccess = ({ children }) => {
  if (!children) return null;

  return (
    <div className="bg-green-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-green-500">
      <FaCircleCheck className="text-green-500 h-4 w-4" />
      <p className="text-green-500">{children}</p>
    </div>
  );
};

export default FormSuccess;
