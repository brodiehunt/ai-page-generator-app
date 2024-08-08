import { useEffect, useRef } from "react";
import DashboardSectionHeader from "../shared/dashboard/DashboardSectionHeader";
const WebsiteContextInputs = ({
  websiteInfo,
  handleWebsiteInfoChange,
  websiteInfoErrors,
}) => {
  const websiteNameRef = useRef(null);
  const websiteUrlRef = useRef(null);
  const blogBaseUrlRef = useRef(null);
  const blogsPerHubRef = useRef(null);
  const websiteContextRef = useRef(null);

  // Focus the first input with an error
  useEffect(() => {
    if (websiteInfoErrors.websiteName) {
      websiteNameRef.current?.focus();
    } else if (websiteInfoErrors.websiteUrl) {
      websiteUrlRef.current?.focus();
    } else if (websiteInfoErrors.baseBlogUrl) {
      blogBaseUrlRef.current?.focus();
    } else if (websiteInfoErrors.blogsPerHub) {
      blogsPerHubRef.current?.focus();
    } else if (websiteInfoErrors.websiteContext) {
      websiteContextRef.current?.focus();
    }
  }, [websiteInfoErrors]);

  return (
    <div className="mb-8">
      <DashboardSectionHeader title="Website Info"></DashboardSectionHeader>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* WEBSITE NAME */}
        <div>
          <label
            htmlFor="websiteName"
            className="block text-left text-sm text-gray-500 dark:text-gray-300"
          >
            Website Name
          </label>
          <div className="relative flex items-center mt-2">
            <input
              id="websiteName"
              type="text"
              name="websiteName"
              ref={websiteNameRef}
              value={websiteInfo.websiteName}
              onChange={handleWebsiteInfoChange}
              placeholder="COG Digital"
              className={`block w-full py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg px-3 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 ${
                websiteInfoErrors.websiteName &&
                "border-red-400 focus:border-red-400 focus:outline-none focus:ring focus:ring-red-300 "
              }`}
            />
          </div>
          {websiteInfoErrors.websiteName && (
            <p className="mt-3 text-xs text-red-400" role="alert">
              {websiteInfoErrors.websiteName}
            </p>
          )}
        </div>
        {/* WEBSITE URL */}
        <div>
          <label
            htmlFor="websiteUrl"
            className="block text-left text-sm text-gray-500 dark:text-gray-300"
          >
            Website Url
          </label>
          <div className="relative flex items-center mt-2">
            <input
              id="websiteUrl"
              type="text"
              name="websiteUrl"
              ref={websiteUrlRef}
              value={websiteInfo.websiteUrl}
              onChange={handleWebsiteInfoChange}
              placeholder="https://cogdigital.com.au"
              className={`block w-full py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg px-3 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 ${
                websiteInfoErrors.websiteUrl &&
                "border-red-400 focus:border-red-400 focus:outline-none focus:ring focus:ring-red-300 "
              }`}
            />
          </div>
          {websiteInfoErrors.websiteUrl && (
            <p className="mt-3 text-xs text-red-400" role="alert">
              {websiteInfoErrors.websiteUrl}
            </p>
          )}
        </div>
        {/* TONE OF VOICE */}
        <div className="self-stretch">
          <fieldset className="h-full flex flex-col">
            <legend className="block text-left text-sm text-gray-500 dark:text-gray-300">
              Tone of Voice
            </legend>
            <div className=" flex py-2.5 gap-2 mt-2 flex-grow-1">
              <div className="flex items-center">
                <input
                  id="tone-option-1"
                  type="radio"
                  name="tone"
                  value="lighthearted"
                  onChange={handleWebsiteInfoChange}
                  className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                  checked={websiteInfo.tone === "lighthearted"}
                />
                <label
                  htmlFor="tone-option-1"
                  className="block ms-2  text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Lighthearted
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="tone-option-2"
                  type="radio"
                  name="tone"
                  value="formal"
                  onChange={handleWebsiteInfoChange}
                  className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                  checked={websiteInfo.tone === "formal"}
                />
                <label
                  htmlFor="tone-option-2"
                  className="block ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Formal
                </label>
              </div>
            </div>
          </fieldset>
        </div>
        {/* FORMAT OPTIONS */}
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
                  name="formatType"
                  value="wp block"
                  onChange={handleWebsiteInfoChange}
                  className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                  checked={websiteInfo.formatType === "wp block"}
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
                  name="formatType"
                  value="divi"
                  onChange={handleWebsiteInfoChange}
                  className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                  checked={websiteInfo.formatType === "divi"}
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
        {/* BLOG BASE URL */}
        <div>
          <label
            htmlFor="blogBaseUrl"
            className="block text-left text-sm text-gray-500 dark:text-gray-300"
          >
            Blog Base Url
          </label>
          <div className="relative flex items-center mt-2">
            <input
              id="blogBaseUrl"
              type="text"
              name="blogBaseUrl"
              ref={blogBaseUrlRef}
              value={websiteInfo.blogBaseUrl}
              onChange={handleWebsiteInfoChange}
              placeholder="https://cogdigital.com.au/news"
              className={`block w-full py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg px-3 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 ${
                websiteInfoErrors.blogBaseUrl &&
                "border-red-400 focus:border-red-400 focus:outline-none focus:ring focus:ring-red-300 "
              }`}
            />
          </div>
          {websiteInfoErrors.blogBaseUrl && (
            <p className="mt-3 text-xs text-red-400" role="alert">
              {websiteInfoErrors.blogBaseUrl}
            </p>
          )}
        </div>
        {/* NUMBER OF BLOGS PER HUB */}
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
              name="blogsPerHub"
              id="blogsPerHub"
              ref={blogsPerHubRef}
              value={websiteInfo.blogsPerHub}
              max="10"
              min="1"
              onChange={handleWebsiteInfoChange}
              className={`block w-full py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg px-3 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 ${
                websiteInfoErrors.blogsPerHub &&
                "border-red-400 focus:border-red-400 focus:outline-none focus:ring focus:ring-red-300 "
              }`}
            />
          </div>
          {websiteInfoErrors.blogsPerHub && (
            <p className="mt-3 text-xs text-red-400" role="alert">
              {websiteInfoErrors.blogsPerHub}
            </p>
          )}
        </div>
      </div>

      {/* EXTRA COMPANY / ORG CONTEXT */}
      <div>
        <label
          htmlFor="websiteContext"
          className="block text-left text-sm text-gray-500 dark:text-gray-300"
        >
          Company Context
        </label>

        <div className="relative flex items-center mt-2">
          <textarea
            name="websiteContext"
            value={websiteInfo.websiteContext}
            onChange={handleWebsiteInfoChange}
            rows="4"
            ref={websiteContextRef}
            id="websiteContext"
            placeholder="COG digital are accomplished marketing experts with over 20 years of experience. COG Digital's expertise lies in building brands and executing clever marketing for brandins and small businesses for a diverse client base, with a specialization in Australian small business. COG Digital's clients include executives, entreprenous, and thought leaders who seek to inspire and engage their audiences on global platforms."
            className={`block w-full py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg px-3 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 text-xs ${
              websiteInfoErrors.websiteContext &&
              "border-red-400 focus:border-red-400 focus:outline-none focus:ring focus:ring-red-300 "
            }`}
          />
        </div>
        {websiteInfoErrors.websiteContext && (
          <p className="mt-3 text-xs text-red-400" role="alert">
            {websiteInfoErrors.websiteContext}
          </p>
        )}
      </div>
    </div>
  );
};

export default WebsiteContextInputs;
