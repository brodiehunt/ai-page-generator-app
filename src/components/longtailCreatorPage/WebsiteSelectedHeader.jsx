import { useRouter } from "next/navigation";
import Button from "../shared/Button";

// Change website button will send a new request...
// so will the remove website button.
// Modal for the select website button will be client component.
// Will need to fetch list of websites (names and ids)

export default function WebsiteSelectedHeader({ websiteName }) {
  const router = useRouter();

  const handleDeselectWebsite = () => {
    // Programatically navigate to base route
    router.push("/dashboard/longtail-generator");
  };

  const handleSelectWebsite = () => {
    // open modal which will (on load make an api call to retrieve list of sites)
    // Select site will cause redirect to base path ?websiteName="selectedSite"
    router.push("/dashboard/longtail-generator?websiteName=johnswebsite");
  };

  return (
    <div className="flex justify-between items-center py-2">
      <p className="flex gap-2 items-baseline">
        <span className="font-medium text-xl">Website Selected:</span>
        {websiteName ? websiteName : "None"}
      </p>
      <div className="flex gap-2">
        {websiteName ? (
          <>
            <Button type="primary-hollow" handleClick={handleSelectWebsite}>
              Change Website
            </Button>
            <Button type="" handleClick={handleDeselectWebsite}>
              Deselect Website
            </Button>
          </>
        ) : (
          <Button type="" handleClick={handleSelectWebsite}>
            Select Website
          </Button>
        )}
      </div>
    </div>
  );
}
