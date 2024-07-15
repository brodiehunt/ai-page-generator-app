"use client";
import WebsiteSelectedHeader from "./WebsiteSelectedHeader";
import ExcelUploadForm from "./ExcelUploadForm";
import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function LongtailGeneratorClientWrapper({
  websiteDataServerLoad,
}) {
  const [websiteName, setWebsiteName] = useState(
    websiteDataServerLoad?.websiteName
  );
  const [seoMatrix, setSeoMatrix] = useState(null);

  const isNotFirstRender = useRef(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (isNotFirstRender.current) {
      //make api call here
      const newSiteName = searchParams.get("websiteName");
      setWebsiteName(newSiteName);
    }
    isNotFirstRender.current = true;
  }, [searchParams]);

  return (
    <div className="">
      <WebsiteSelectedHeader websiteName={websiteName} />
      <ExcelUploadForm />
    </div>
  );
}
