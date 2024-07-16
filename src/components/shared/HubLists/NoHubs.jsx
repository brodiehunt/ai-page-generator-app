import Link from "next/link";
import NewHubModalButton from "@/src/components/shared/HubLists/NewHubModalButton";

const NoHubsAvailable = ({ websiteName, websiteId, userId }) => {
  return (
    <div className="flex items-center justify-center text-center border rounded-lg h-70 dark:border-gray-700 w-full bg-custom-light">
      <div className="flex flex-col justify-stretch w-full px-4 py-4 mx-auto">
        <div className="p-3 mx-auto text-blue-500 bg-blue-100 rounded-full dark:bg-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
        <h1 className="mt-3 text-lg text-gray-800 dark:text-white">
          No Hubs Found
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          You currently have no hubs created and linked to your website{" "}
          <span className="font-medium">{websiteName ? websiteName : ""}</span>.
        </p>
        <div className="flex items-center mt-4 sm:mx-auto gap-x-3">
          <Link
            className="w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
            href="/dashboard"
          >
            Go to Dashboard
          </Link>
          <NewHubModalButton
            websiteName={websiteName}
            websiteId={websiteId}
            userId={userId}
          >
            Create New Hub
          </NewHubModalButton>
        </div>
      </div>
    </div>
  );
};

export default NoHubsAvailable;
