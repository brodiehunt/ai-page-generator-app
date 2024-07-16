"use client";
import { useState } from "react";
import Button from "@/src/components/shared/Button";
import NewHubModalForm from "@/src/components/shared/HubLists/NewHubModal";
import { FaPlusCircle } from "react-icons/fa";

const NewHubModalButton = ({ websiteName, websiteId, userId, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalToggle = () => {
    console.log("Modal toggled");
    setIsOpen(!isOpen);
  };
  console.log("NewHubModalButton", userId);

  return (
    <>
      <Button
        handleClick={handleModalToggle}
        extraClasses="py-1.5 px-4 h-fit w-fit text-sm flex gap-2 items-center"
      >
        <FaPlusCircle />
        {children}
      </Button>
      {isOpen && (
        <NewHubModalForm
          handleModalToggle={handleModalToggle}
          websiteName={websiteName}
          websiteId={websiteId}
          userId={userId}
        />
      )}
    </>
  );
};

export default NewHubModalButton;
