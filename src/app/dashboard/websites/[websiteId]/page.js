import { auth } from "@/auth";
import DashboardPageHeader from "@/src/components/shared/dashboard/DashboardPageHeader";
import DashboardPagesContainer from "@/src/components/shared/dashboard/DashboardPagesContainer";
import DashboardSectionHeader from "@/src/components/shared/dashboard/DashboardSectionHeader";
import HubListTable from "@/src/components/shared/HubLists/HubListTable";
import NewHubModalButton from "@/src/components/shared/HubLists/NewHubModalButton";
import { Suspense } from "react";

const fetchWebsiteData = async (websiteId) => {
  try {
    if (!websiteId) {
      throw new Error("Could not fetch website data");
    }
    console.log("Entering fetch website data");
    const response = await fetch(
      `http://localhost:3000/api/websites/${websiteId}`,
      {
        method: "GET",
        next: { tags: ["website"] },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.log("Error with fetch");
      const { error } = await response.json();
      return { error: error, website: null };
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Entering the error block in fetch function", error);
    return { error: error.message, website: null };
  }
};
export default async function SingleWebsitePage({ params }) {
  const { websiteId } = params;
  const session = await auth();
  const userId = session?.user.id;
  const { error, website } = await fetchWebsiteData(websiteId);

  return (
    <div className="flex flex-col pr-4">
      {!error && (
        <>
          <DashboardPageHeader
            title={website.name ? website.name : "Website"}
          />
          <DashboardPagesContainer>
            <DashboardSectionHeader title="Website Tools" />
            <div className="flex gap-4 justify-start"></div>
            {/* 
          This page needs:
          1. Top Section Tools (LongTail, blog, hub, allInOne)
          2. Websites (Title, Container, search, filter, add new);
        */}
            <section className="flex-grow grid grid-cols-2 gap-4">
              <div>
                <DashboardSectionHeader
                  title={website.name ? `${website.name} hubs` : "Hubs"}
                >
                  <div className="">
                    <NewHubModalButton
                      websiteName={website.name}
                      websiteId={websiteId}
                      userId={userId}
                    >
                      Create
                    </NewHubModalButton>
                  </div>
                </DashboardSectionHeader>
                <Suspense fallback={<div>Loading Hubs...</div>}>
                  <HubListTable
                    websiteId={websiteId}
                    websiteName={website.name ? website.name : ""}
                    website={website}
                    userId={userId}
                  />
                </Suspense>
              </div>
              <div>
                <DashboardSectionHeader
                  title={website.name ? `${website.name} spokes` : "spokes"}
                />
                <Suspense fallback={<div>Loading Hubs...</div>}>
                  <HubListTable
                    websiteId={websiteId}
                    websiteName={website.name ? website.name : ""}
                    userId={userId}
                    website={website}
                  />
                </Suspense>
              </div>
            </section>
          </DashboardPagesContainer>
        </>
      )}
    </div>
  );
}
