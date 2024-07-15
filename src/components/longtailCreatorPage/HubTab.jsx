import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function HubTab({ hubObj }) {
  const [showSpokes, setShowSpokes] = useState(false);
  const { hub, spokes } = hubObj;
  const handleToggleSpokes = () => {
    setShowSpokes(!showSpokes);
  };

  return (
    <>
      <button
        onClick={handleToggleSpokes}
        className="w-full p-2 flex justify-between items-center border-b-2 mb-2"
      >
        <h3 className="text-2xl">{hub ? hub : "no hub"}</h3>
        <FaChevronDown
          className={`transition-all duration-200 ${
            showSpokes ? "rotate-180" : ""
          }`}
        />
      </button>
      {showSpokes && (
        <div className="p-2">
          <ul>
            {spokes &&
              spokes.map((spoke, index) => {
                return (
                  <li className="mb-2" key={spoke.slug}>
                    <p>
                      <span className="font-bold">Title:</span>
                      {spoke?.title && spoke.title}
                    </p>
                    <p>
                      <span className="font-bold">Slug:</span>
                      {spoke?.slug && spoke.slug}
                    </p>
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </>
  );
}
