import FormInput from "@/src/components/shared/Forms/FormInput";
import FormError from "@/src/components/shared/Forms/FormError";
import FormSuccess from "@/src/components/shared/Forms/FormSuccess";
import FormButton from "@/src/components/shared/Forms/FormButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewHubSchema } from "@/src/schemas";

const NewHubModal = ({ handleModalToggle }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/20 z-20 flex items-center justify-center">
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl text-left font-semibold text-gray-900 dark:text-white">
              Create a new hub for 'Website Name'
            </h3>
            <button
              type="button"
              className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={handleModalToggle}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <form className="p-4">
            <FormError message="This is a form error"></FormError>
            <FormSuccess message="This is a form Success">
              This is a form Success
            </FormSuccess>
          </form>
          <div className="p-4 md:p-5"></div>
        </div>
      </div>
    </div>
  );
};

export default NewHubModal;
