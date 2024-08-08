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
  setRegenerateSpokeCount,
  regenerateSpokeCount,
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

  const handleToggleRegnerate = (event, spoke) => {
    const newSpoke = { ...spoke };
    if (newSpoke.regenerate) {
      setRegenerateSpokeCount(regenerateSpokeCount - 1);
    } else {
      setRegenerateSpokeCount(regenerateSpokeCount + 1);
    }
    newSpoke.regenerate = !newSpoke.regenerate;
    handleUpdateSpoke(id, newSpoke);
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
                      <div className="w-[80%] flex-shrink-1 flex items-center gap-1 ">
                        <div className="flex items-center">
                          <div className="flex items-center">
                            <div className="flex items-center h-5">
                              <input
                                id={`${spoke.id}-regenerate`}
                                type="checkbox"
                                checked={spoke.regenerate}
                                name={`${spoke.id} regenerate`}
                                onChange={(event) =>
                                  handleToggleRegnerate(event, spoke)
                                }
                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                              />
                            </div>
                            <label
                              htmlFor={`${spoke.id}-regenerate`}
                              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 hidden"
                              aria-description="Regenerate Spoke"
                            >
                              Regenerate Spoke
                              {/* <span className="text-custom-primary">{websiteName}</span>. */}
                            </label>
                          </div>
                        </div>
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
