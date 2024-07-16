import NewHubModalButton from "@/src/components/shared/HubLists/NewHubModalButton";
import DashboardPageHeader from "@/src/components/shared/dashboard/DashboardPageHeader";
import DashboardPagesContainer from "@/src/components/shared/dashboard/DashboardPagesContainer";
import DashboardSectionHeader from "@/src/components/shared/dashboard/DashboardSectionHeader";
import HubListTable from "@/src/components/shared/HubLists/HubListTable";
import { Suspense } from "react";
import { auth } from "@/auth";

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

export default async function HubsPage({ params, searchParams }) {
  const { websiteId } = params;
  const session = await auth();
  const { website, error } = await fetchWebsiteData(websiteId);

  const userId = session?.user?.id;
  console.log("hubspage userid", session, userId);
  return (
    <div className="flex flex-col pr-4">
      {!error && (
        <>
          <DashboardPageHeader
            title={`${website.name ? website.name : ""} Hubs`}
          />
          <DashboardPagesContainer>
            <DashboardSectionHeader title="Hub Tools" />
            <div className="flex gap-4 justify-start"></div>
            {/* 
          This page needs:
          1. Top Section Tools (LongTail, blog, hub, allInOne)
          2. Websites (Title, Container, search, filter, add new);
        */}
            <section className="flex-grow">
              <DashboardSectionHeader title="Hubs">
                <NewHubModalButton
                  websiteName={website.name}
                  websiteId={websiteId}
                  userId={userId}
                >
                  Create New Hub
                </NewHubModalButton>
              </DashboardSectionHeader>
              <Suspense fallback={<div>Loading websites...</div>}>
                <HubListTable
                  websiteId={websiteId}
                  websiteName={website.name}
                  userId={userId}
                  website={website}
                />
              </Suspense>
            </section>
          </DashboardPagesContainer>
        </>
      )}
    </div>
  );
}
