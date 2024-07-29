import { useEffect, useRef } from "react";
import { FaCircleCheck } from "react-icons/fa6";

const FormSuccess = ({ children, closeNotification }) => {
  const notificationRef = useRef(null);
  useEffect(() => {
    if (children && notificationRef.current) {
      notificationRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      notificationRef.current.focus();
    }
  }, [children]);

  if (!children) return null;

  return (
    <div
      ref={notificationRef}
      className="bg-green-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-green-500"
    >
      <FaCircleCheck className="text-green-500 h-4 w-4" />
      <p className="text-green-500">{children}</p>
      {closeNotification && (
        <button
          type="button"
          className="end-2.5 text-green-500 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-6 h-6 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={closeNotification}
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
          <span className="sr-only">Close Notification</span>
        </button>
      )}
    </div>
  );
};

export default FormSuccess;
