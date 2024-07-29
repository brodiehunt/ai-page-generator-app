import FormInput from "@/src/components/shared/Forms/FormInput";
import FormError from "@/src/components/shared/Forms/FormError";
import FormSuccess from "@/src/components/shared/Forms/FormSuccess";
import FormButton from "@/src/components/shared/Forms/FormButton";
import Button from "@/src/components/shared/Button";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Hub from "@/src/models/Hub";
import { HubSchema } from "@/src/schemas";
import { useEffect, useState } from "react";

const EditHubModal = ({
  handleToggleHubEdit,
  handleToggleSpokeEdit,
  hub,
  handleDeleteHub,
  handleUpdateHub,
}) => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(HubSchema),
    defaultValues: {
      ...hub,
    },
  });

  const { fields, remove } = useFieldArray({
    control,
    name: "spokes",
    keyName: "key",
  });

  useEffect(() => {
    reset({ ...hub });
  }, [hub]);

  const closeSuccess = () => {
    setSuccess("");
  };

  const closeError = () => {
    setError("");
  };

  const handleSaveHub = (values) => {
    setError("");
    setSuccess("");
    try {
      handleUpdateHub(values);
      setSuccess("Hub details updated");
    } catch (error) {
      console.log(error);
      setError;
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/30 z-20 flex items-center justify-center">
      <div className="relative p-4 w-full max-w-2xl h-full flex items-center justify-stretch">
        <div className="relative bg-white rounded-lg shadow max-h-[90%] min-w-[100%] overflow-scroll dark:bg-gray-700">
          <div className="flex items-center justify-between bg-custom-primary p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl text-left font-semibold text-custom-light dark:text-white">
              Edit Hub: {hub.hub}
            </h3>
            <button
              type="button"
              className="end-2.5 text-custom-light bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={handleToggleHubEdit}
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
          {error ||
            (success && (
              <div className="p-4">
                <FormError
                  closeNotification={closeError}
                  message={error}
                ></FormError>
                <FormSuccess closeNotification={closeSuccess}>
                  {success}
                </FormSuccess>
              </div>
            ))}

          <form className="p-4" onSubmit={handleSubmit(handleSaveHub)}>
            <h3 className="font-medium text-lg mb-2 text-custom-primary">
              General
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-4 shaddow">
              <FormInput
                register={register}
                type="text"
                error={errors.hub}
                name="hub"
                label="Hub Name"
              />
              <FormInput
                register={register}
                type="text"
                error={errors.hubUrl}
                name="hubUrl"
                label="Hub Slug"
              />
            </div>
            <h3 className="font-medium text-lg mb-2 text-custom-primary">
              SEO
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-2">
              <FormInput
                register={register}
                type="text"
                error={errors.seoMeta?.seoTitle}
                name="seoMeta.seoTitle"
                label="SEO Title"
              />
              <FormInput
                register={register}
                type="text"
                error={errors.seoMeta?.seoKeyphrase}
                name="seoMeta.seoKeyphrase"
                label="SEO Keyphrase"
              />
            </div>
            <div className="grid gap-2 mb-4">
              <FormInput
                register={register}
                type="textarea"
                error={errors.seoMeta?.seoDescription}
                name="seoMeta.seoDescription"
                label="SEO Description"
              />
              <FormInput
                register={register}
                type="textarea"
                error={errors.seoMeta?.theExcerpt}
                name="seoMeta.theExcerpt"
                label="Page Excerpt"
              />
            </div>
            <h3 className="font-medium text-lg mb-2 text-custom-primary">
              Spokes
            </h3>
            <div className="grid gap-2 mb-4">
              {fields.map((field, index) => (
                <div key={field.key} className="flex items-center">
                  <span className="text-custom-dark text-sm flex-shrink-1">
                    {field.title}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleToggleSpokeEdit({ ...field })}
                    className="ml-auto text-custom-primary bg-custom-primary/20 hover:bg-custom-primary/20 py-1 px-2 rounded text-sm font-medium"
                  >
                    View
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      console.log(field.id);
                      remove(index);
                    }}
                    className="ml-2 text-red-500 bg-red-500/20 hover:bg-red-500/20 py-1 px-2 rounded text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-4 py-4 pb-0 justify-end">
              <button
                type="button"
                className="group py-2 px-4 rounded transition-all duration-200 bg-red-500 hover:bg-red-500/80 text-custom-light"
                onClick={() => reset()}
              >
                Reset Fields
              </button>

              <FormButton isLoading={false}>Save Hub</FormButton>
            </div>
          </form>
          <div className="p-4 flex justify-center">
            <button
              onClick={() => {
                handleDeleteHub(hub.id);
                handleToggleHubEdit();
              }}
              className="text-red-500 hover:underline"
            >
              Delete Hub And All Spokes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditHubModal;

const defaultHubShape = {
  id: "",
  hub: "",
  hubSlug: "",
  seoMeta: {
    seoTitle: "",
    seoDescription: "",
    seoKeyword: "",
    pageExcerpt: "",
  },
  spokes: [],
};
