"use client";
import ModalButton from "../ModalButton";
import NewWebsiteModalForm from "./NewWebsiteModal";

const NoWebsites = () => {
  return (
    <td className="">
      <div className="flex flex-col items-center justify-center">
        <p className="text-gray-500 font-medium text-lg">
          You have no websites.
        </p>
        <ModalButton Modal={NewWebsiteModalForm}>Create Website</ModalButton>
      </div>
    </td>
  );
};

export default NoWebsites;
