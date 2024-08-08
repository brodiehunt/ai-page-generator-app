import LoadingSpinner from "./LoadingSpinner";
const FormButton = ({ children, extraClasses, isLoading }) => {
  return (
    <button
      type="submit"
      disabled={isLoading ? true : false}
      className={`
        group py-2 px-4 rounded transition-all duration-200 text-custom-light bg-custom-primary hover:bg-custom-primary/80 flex gap-2 items-center justify-center
        ${extraClasses ? extraClasses : ""}
      `}
    >
      {isLoading ? <LoadingSpinner /> : ""}
      {children}
    </button>
  );
};

export default FormButton;
