import NoHubsOrSpokes from "../allInOne/NoHubsOrSpokes";
import DashboardSectionHeader from "@/src/components/shared/dashboard/DashboardSectionHeader";

const HubsAndSpokesList = ({ hubsAndSpokes }) => {
  return (
    <div>
      <DashboardSectionHeader title="Hubs and Spokes"></DashboardSectionHeader>
      <div className="w-full min-h-[200px] rounded bg-white shadow-sm p-4">
        {hubsAndSpokes.length ? (
          hubsAndSpokes.map((singleHub) => {
            return (
              <div key={singleHub.id} className="mb-2">
                <p className="font-medium">Hub: {singleHub.hub}</p>
                <ul>
                  {singleHub.spokes &&
                    singleHub.spokes.map((spoke) => {
                      return (
                        <li className="pl-4 text-sm" key={spoke.id}>
                          {spoke.title}
                        </li>
                      );
                    })}
                </ul>
              </div>
            );
          })
        ) : (
          <NoHubsOrSpokes />
        )}
      </div>
    </div>
  );
};

export default HubsAndSpokesList;
