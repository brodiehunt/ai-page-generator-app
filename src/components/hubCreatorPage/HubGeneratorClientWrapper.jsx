"use client";
import { useFieldArray, useForm } from "react-hook-form";
import FormInput from "../shared/Forms/FormInput";
import DashboardSectionHeader from "@/src/components/shared/dashboard/DashboardSectionHeader";
import FormButton from "../shared/Forms/FormButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { singleHubSchema } from "@/src/schemas";
import { Reorder } from "framer-motion";
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import FormError from "../shared/Forms/FormError";
import FormSuccess from "../shared/Forms/FormSuccess";
import ResponseModal from "../shared/ResponseModal";

const intitialFormState = {
  websiteName: "",
  websiteUrl: "",
  websiteContext: "",
  generateSeoMeta: true,
  hubName: "",
  hubUrl: "",
  highDaBackLinks: [],
  relatedSpokes: [],
  blogFormat: "wp block",
};
const initialHubSections = [];

const initialOtherHubSections = [
  "Introduction",
  "Key concepts section",
  "Benefits section",
  "Best practices section",
  "Future trends section",
  "Examples Section",
  "Conclusion section",
];

const HubGeneratorClientWrapper = () => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(singleHubSchema),
    defaultValues: intitialFormState,
  });
  const [otherSections, setOtherSections] = useState(initialOtherHubSections);
  const [buildSections, setBuildSections] = useState(initialHubSections);
  const [sectionsError, setSectionsError] = useState("");
  const [builderLoading, setBuilderLoading] = useState(false);
  const [builderError, setBuilderError] = useState("");
  const [builderSuccess, setBuilderSuccess] = useState("");
  const [xmlStringResponse, setXmlStringResponse] = useState("");

  console.log(errors);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "highDaBackLinks",
  });

  const {
    fields: relatedSpokes,
    append: appendSpoke,
    remove: removeSpoke,
  } = useFieldArray({
    control,
    name: "relatedSpokes",
  });
  console.log(builderLoading);

  const onSubmit = async (data) => {
    console.log("The Data", data);
    setSectionsError("");
    setBuilderError("");
    setBuilderSuccess("");
    setBuilderLoading(true);
    if (!buildSections.length) {
      setSectionsError(
        "You need some sections to make a blog! Click the green bubbles to add the sections you want"
      );
      return;
    }

    data.hubSections = buildSections;
    const stringData = JSON.stringify(data);
    try {
      const response = await fetch("/api/chatgpt/generateSingleHub", {
        method: "POST",
        body: stringData,
      });

      if (!response.ok) {
        throw new Error("Brothha ewww");
      }

      const { xmlString, message } = await response.json();
      setXmlStringResponse(xmlString);
      setBuilderSuccess(message);
    } catch (error) {
      setBuilderError(error.message);
    } finally {
      setBuilderLoading(false);
    }
  };

  const handleAddSection = (section) => {
    const newOtherSections = otherSections.filter((item) => section !== item);
    setOtherSections(newOtherSections);
    const newBuildSections = [...buildSections, section];
    setBuildSections(newBuildSections);
  };

  const handleRemoveSection = (section) => {
    const newBuildSections = buildSections.filter((item) => section !== item);
    setBuildSections(newBuildSections);
    const newOtherSections = [...otherSections, section];
    setOtherSections(newOtherSections);
  };

  return (
    <div>
      {xmlStringResponse && (
        <ResponseModal
          closeModal={() => setXmlStringResponse("")}
          title="Download Hub File"
          xmlString={xmlStringResponse}
        />
      )}
      {builderError && (
        <FormError
          message={builderError}
          closeNotification={() => setBuilderError("")}
        />
      )}
      {builderSuccess && (
        <FormSuccess
          message={builderError}
          closeNotification={() => setBuilderSuccess("")}
        >
          {builderSuccess}
        </FormSuccess>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* WEBSITE INFO SECTION */}
        <DashboardSectionHeader title="1. Website Info" />
        <div className="grid grid-cols-2 gap-4 mb-4">
          <FormInput
            register={register}
            name="websiteName"
            type="text"
            label="Website Name"
            placeholder=""
            isPending={false}
            error={errors.websiteName}
          />
          <FormInput
            register={register}
            name="websiteUrl"
            type="text"
            label="Website Url"
            placeholder=""
            isPending={false}
            error={errors.websiteUrl}
          />
        </div>
        <div className="">
          <FormInput
            register={register}
            name="websiteContext"
            type="textarea"
            label="Website/company Context"
            placeholder=""
            isPending={false}
            error={errors.websiteContext}
          />
        </div>
        {/* RELATED HUB INFO SECTION */}
        <DashboardSectionHeader title="2. Hub Info" />
        <div className="grid grid-cols-2 gap-4 mb-4">
          <FormInput
            register={register}
            name="hubName"
            type="text"
            label="Hub Title"
            placeholder="Eg: Search Engine Optimization"
            isPending={false}
            error={errors.hubName}
          />
          <FormInput
            register={register}
            name="hubUrl"
            type="text"
            label="Hub Slug"
            placeholder="Eg: search-engine-optimisation"
            isPending={false}
            error={errors.hubUrl}
          />
          <FormInput
            register={register}
            name="generateSeoMeta"
            type="checkbox"
            label="Generate Seo Meta"
            placeholder="Eg: Construction Business Owners"
            isPending={false}
          />
        </div>

        {/* BACKLINKS AND INTEGRATED LINKS SECTION */}
        <DashboardSectionHeader title="3. Backlinks and integrated links" />
        <div className="grid gap-4 mb-4">
          <div className="">
            <h3 className="font-medium mb-4">Integrated Spoke Links</h3>
            {relatedSpokes &&
              relatedSpokes.map((item, index) => {
                return (
                  <div key={item.id} className="flex items-end">
                    <div
                      key={item.id}
                      className="mb-2 grid flex-grow grid-cols-4 gap-2"
                    >
                      <FormInput
                        type="text"
                        placeholder="Eg: Why spokes are so helpful "
                        label={`Related Spoke ${index + 1} Title`}
                        name={`relatedSpokes.${index}.spokeTitle`}
                        register={register}
                        error={errors.relatedSpokes?.[index].spokeTitle}
                      />
                      <FormInput
                        type="text"
                        placeholder="Eg: https://cogdigital.com.au/spoke-slug"
                        label={`Related Spoke ${index + 1} Url`}
                        name={`relatedSpokes.${index}.spokeUrl`}
                        register={register}
                        error={errors.relatedSpokes?.[index].spokeUrl}
                      />
                      <FormInput
                        type="text"
                        placeholder=""
                        label={`Related Spoke ${index + 1} keyPhrase`}
                        name={`relatedSpokes.${index}.spokeKeyPhrase`}
                        register={register}
                        error={errors.relatedSpokes?.[index].spokeKeyPhrase}
                      />
                      <div className="flex items-end">
                        <FormInput
                          register={register}
                          name={`relatedSpokes.${index}.spokeIsLive`}
                          type="checkbox"
                          label="Is Spoke Live?"
                          placeholder="Eg: Construction Business Owners"
                          isPending={false}
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      className="group py-2 px-4 mb-3 rounded transition-all duration-200 text-custom-light"
                      onClick={() => removeSpoke(index)}
                    >
                      <FaRegTrashAlt className="w-5 h-5 text-gray-500 group-hover:text-red-500/80" />
                    </button>
                  </div>
                );
              })}
            <button
              type="button"
              className="group py-2 px-4 rounded transition-all duration-200 text-custom-light bg-custom-primary hover:bg-custom-primary/80"
              onClick={() =>
                appendSpoke({
                  spokeTitle: "",
                  spokeUrl: "",
                  spokeKeyPhrase: "",
                  spokeIsLive: false,
                })
              }
            >
              Add Related Spoke
            </button>
          </div>
          <div className="">
            <h3 className="font-medium mb-4">High DA Backlinks</h3>
            {fields &&
              fields.map((item, index) => {
                return (
                  <div key={item.id} className="mb-2 flex items-end">
                    <div className="flex-grow">
                      <FormInput
                        type="text"
                        label={`Backlink Url ${index + 1}`}
                        name={`highDaBackLinks.${index}`}
                        register={register}
                        error={errors.highDaBackLinks?.[index]}
                      />
                    </div>
                    <button
                      type="button"
                      className="group py-2 px-4 rounded transition-all duration-200 text-custom-light"
                      onClick={() => remove(index)}
                    >
                      <FaRegTrashAlt className="w-5 h-5 text-gray-500 group-hover:text-red-500/80" />
                    </button>
                  </div>
                );
              })}
            <button
              type="button"
              className="group py-2 px-4 rounded transition-all duration-200 text-custom-light bg-custom-primary hover:bg-custom-primary/80"
              onClick={() => append("")}
            >
              Add Backlink
            </button>
          </div>
        </div>

        {/* BLOG Section Layout */}
        <DashboardSectionHeader title="4. Hub Section Layout" />
        {sectionsError && (
          <FormError
            message={sectionsError}
            closeNotification={() => setSectionsError("")}
          />
        )}
        <div className="block text-left text-sm text-gray-500 dark:text-gray-300 mb-2">
          Available Sections
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {otherSections.map((section) => {
            return (
              <button
                className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full dark:bg-green-900 dark:text-green-300"
                key={section}
                type="button"
                onClick={() => handleAddSection(section)}
              >
                <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                {section}
              </button>
            );
          })}
        </div>
        <Reorder.Group values={buildSections} onReorder={setBuildSections}>
          {buildSections.map((section, index) => {
            return (
              <Reorder.Item value={section} key={section}>
                <div className="bg-white rounded-lg shadow mb-2 p-4 cursor-move flex justify-between">
                  <p>
                    <span className="font-medium">{index + 1}.</span> {section}
                  </p>

                  <button
                    onClick={() => handleRemoveSection(section)}
                    className="group text-sm font-medium p-2 py-1 rounded cursor-pointer text-custom-light"
                    type="button"
                  >
                    <FaRegTrashAlt className="w-5 h-5 text-gray-500 group-hover:text-red-500/80" />
                  </button>
                </div>
              </Reorder.Item>
            );
          })}
        </Reorder.Group>

        <DashboardSectionHeader title="5. Import format" />
        <div className="self-stretch">
          <fieldset className="h-full flex flex-col">
            <legend className="block text-left text-sm text-gray-500 dark:text-gray-300">
              Import Format
            </legend>
            <div className=" flex py-2.5 gap-2 mt-2 flex-grow-1">
              <div className="flex items-center">
                <input
                  id="format-option-1"
                  type="radio"
                  {...register("blogFormat")}
                  value="wp block"
                  className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="format-option-1"
                  className="block ms-2  text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  WP Blocks
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="format-option-2"
                  type="radio"
                  {...register("blogFormat")}
                  value="divi"
                  className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="format-option-2"
                  className="block ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Divi Builder
                </label>
              </div>
            </div>
          </fieldset>
        </div>
        <div className="mt-4">
          <FormButton isLoading={builderLoading}>Generate Hub</FormButton>
        </div>
      </form>
    </div>
  );
};

export default HubGeneratorClientWrapper;
