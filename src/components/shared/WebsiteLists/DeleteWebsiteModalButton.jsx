"use client";
import { FaTrashAlt } from "react-icons/fa";
import DeleteWebsiteModal from "@/src/components/shared/WebsiteLists/DeleteWebsiteModal";
import { useState } from "react";

const DeleteWebsiteModalButton = ({ websiteName, websiteId, userId }) => {
  const [isOpen, setIsOpen] = useState(false);
  console.log(websiteId);
  const handleModalToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={handleModalToggle}
        className="group py-1 px-2 text-gray-500"
      >
        <FaTrashAlt className="group-hover:text-red-500" />
      </button>
      {isOpen && (
        <DeleteWebsiteModal
          websiteName={websiteName}
          websiteId={websiteId}
          handleModalToggle={handleModalToggle}
          userId={userId}
        />
      )}
    </>
  );
};

export default DeleteWebsiteModalButton;
