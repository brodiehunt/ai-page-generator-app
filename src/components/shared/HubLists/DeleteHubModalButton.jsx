"use client";
import { FaTrashAlt } from "react-icons/fa";
import DeleteHubModal from "@/src/components/shared/HubLists/DeleteHubModal";
import { useState } from "react";

const DeleteHubModalButton = ({ hubName, websiteId, hubId, userId }) => {
  const [isOpen, setIsOpen] = useState(false);
  console.log(hubId);
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
        <DeleteHubModal
          hubName={hubName}
          websiteId={websiteId}
          hubId={hubId}
          handleModalToggle={handleModalToggle}
          userId={userId}
        />
      )}
    </>
  );
};

export default DeleteHubModalButton;
