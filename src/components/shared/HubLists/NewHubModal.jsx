"use client";
import FormButton from "@/src/components/shared/Forms/FormButton";
import FormInput from "@/src/components/shared/Forms/FormInput";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewHubSchema } from "@/src/schemas";
import FormError from "@/src/components/shared/Forms/FormError";
import FormSuccess from "@/src/components/shared/Forms/FormSuccess";
import revalidateTag from "@/src/actions/revalidateTag";

const NewHubModalForm = ({
  handleModalToggle,
  websiteName,
  websiteId,
  userId,
}) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(NewHubSchema),
    defaultValues: {
      name: "",
      topic: "",
      addToMatrix: "",
    },
  });
  console.log(userId);
  const onSubmit = async (values) => {
    console.log("do something", values);
    setError("");
    setSuccess("");
    console.log(values);
    try {
      const response = await fetch(
        `/api/websites/${websiteId}/hubs?userId=${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create website");
      }
      const data = await response.json();
      console.log(data);
      reset();
      setSuccess("Hub created!");
      revalidateTag("hubList");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black/20 z-20 flex items-center justify-center">
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl text-left font-semibold text-gray-900 dark:text-white">
              Create a new hub for {websiteName}
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

          <div className="p-4 md:p-5">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FormError message={error} />
              <FormSuccess>{success}</FormSuccess>
              <FormInput
                register={register}
                name="name"
                error={errors.name}
                label="Hub Name"
                type="text"
                placeholder="Digital Marketing Hub"
                isPending={false}
              />
              <FormInput
                register={register}
                name="topic"
                error={errors.url}
                label="Hub Topic"
                type="text"
                placeholder="Digital Marketing"
                isPending={false}
              />
              <FormInput
                register={register}
                name="addToMatrix"
                error={errors.addToMatrix}
                label={`Add Hub to SEO matrix for ${
                  websiteName ? websiteName : ""
                }`}
                type="checkbox"
                isPending={false}
              />
              <FormButton extraClasses="w-full">Create New</FormButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHubModalForm;
