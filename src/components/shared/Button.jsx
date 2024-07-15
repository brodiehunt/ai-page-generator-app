"use client";
import { twMerge } from "tailwind-merge";

export default function Button({ handleClick, type, extraClasses, children }) {
  const baseButtonStyles =
    "group py-2 px-4 rounded transition-all duration-200";
  const mergedButtonBaseStyles = twMerge(baseButtonStyles, extraClasses || "");
  if (type === "primary-hollow") {
    return (
      <button
        onClick={handleClick}
        className={`
          ${baseButtonStyles}
        text-custom-primary border-solid border-2 border-custom-primary
          hover:bg-custom-primary hover:text-custom-light
          ${extraClasses ? extraClasses : ""}
      `}
      >
        {children}
      </button>
    );
  }

  if (type === "secondary-hollow") {
    return (
      <button
        onClick={handleClick}
        className={`
          ${baseButtonStyles}
        text-red-500 border-solid border-2 border-red-500
          hover:bg-red-500 hover:text-custom-light
          ${extraClasses ? extraClasses : ""}
      `}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`
        ${mergedButtonBaseStyles} 
        text-custom-light bg-custom-primary hover:bg-custom-primary/80
        ${extraClasses ? extraClasses : ""}
      `}
    >
      {children}
    </button>
  );
}
