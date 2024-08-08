import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { seoMatrixSchema } from "@/src/schemas";
import { websiteInfoSchema } from "@/src/schemas";
import FormError from "@/src/components/shared/Forms/FormError";
import FormSuccess from "@/src/components/shared/Forms/FormSuccess";
import FormInput from "../shared/Forms/FormInput";
import FormButton from "../shared/Forms/FormButton";
import DashboardSectionHeader from "../shared/dashboard/DashboardSectionHeader";
import { v4 as uuid } from "uuid";

function transformResponseToStateArray(responseArray, websiteName) {
  responseArray.forEach((hubObj) => {
    hubObj.id = uuid();
    hubObj.seoMeta.seoTitle = `${websiteName} | ${hubObj.hub}`;
    hubObj.spokes.forEach((spoke) => {
      spoke.id = uuid();
      spoke.regenerate = false;
      spoke.seoMeta.seoTitle = `${websiteName} | ${spoke.title}`;
    });
  });

  return responseArray;
}

const SEOMatrixManualInput = ({
  seoMatrix,
  setHubsAndSpokes,
  websiteInfo,
  setWebsiteInfoErrors,
  extraInfoLongtail,
}) => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(seoMatrixSchema),
    defaultValues: { ...seoMatrix },
  });

  useEffect(() => {
    reset(seoMatrix);
  }, [seoMatrix]);

  const onSubmit = async (data) => {
    setSuccess("");
    setError("");
    setIsLoading(true);

    try {
      setWebsiteInfoErrors({
        websiteName: "",
        websiteUrl: "",
        formatType: "",
        tone: "",
        blogBaseUrl: "",
        blogsPerHub: "",
        companyContext: "",
      });

      websiteInfoSchema.parse(websiteInfo);
    } catch (error) {
      const newErrorsObject = {};
      error.issues.forEach((errorObj) => {
        newErrorsObject[errorObj.path] = errorObj.message;
      });

      setWebsiteInfoErrors((previousErrors) => {
        return {
          ...previousErrors,
          ...newErrorsObject,
        };
      });

      setIsLoading(false);

      return null;
    }

    try {
      const postObj = {
        matrixData: data,
        configData: {
          blogsPerHub: websiteInfo.blogsPerHub,
          websiteContext: websiteInfo.websiteContext,
          extraInfoLongtail: extraInfoLongtail,
        },
      };
      const stringData = JSON.stringify(postObj);

      const response = await fetch("/api/chatgpt/generateLongTail", {
        method: "POST",
        body: stringData,
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error);
      }

      const responseData = await response.json();

      const transformedArray = transformResponseToStateArray(
        responseData.data,
        websiteInfo.websiteName
      );

      setSuccess("Longtails generated! Check below for output");
      setHubsAndSpokes(transformedArray);
    } catch (error) {
      console.log("Error", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-8 col-span-2 pl-4 relative">
      <p className="absolute top-[50%] -right-12 translate-y-[-50%] font-bold">
        OR
      </p>
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
        </div>
        <FormButton extraClasses="w-fit" isLoading={isLoading}>
          Create Longtails
        </FormButton>
      </form>
    </div>
  );
};

export default SEOMatrixManualInput;
