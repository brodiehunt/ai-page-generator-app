const FormInput = ({
  register,
  type,
  error,
  name,
  label,
  placeholder,
  isPending,
}) => {
  if (type === "checkbox") {
    return (
      <div>
        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              id="addToMatrix"
              type={type}
              {...register(name)}
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
            />
          </div>
          <label
            htmlFor="addToMatrix"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            {label}
            {/* <span className="text-custom-primary">{websiteName}</span>. */}
          </label>
        </div>
      </div>
    );
  }

  if (type === "textarea") {
    return (
      <div>
        <>
          <label
            htmlFor={name}
            className="block text-left text-sm text-gray-500 dark:text-gray-300"
          >
            {label}
          </label>
          <div className="relative flex items-center mt-2">
            <textarea
              {...register(name)}
              disabled={isPending}
              placeholder={placeholder ? placeholder : ""}
              className={`block w-full py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg px-3 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 text-xs ${
                error &&
                "border-red-400 focus:border-red-400 focus:outline-none focus:ring focus:ring-red-300 "
              }`}
            />
          </div>
          {error && (
            <p className="mt-3 text-xs text-red-400" role="alert">
              {error.message}
            </p>
          )}
        </>
      </div>
    );
  }

  return (
    <>
      <div>
        <>
          <label
            htmlFor={name}
            className="block text-left text-sm text-gray-500 dark:text-gray-300"
          >
            {label}
          </label>
          <div className="relative flex items-center mt-2">
            <input
              type={type}
              {...register(name)}
              disabled={isPending}
              placeholder={placeholder ? placeholder : ""}
              className={`block w-full py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg px-3 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 ${
                error &&
                "border-red-400 focus:border-red-400 focus:outline-none focus:ring focus:ring-red-300 "
              }`}
            />
          </div>
          {error && (
            <p className="mt-3 text-xs text-red-400" role="alert">
              {error.message}
            </p>
          )}
        </>
      </div>
    </>
  );
};

export default FormInput;
