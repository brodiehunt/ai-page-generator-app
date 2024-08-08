"use client";
import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import SEOMatrixFileUpload from "../allInOne/SEOMatrixFileUpload";
import GenerateLongtailForm from "./GenerateLongtailForm";
import HubsAndSpokesList from "./HubsAndSpokesList";

const initialSeoMatrix = {
  hubs: "",
  spokeVariants: "",
  customerNeedVariants: "",
  fillerWords: "",
  targetAudience: "",
};

export default function LongtailGeneratorClientWrapper({}) {
  const [seoMatrix, setSeoMatrix] = useState(initialSeoMatrix);
  const [hubsAndSpokes, setHubsAndSpokes] = useState([]);

  return (
    <div className="grid gap-4">
      <SEOMatrixFileUpload setSeoMatrix={setSeoMatrix} />
      <GenerateLongtailForm
        seoMatrix={seoMatrix}
        setHubsAndSpokes={setHubsAndSpokes}
      />
      <HubsAndSpokesList hubsAndSpokes={hubsAndSpokes} />
    </div>
  );
}
