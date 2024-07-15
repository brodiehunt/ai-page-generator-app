import { FaTriangleExclamation } from "react-icons/fa6";

const FormError = ({ message }) => {
  if (!message) return null;

  return (
    <div className="bg-red-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-red-500">
      <FaTriangleExclamation className="text-red-500 h-4 w-4" />
      <p className="text-red-500">{message}</p>
    </div>
  );
};

export default FormError;
