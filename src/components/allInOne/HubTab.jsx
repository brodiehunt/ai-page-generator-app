import { useState } from "react";
import { FaChevronDown, FaTrash } from "react-icons/fa";
import EditHubModal from "./EditHubModal";
import EditSpokeModal from "./EditSpokeModal";

export default function HubTab({
  hubObj,
  handleDeleteHub,
  handleDeleteSpoke,
  handleUpdateSpoke,
  handleUpdateHub,
}) {
  const [showSpokes, setShowSpokes] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editSpokeModal, setEditSpokeModal] = useState(null);
  const { hub, id, hubUrl, spokes } = hubObj;
  const handleToggleSpokes = () => {
    setShowSpokes(!showSpokes);
  };

  const handleToggleHubEdit = () => {
    setEditModalOpen(!editModalOpen);
  };

  const handleToggleSpokeEdit = (spoke) => {
    setEditSpokeModal(spoke);
  };

  return (
    <>
      {editModalOpen && (
        <EditHubModal
          handleDeleteHub={handleDeleteHub}
          handleToggleHubEdit={handleToggleHubEdit}
          handleToggleSpokeEdit={handleToggleSpokeEdit}
          hub={hubObj}
          handleUpdateHub={handleUpdateHub}
        />
      )}
      {editSpokeModal && (
        <EditSpokeModal
          spoke={editSpokeModal}
          hubID={id}
          handleDeleteSpoke={handleDeleteSpoke}
          handleToggleSpokeEdit={handleToggleSpokeEdit}
          handleUpdateSpoke={handleUpdateSpoke}
        />
      )}
      <div className="min-w-full bg-gray-50/50 ">
        <div className="bg-gray-100 rounded w-full px-4 py-2 flex justify-between items-center mb-2">
          <div>
            <h3
              onClick={handleToggleHubEdit}
              className="text-lg cursor-pointer hover:underline"
            >
              HUB: {hub ? hub : "no hub"}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleDeleteHub(id)}
              className="text-gray-400 px-2 hover:text-red-500"
            >
              <FaTrash />
            </button>
            <FaChevronDown
              onClick={handleToggleSpokes}
              className={`transition-all duration-200 cursor-pointer ${
                showSpokes ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>
        {showSpokes && (
          <div className="py-2">
            <ul>
              {spokes &&
                spokes.map((spoke) => {
                  return (
                    <li
                      className="hover:bg-custom-primary/10 p-2 border-b-[1px] border-solid border-gray-200 rounded flex justify-between items-center last-of-type:border-none"
                      key={spoke.id}
                    >
                      <div className="w-[80%] flex-shrink-1">
                        <button
                          className="text-xs flex gap-2 cursor-pointer hover:underline"
                          onClick={() => handleToggleSpokeEdit(spoke)}
                        >
                          SPOKE: {spoke.title}
                        </button>
                      </div>

                      <button
                        onClick={() => {
                          console.log(id, spoke.id);
                          handleDeleteSpoke(id, spoke.id);
                        }}
                        className="text-gray-400 px-2 hover:text-red-500 flex-shrink-0"
                      >
                        <FaTrash />
                      </button>
                    </li>
                  );
                })}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
