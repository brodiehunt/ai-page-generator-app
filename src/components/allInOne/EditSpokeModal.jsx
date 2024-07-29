import FormInput from "@/src/components/shared/Forms/FormInput";
import FormError from "@/src/components/shared/Forms/FormError";
import FormSuccess from "@/src/components/shared/Forms/FormSuccess";
import FormButton from "@/src/components/shared/Forms/FormButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SpokeSchema } from "@/src/schemas";
import { useState } from "react";

const EditSpokeModal = ({
  handleToggleSpokeEdit,
  spoke,
  hubID,
  handleDeleteSpoke,
  handleUpdateSpoke,
}) => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SpokeSchema),
    defaultValues: {
      ...spoke,
    },
  });

  const closeSuccess = () => {
    setSuccess("");
  };

  const closeError = () => {
    setError("");
  };

  const handleSaveSpoke = async (values) => {
    setError("");
    setSuccess("");
    try {
      handleUpdateSpoke(hubID, values);
      setSuccess("Success! Spoke Updated");
    } catch (error) {
      console.log(error);
      setError("Error! Spoke was not updated");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/30 z-20 flex items-center justify-center">
      <div className="relative p-4 w-full max-w-2xl h-full flex items-center justify-stretch">
        <div className="relative bg-white rounded-lg shadow max-h-[90%] min-w-[100%] overflow-scroll dark:bg-gray-700">
          <div className="flex items-center justify-between bg-custom-primary p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl text-left font-semibold text-custom-light dark:text-white">
              Edit Spoke: {spoke.title}
            </h3>
            <button
              type="button"
              className="end-2.5 text-custom-light bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => handleToggleSpokeEdit(null)}
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
          <form className="p-4" onSubmit={handleSubmit(handleSaveSpoke)}>
            <h3 className="font-medium text-lg mb-2 text-custom-primary">
              General
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-2 shaddow">
              <FormInput
                register={register}
                type="text"
                error={errors.title}
                name="title"
                label="Spoke Title"
              />
              <FormInput
                register={register}
                type="text"
                error={errors.slug}
                name="slug"
                label="Spoke Slug"
              />
            </div>
            <div className="mb-4">
              <FormInput
                register={register}
                type="textarea"
                error={errors.seoMeta?.theExcerpt}
                name="seoMeta.theExcerpt"
                label="Page Excerpt"
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
            </div>
            <h3 className="font-medium text-lg mb-2 text-custom-primary">
              SEO Matrix
            </h3>
            <div className="grid grid-cols-3 gap-4 mb-2">
              <FormInput
                register={register}
                type="text"
                error={errors.seoMatrix?.customerNeedVariant}
                name="seoMatrix.customerNeedVariant"
                label="Customer Need"
              />
              <FormInput
                register={register}
                type="text"
                error={errors.seoMatrix?.spokeVariant}
                name="seoMatrix.spokeVariant"
                label="Spoke Variant"
              />
              <FormInput
                register={register}
                type="text"
                error={errors.seoMatrix?.targetAudience}
                name="seoMatrix.targetAudience"
                label="Target Audience"
              />
            </div>

            <div className="flex gap-4 py-4 pb-0 justify-end">
              <button
                type="button"
                className="group py-2 px-4 rounded transition-all duration-200 bg-red-500 hover:bg-red-500/80 text-custom-light"
                onClick={() => reset()}
              >
                Reset Fields
              </button>

              <FormButton isLoading={false}>Save Spoke</FormButton>
            </div>
          </form>
          <div className="p-4 flex justify-center">
            <button
              onClick={() => {
                handleDeleteSpoke(hubID, spoke.id);
                handleToggleSpokeEdit(null);
              }}
              className="text-red-500 hover:underline"
            >
              Delete Spoke
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSpokeModal;
