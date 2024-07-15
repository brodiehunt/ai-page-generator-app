"use client";
import { useState } from "react";
import HubTab from "./HubTab";
import { expectedResponseFormat } from "@/src/utils/openAI/prompts";

export default function ExcelUploadForm() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [response, setResponse] = useState(expectedResponseFormat.hubs);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("excelFile", selectedFile);
    setIsLoading(true);
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResponse(data.text);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4  max-w-[500px] p-4 rounded bg-slate-200/80 shadow-xl"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="excelFile">SEO Matrix Upload</label>
          <input
            id="excelFile"
            type="file"
            name="excelFile"
            accept=".xlsx"
            onChange={handleFileChange}
          />
        </div>

        <button className={`p-2 rounded bg-blue-500 text-white`} type="submit">
          {isLoading ? "loading..." : "Submit"}
        </button>
      </form>
      {response && (
        <div className="mt-10">
          {/* <h2 className="mb-4">Generated Hub and Spokes</h2> */}
          <div className="grid grid-cols-2 gap-8">
            <div className="">
              <h2 className="mb-4">Generated Hub and Spokes</h2>
              {response.map((hubObj, index) => {
                return <HubTab hubObj={hubObj} key={index} />;
              })}
            </div>
            <div className="">
              <h2 className="mb-4">Next Steps</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
