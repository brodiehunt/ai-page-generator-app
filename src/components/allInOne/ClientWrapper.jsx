"use client";
import { useState } from "react";
import SEOMatrixFileUpload from "./SEOMatrixFileUpload";
import SEOMatrixManualInput from "./SEOMatrixManualInput";
import GeneratedSpokesPreview from "./GeneratedSpokesPreview";
import WebsiteContextInputs from "./WebsiteContextInputs";
import { websiteInfoSchema, highDaBackLinksSchema } from "@/src/schemas";
import Button from "../shared/Button";
import ResponseModal from "../shared/ResponseModal";
import { v4 as uuidv4 } from "uuid";
import { seoMatrixSchema } from "@/src/schemas";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaRegTrashAlt,
} from "react-icons/fa";
import FormError from "../shared/Forms/FormError";
import { LoadingSpinner } from "../shared/Forms/FormButton";

const initialWebsiteInfo = {
  websiteName: "",
  websiteUrl: "",
  formatType: "wp block",
  tone: "lighthearted",
  blogBaseUrl: "",
  blogsPerHub: "",
  websiteContext: "",
};
const initialWebsiteInfoErrors = {
  websiteName: "",
  websiteUrl: "",
  formatType: "",
  tone: "",
  blogBaseUrl: "",
  blogsPerHub: "",
  websiteContext: "",
};

const initialSeoMatrix = {
  hubs: "",
  spokeVariants: "",
  customerNeedVariants: "",
  fillerWords: "",
  targetAudience: "",
};

// Add uuid's to the hubs and spokes returned from the longtail generator api call
// Also add regenerate property and seo title property to each spoke
function transformResponseToStateArray(responseArray, websiteName) {
  responseArray.forEach((hubObj) => {
    hubObj.id = uuidv4();

    hubObj.spokes.forEach((spoke) => {
      spoke.id = uuidv4();
      spoke.regenerate = false;
      spoke.seoMeta.seoTitle = `${websiteName} | ${spoke.title}`;
    });
  });

  return responseArray;
}

