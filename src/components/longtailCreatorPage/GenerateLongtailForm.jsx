import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateLongtailFormSchema } from "@/src/schemas";
import FormError from "@/src/components/shared/Forms/FormError";
import FormSuccess from "@/src/components/shared/Forms/FormSuccess";
import FormInput from "../shared/Forms/FormInput";
import FormButton from "../shared/Forms/FormButton";
import DashboardSectionHeader from "../shared/dashboard/DashboardSectionHeader";
import { v4 as uuid } from "uuid";

function transformResponseToStateArray(responseArray) {
  responseArray.forEach((hubObj) => {
    hubObj.id = uuid();
    hubObj.spokes.forEach((spoke) => {
      spoke.id = uuid();
    });
  });

  return responseArray;
}

const GenerateLongtailForm = ({ seoMatrix, setHubsAndSpokes }) => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(generateLongtailFormSchema),
    defaultValues: { ...seoMatrix, websiteContext: "", blogsPerHub: "1" },
  });

  useEffect(() => {
    reset({ ...getValues(), ...seoMatrix });
  }, [seoMatrix]);

  const onSubmit = async (data) => {
    setSuccess("");
    setError("");
    setIsLoading(true);

    try {
      const postData = {
        matrixData: {
          hubs: data.hubs,
          spokeVariants: data.spokeVariants,
          customerNeedVariants: data.customerNeedVariants,
          fillerWords: data.fillerWords,
          targetAudience: data.targetAudience,
        },
        configData: {
          blogsPerHub: data.blogsPerHub,
          websiteContext: data.websiteContext,
        },
      };

      const stringData = JSON.stringify(postData);

      const response = await fetch("/api/chatgpt/generateLongTailNames", {
        method: "POST",
        body: stringData,
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error);
      }

      const responseData = await response.json();

      const transformedArray = transformResponseToStateArray(responseData.data);
      setSuccess("Longtails generated! Check below for output");
      setHubsAndSpokes(transformedArray);
      console.log("The hubs and blogs", transformedArray);
    } catch (error) {
      console.log("Error", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <DashboardSectionHeader title="Manual Matrix Input"></DashboardSectionHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {success && <FormSuccess message={success} />}
        {error && <FormError message={error} />}
        <div className="grid grid-cols-2 gap-8">
          <FormInput
            register={register}
            name="hubs"
            error={errors.hubs}
            label="Hubs"
            type="textarea"
            placeholder=""
            isPending={isLoading}
          />
          <FormInput
            register={register}
            name="spokeVariants"
            error={errors.spokeVariants}
            label="Spoke Variants"
            type="textarea"
            placeholder=""
            isPending={isLoading}
          />
        </div>
        <div className="grid grid-cols-2 gap-8">
          <FormInput
            register={register}
            name="customerNeedVariants"
            error={errors.customerNeedVariants}
            label="Customer Need Variants"
            type="textarea"
            placeholder=""
            isPending={isLoading}
          />
          <FormInput
            register={register}
            name="fillerWords"
            error={errors.fillerWords}
            label="Filler Words"
            type="textarea"
            placeholder=""
            isPending={isLoading}
          />
        </div>
        <div className="grid grid-cols-2 gap-8">
          <FormInput
            register={register}
            name="targetAudience"
            error={errors.targetAudience}
            label="Target Audience"
            type="textarea"
            placeholder=""
            isPending={isLoading}
          />
          <div>
            <label
              htmlFor="blogsPerHub"
              className="block text-left text-sm text-gray-500 dark:text-gray-300"
            >
              Blogs Per Hub
            </label>
            <div className="relative flex items-center mt-2">
              <input
                type="number"
                {...register("blogsPerHub")}
                max="10"
                min="1"
                disabled={isLoading}
                className={`block w-full py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg px-3 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 ${
                  errors.blogsPerHub &&
                  "border-red-400 focus:border-red-400 focus:outline-none focus:ring focus:ring-red-300 "
                }`}
              />
            </div>
            {errors.blogsPerHub && (
              <p className="mt-3 text-xs text-red-400" role="alert">
                {errors.blogsPerHub.message}
              </p>
            )}
          </div>
        </div>
        <div>
          <FormInput
            register={register}
            name="websiteContext"
            error={errors.websiteContext}
            label="Website Info"
            type="textarea"
            placeholder="Provide some context about the company/website these blogs or hubs will be used on."
            isPending={isLoading}
          />
        </div>
        <FormButton extraClasses="w-fit" isLoading={isLoading}>
          Create Longtails
        </FormButton>
      </form>
    </div>
  );
};

export default GenerateLongtailForm;
