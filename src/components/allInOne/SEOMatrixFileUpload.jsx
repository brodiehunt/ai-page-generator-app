import { read, utils } from "xlsx";
import DashboardSectionHeader from "../shared/dashboard/DashboardSectionHeader";

const SEOMatrixFileUpload = ({ setSeoMatrix }) => {
  const formatFileDataForState = (fileJson) => {
    const stateObj = {};
    for (const property in fileJson) {
      const key = property
        .split(" ")
        .map((word, index) => {
          if (index === 0) {
            return word.toLowerCase();
          } else {
            return word[0].toUpperCase() + word.slice(1);
          }
        })
        .join("");
      const value = fileJson[property].join(",");

      stateObj[key] = value;
    }
    return stateObj;
  };
  const onFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = read(data, { type: "array" });

        const sheetName = "URL Generation Sheet";
        const worksheet = workbook.Sheets[sheetName];

        if (!worksheet) {
          console.error(`Sheet named ${sheetName} not found`);
          return;
        }

        const jsonData = utils.sheet_to_json(worksheet, { header: 1 });
        console.log("JsOn data", jsonData);
        const columns = jsonData[0];

        const dataObject = {};

        columns.forEach((column) => {
          dataObject[column] = [];
        });

        jsonData.slice(1).forEach((row) => {
          columns.forEach((column, index) => {
            if (row[index] !== undefined) {
              dataObject[column].push(row[index]);
            }
          });
        });

        const stateValue = formatFileDataForState(dataObject);
        setSeoMatrix(stateValue);
      };
      reader.readAsArrayBuffer(file);
    }
  };
  return (
    <form className="col-span-1">
      <DashboardSectionHeader title="Upload Matrix"></DashboardSectionHeader>
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-custom-primary dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">XLSX</p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={onFileChange}
          />
        </label>
      </div>
    </form>
  );
};

export default SEOMatrixFileUpload;
