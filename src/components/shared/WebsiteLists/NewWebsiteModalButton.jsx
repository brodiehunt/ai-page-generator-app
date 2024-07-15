"use client";
import { useState } from "react";
import Button from "@/src/components/shared/Button";
import NewWebsiteModalForm from "@/src/components/shared/WebsiteLists/NewWebsiteModal";
import { FaPlusCircle } from "react-icons/fa";
const NewWebsiteModalButton = ({ userId }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalToggle = () => {
    console.log("Modal toggled");
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Button
        handleClick={handleModalToggle}
        extraClasses="py-1.5 px-4 h-fit w-fit text-sm flex gap-2 items-center"
      >
        <FaPlusCircle />
        Create New
      </Button>
      {isOpen && <NewWebsiteModalForm handleModalToggle={handleModalToggle} />}
    </>
  );
};

export default NewWebsiteModalButton;