const ClientWrapper = () => {
  const [hubsAndSpokes, setHubsAndSpokes] = useState([]);
  const [websiteInfo, setWebsiteInfo] = useState(initialWebsiteInfo);
  const [websiteInfoErrors, setWebsiteInfoErrors] = useState(
    initialWebsiteInfoErrors
  );
  const [seoMatrix, setSeoMatrix] = useState(initialSeoMatrix);
  const [isBuilderLoading, setIsBuilderLoading] = useState(false);
  const [xmlStringResponse, setXmlStringResponse] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [highDaBackLinks, setHighDaBackLinks] = useState([]);
  const [highDaBackLinkErrors, setHighDaBackLinkErrors] = useState("");
  const [regenerateSpokeCount, setRegenerateSpokeCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Website info change handler - used in websiteContextInputs
  const handleWebsiteInfoChange = (event) => {
    const { name, value } = event.target;
    setWebsiteInfo({ ...websiteInfo, [name]: value });
  };

  // Update hub handler - used on 'save' in edit hub modal
  const handleUpdateHub = (newHub) => {
    const newHubsAndSpokes = hubsAndSpokes.map((hub) => {
      if (newHub.id === hub.id) return newHub;
      return hub;
    });

    setHubsAndSpokes(newHubsAndSpokes);
  };

  // Used on edit hub modal and trash icon button in GeneratedSpokesPreview (hubTab)
  const handleDeleteHub = (hubID) => {
    const newObj = [...hubsAndSpokes].filter((hubObj) => {
      return hubObj.id !== hubID;
    });

    setHubsAndSpokes(newObj);
  };

  // Used in edit spoke modal on 'save' click and in hubtab to update 'regenerate' property
  const handleUpdateSpoke = (hubID, newSpoke) => {
    const newHubsAndSpokes = hubsAndSpokes.map((hub) => {
      if (hubID !== hub.id) return hub;

      const newSpokesArray = hub.spokes.map((spoke) => {
        if (spoke.id !== newSpoke.id) return spoke;
        return newSpoke;
      });
      return { ...hub, spokes: newSpokesArray };
    });

    setHubsAndSpokes(newHubsAndSpokes);
  };

  // Delete spoke button in edit spoke modal, edit hub modal, and in generated spoke preview component.
  const handleDeleteSpoke = (hubID, spokeID) => {
    const hub = hubsAndSpokes.find((hubObj) => hubObj.id === hubID);

    if (!hub) {
      return null;
    }
    const spokesCopy = [...hub.spokes];

    if (!spokesCopy) return null;

    const newSpokes = spokesCopy.filter((spoke) => spoke.id !== spokeID);

    const newHubsAndSpokes = hubsAndSpokes.map((hubObj) => {
      if (hubObj.id === hubID) {
        return { ...hubObj, spokes: newSpokes };
      }
      return { ...hubObj };
    });

    setHubsAndSpokes(newHubsAndSpokes);
  };

  // Backlink onChange event handler
  const handleChangeBackLink = (event, index) => {
    console.log("hello");
    const newHighDaBackLinks = highDaBackLinks.map((backLink, currIndex) => {
      if (currIndex !== index) return backLink;
      return { ...backLink, url: event.target.value };
    });
    setHighDaBackLinks(newHighDaBackLinks);
  };

  // Add a new backlink to highDaBackLinks State
  const handleAddBackLink = () => {
    setHighDaBackLinks([...highDaBackLinks, { id: uuidv4(), url: "" }]);
  };

  // Delete a backlink from highDaBackLinks state
  const handleDeleteBackLink = (index) => {
    const filteredLinks = highDaBackLinks.filter(
      (item, currIndex) => index !== currIndex
    );
    setHighDaBackLinks(filteredLinks);
  };

  // Regenerate new spokes event handler.
  const handleRegenerateSpokes = async () => {
    setIsLoading(true);
    let data;
    // Validate the values stored is seoMatrix state object
    try {
      data = seoMatrixSchema.parse(seoMatrix);
      console.log(data);
    } catch (error) {
      setIsLoading(false);
      return null;
    }
    const hubsAndSpokeCount = {};

    // Loop through hubs and spokes state value, and count the number of spokes where the regenerate property is true.
    hubsAndSpokes.forEach((hub) => {
      hub.spokes.forEach((spoke) => {
        if (spoke.regenerate) {
          if (hubsAndSpokeCount.hasOwnProperty(hub.hub)) {
            hubsAndSpokeCount[hub.hub] += 1;
          } else {
            hubsAndSpokeCount[hub.hub] = 1;
          }
        }
      });
    });

    // Add this new object to data object hubs property (parsed seoMatrix state variable)
    data.hubs = hubsAndSpokeCount;

    try {
      const postObj = {
        matrixData: data,
        configData: {
          websiteContext: websiteInfo.websiteContext,
        },
      };
      const stringData = JSON.stringify(postObj);

      // Send API Request to api to regenerate the correct amount of spokes for each
      const response = await fetch("/api/chatgpt/regenerateLongTails", {
        method: "POST",
        body: stringData,
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error);
      }

      const responseData = await response.json();

      /// Format content returned from api (Add uuids etc)
      const transformedArray = transformResponseToStateArray(
        responseData.data,
        websiteInfo.websiteName
      );

      // create copy of hubsAndSpokes array and merge returned spokes from api into correlating hub in state
      const newHubsAndSpokes = [...hubsAndSpokes];
      const addRegeneratedSpokes = newHubsAndSpokes.map((hub) => {
        const index = transformedArray.findIndex(
          (item) => item.hub === hub.hub
        );
        if (index >= 0) {
          hub.spokes = [...hub.spokes, ...transformedArray[index].spokes];
        }
        return hub;
      });

      setHubsAndSpokes(addRegeneratedSpokes);
      // Delete the spokes that were just 'replaced'
      setHubsAndSpokes((prevState) =>
        prevState.map((hub) => ({
          ...hub,
          spokes: hub.spokes.filter((spoke) => !spoke.regenerate),
        }))
      );
      setRegenerateSpokeCount(0);
    } catch (error) {
      console.log("Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageGeneration = async () => {
    // Validate that the user has entered required extra info.
    let linksToSend;
    try {
      highDaBackLinksSchema.parse(highDaBackLinks);
      linksToSend = highDaBackLinks.map((backlink) => backlink.url);
    } catch (error) {
      console.log(error.issues);
      setHighDaBackLinkErrors("One of the links is not a valid url");
      return;
    }
    try {
      setWebsiteInfoErrors(initialWebsiteInfoErrors);

      websiteInfoSchema.parse(websiteInfo);
    } catch (error) {
      const newErrorsObject = {};
      error.issues.forEach((errorObj) => {
        newErrorsObject[errorObj.path] = errorObj.message;
      });

      setWebsiteInfoErrors({
        ...websiteInfoErrors,
        ...newErrorsObject,
      });
      return null;
    }

    if (!hubsAndSpokes || !hubsAndSpokes.length) {
      alert(
        "You don't have any spokes to generate?! Generate some longtails first"
      );
      return;
    }

    if (!hubsAndSpokes[0].spokes || !hubsAndSpokes[0].spokes.length) {
      alert("You don't have any spokes to generate in your hub.");
      return;
    }

    try {
      setIsBuilderLoading(true);
      const bodyData = {
        postsData: hubsAndSpokes,
        websiteData: { ...websiteInfo, highDaBackLinks: linksToSend },
      };
      console.log(bodyData);

      const stringData = JSON.stringify(bodyData);

      const response = await fetch("/api/chatgpt/allInOne", {
        method: "POST",
        body: stringData,
      });

      if (!response.ok) {
        throw new Error("Brothha ewww");
      }

      const { xmlString, responses } = await response.json();
      console.log(xmlString);
      setXmlStringResponse(xmlString);
      setResponseData(responses);
    } catch (error) {
      console.log(error);
    } finally {
      setIsBuilderLoading(false);
    }
    // Validate That there is at least one hub + spoke
  };

  return (
    <div className="">
      {xmlStringResponse && (
        <ResponseModal
          xmlString={xmlStringResponse}
          closeModal={() => setXmlStringResponse("")}
          title="Download your hubs and spokes"
        >
          {responseData &&
            responseData.map((item) => {
              console.log(item);
              if (item.status === "fulfilled") {
                return (
                  <div
                    key={item.value.title}
                    className="flex gap-2 items-center px-2 py-1 rounded-lg mb-2 bg-green-500/30 text-xs"
                  >
                    <FaCheckCircle className="w-4 h-5 text-green-500 flex-shrink-0" />
                    {item.value.title}
                  </div>
                );
              } else {
                return (
                  <div
                    key={item.reason.title}
                    className="flex gap-2 items-center px-2 py-1 rounded-lg mb-2 bg-red-500/30 text-xs"
                  >
                    <FaExclamationCircle className="w-4 h-5 text-red-500 flex-shrink-0" />
                    {item.reason.title}
                  </div>
                );
              }
            })}
        </ResponseModal>
      )}

      <WebsiteContextInputs
        websiteInfo={websiteInfo}
        handleWebsiteInfoChange={handleWebsiteInfoChange}
        websiteInfoErrors={websiteInfoErrors}
      />
      <h3 className="font-medium mb-4">High DA Backlinks</h3>
      {
        <FormError
          message={highDaBackLinkErrors}
          closeNotification={() => setHighDaBackLinkErrors("")}
        />
      }
      {highDaBackLinks &&
        highDaBackLinks.map((item, index) => {
          return (
            <div key={item.id} className="mb-2 flex items-end">
              <div className="flex-grow">
                <div>
                  <>
                    <label
                      htmlFor={`highDaBackLinks.${index}`}
                      className="block text-left text-sm text-gray-500 dark:text-gray-300"
                    >
                      {`Backlink Url ${index + 1}`}
                    </label>
                    <div className="relative flex items-center mt-2">
                      <input
                        id={`highDaBackLinks.${index}`}
                        type="text"
                        name={`highDaBackLinks.${index}`}
                        value={highDaBackLinks[index].url}
                        onChange={(event) => handleChangeBackLink(event, index)}
                        placeholder="Backlink url"
                        className={`block w-full py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg px-3 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 ${
                          false &&
                          "border-red-400 focus:border-red-400 focus:outline-none focus:ring focus:ring-red-300 "
                        }`}
                      />
                    </div>
                    {false && (
                      <p className="mt-3 text-xs text-red-400" role="alert">
                        {error.message}
                      </p>
                    )}
                  </>
                </div>
              </div>
              <button
                type="button"
                className="group py-2 px-4 rounded transition-all duration-200 text-custom-light"
                onClick={() => handleDeleteBackLink(index)}
              >
                <FaRegTrashAlt className="w-5 h-5 text-gray-500 group-hover:text-red-500/80" />
              </button>
            </div>
          );
        })}
      <button
        type="button"
        className="group py-2 px-4 rounded transition-all duration-200 text-custom-light bg-custom-primary hover:bg-custom-primary/80"
        onClick={handleAddBackLink}
      >
        Add Backlink
      </button>
      <div className="grid grid-cols-3 gap-20 mb-4">
        <SEOMatrixManualInput
          setSeoMatrix={setSeoMatrix}
          seoMatrix={seoMatrix}
          setHubsAndSpokes={setHubsAndSpokes}
          websiteInfo={websiteInfo}
          setWebsiteInfoErrors={setWebsiteInfoErrors}
        />
        <SEOMatrixFileUpload setSeoMatrix={setSeoMatrix} />
      </div>
      <GeneratedSpokesPreview
        hubsAndSpokes={hubsAndSpokes}
        handleDeleteHub={handleDeleteHub}
        handleDeleteSpoke={handleDeleteSpoke}
        handleUpdateSpoke={handleUpdateSpoke}
        handleUpdateHub={handleUpdateHub}
        setRegenerateSpokeCount={setRegenerateSpokeCount}
        regenerateSpokeCount={regenerateSpokeCount}
      />
      {hubsAndSpokes.length > 0 && (
        <div className="flex gap-2">
          {regenerateSpokeCount > 0 && (
            <Button
              isLoading={isLoading || isBuilderLoading}
              handleClick={handleRegenerateSpokes}
            >
              {isLoading ? <LoadingSpinner /> : ""}
              Regenerate Selected Spokes
            </Button>
          )}
          <Button
            isLoading={isLoading || isBuilderLoading}
            handleClick={handlePageGeneration}
          >
            {isBuilderLoading ? <LoadingSpinner /> : ""}
            Generate Import File
          </Button>
          {isBuilderLoading && <div>Im Loading bruh...</div>}
        </div>
      )}
    </div>
  );
};

export default ClientWrapper;
