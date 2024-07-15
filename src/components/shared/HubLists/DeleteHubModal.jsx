"use client";
import revalidateTag from "@/src/actions/revalidateTag";
// import { auth } from "@/auth";
import { useState, useTransition } from "react";
import FormError from "@/src/components/shared/Forms/FormError";
import FormSuccess from "@/src/components/shared/Forms/FormSuccess";

const DeleteHubModal = ({
  handleModalToggle,
  websiteId,
  hubId,
  hubName,
  userId,
}) => {
  const [error, setError] = useState("");
  const handleDeleteHub = async (event) => {
    event.preventDefault();
    setError("");
    const form = event.target;
    const removeFromMatrix = form.elements.removeFromMatrix.checked;
    console.log(websiteId, hubId, removeFromMatrix);
    try {
      if (!hubId || !websiteId) {
        throw new Error("Can not delete resource.");
      }

      const response = await fetch(
        `/api/websites/${websiteId}/hubs/${hubId}?removeFromMatrix=${removeFromMatrix}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Wesbite could not be deleted.");
      }
      console.log(response);
      revalidateTag("hubList");
      handleModalToggle();
    } catch (error) {
      setError(error.message);
      console.log("do something error", error.message);
    }
  };
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black/20 z-20 flex items-center justify-center whitespace-normal">
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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

          <div className="p-4 md:p-5 text-center">
            <FormError message={error} />
            <svg
              className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>

            <h3 className="mb-2 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete {hubName}?
            </h3>
            <p className="mb-5 text-gray-500">
              This will permantly delete all blogs linked to this hub, and the
              hub itself from your website.
            </p>
            <form onSubmit={handleDeleteHub}>
              <div className="flex items-start mb-6">
                <div className="flex items-center h-5">
                  <input
                    id="removeFromMatrix"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                  />
                </div>
                <label
                  htmlFor="removeFromMatrix"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Remove the {hubName} hub from SEO matrix?
                  {/* <span className="text-custom-primary">{websiteName}</span>. */}
                </label>
              </div>
              <button
                type="submit"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
              >
                Yes, I'm sure
              </button>
              <button
                type="button"
                onClick={handleModalToggle}
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-custom-primary focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                No, cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteHubModal;
