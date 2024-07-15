const FormButton = ({ children, extraClasses }) => {
  return (
    <button
      type="submit"
      className={`
        group py-2 px-4 rounded transition-all duration-200 text-custom-light bg-custom-primary hover:bg-custom-primary/80
        ${extraClasses ? extraClasses : ""}
      `}
    >
      {children}
    </button>
  );
};

export default FormButton;
