"use client";
import { useState } from "react";
import SEOMatrixFileUpload from "./SEOMatrixFileUpload";
import SEOMatrixManualInput from "./SEOMatrixManualInput";
import GeneratedSpokesPreview from "./GeneratedSpokesPreview";
import WebsiteContextInputs from "./WebsiteContextInputs";
import { websiteInfoSchema } from "@/src/schemas";
import Button from "../shared/Button";

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

const ClientWrapper = () => {
  const [hubsAndSpokes, setHubsAndSpokes] = useState([]);
  const [websiteInfo, setWebsiteInfo] = useState(initialWebsiteInfo);
  const [websiteInfoErrors, setWebsiteInfoErrors] = useState(
    initialWebsiteInfoErrors
  );
  const [seoMatrix, setSeoMatrix] = useState(initialSeoMatrix);
  const [isBuilderLoading, setIsBuilderLoading] = useState(false);

  const handleWebsiteInfoChange = (event) => {
    const { name, value } = event.target;
    setWebsiteInfo({ ...websiteInfo, [name]: value });
  };

  const handleUpdateHub = (newHub) => {
    const newHubsAndSpokes = hubsAndSpokes.map((hub) => {
      if (newHub.id === hub.id) return newHub;
      return hub;
    });

    setHubsAndSpokes(newHubsAndSpokes);
  };

  const handleDeleteHub = (hubID) => {
    const newObj = [...hubsAndSpokes].filter((hubObj) => {
      return hubObj.id !== hubID;
    });

    setHubsAndSpokes(newObj);
  };

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

  const handlePageGeneration = async () => {
    // Validate that the user has entered required extra info.
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
        websiteData: websiteInfo,
      };

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
      const blob = new Blob([xmlString], { type: "application/xml" });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${websiteInfo.websiteName}.xml`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    } finally {
      setIsBuilderLoading(false);
    }
    // Validate That there is at least one hub + spoke
  };

  return (
    <div className="">
      <WebsiteContextInputs
        websiteInfo={websiteInfo}
        handleWebsiteInfoChange={handleWebsiteInfoChange}
        websiteInfoErrors={websiteInfoErrors}
      />
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
      />
      {hubsAndSpokes.length > 0 && (
        <>
          <Button handleClick={handlePageGeneration}>
            Generate Import File
          </Button>
          {isBuilderLoading && <div>Im Loading bruh...</div>}
        </>
      )}
    </div>
  );
};

export default ClientWrapper;

// On the 'hub creation modal' This is the template for a new hub.
// When getting results back from the 'Generate longtail' function, the results will be mapped into these objects... Then save to state... in addition to existing state.
const defaultHubShape = {
  id: "",
  hubName: "",
  hubSlug: "",
  seoMeta: {
    seoTitle: "",
    seoDescription: "",
    seoKeyword: "",
    pageExcerpt: "",
  },
  spokes: [],
};

// On the 'spoke creation modal' This is the template for a new spoke (will be nested in the hub itself)
const defaultSpokeShape = {
  id: "",
  spokeTitle: "",
  spokeSlug: "",
  spokeKeyPhrase: "",
  spokeMatrix: {
    spokeVariant: "",
    targetAudience: "",
    customerNeed: "",
  },
  seoMeta: {
    seoTitle: "",
    seoDescription: "",
    seoKeyword: "",
    pageExcerpt: "",
  },
};
