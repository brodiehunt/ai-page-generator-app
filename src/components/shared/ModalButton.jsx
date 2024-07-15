"use client";
import Button from "./Button";
import { useState } from "react";

const ModalButton = ({ children, Modal }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Button handleClick={handleModalToggle}>{children}</Button>
      {isOpen && <Modal handleModalToggle={handleModalToggle} />}
    </>
  );
};

export default ModalButton;
