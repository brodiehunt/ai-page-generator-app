import HubTab from "@/src/components/allInOne/HubTab";
import DashboardSectionHeader from "../shared/dashboard/DashboardSectionHeader";
import NoHubsOrSpokes from "./NoHubsOrSpokes";
const GeneratedSpokesPreview = ({
  hubsAndSpokes,
  handleDeleteHub,
  handleDeleteSpoke,
  handleUpdateSpoke,
  handleUpdateHub,
}) => {
  return (
    <div className="mb-4">
      <DashboardSectionHeader title="Hubs and Spokes"></DashboardSectionHeader>
      <div className="w-full min-h-[200px] rounded bg-white shadow-sm p-4">
        {hubsAndSpokes.length ? (
          hubsAndSpokes.map((singleHub) => {
            return (
              <HubTab
                key={singleHub.id}
                hubObj={singleHub}
                handleDeleteHub={handleDeleteHub}
                handleDeleteSpoke={handleDeleteSpoke}
                handleUpdateSpoke={handleUpdateSpoke}
                handleUpdateHub={handleUpdateHub}
              />
            );
          })
        ) : (
          <NoHubsOrSpokes />
        )}
      </div>
    </div>
  );
};

export default GeneratedSpokesPreview;
