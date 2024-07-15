import NewHubModalButton from "@/src/components/shared/HubLists/NewHubModalButton";
import DashboardPageHeader from "@/src/components/shared/dashboard/DashboardPageHeader";
import DashboardPagesContainer from "@/src/components/shared/dashboard/DashboardPagesContainer";
import DashboardSectionHeader from "@/src/components/shared/dashboard/DashboardSectionHeader";
import HubListTable from "@/src/components/shared/HubLists/HubListTable";
import { Suspense } from "react";
import { getWebsiteName } from "@/src/actions/website";
import { auth } from "@/auth";

export default async function HubsPage({ params, searchParams }) {
  const { websiteId } = params;
  const session = await auth();
  const { name, error } = await getWebsiteName(websiteId);

  const userId = session?.user?.id;
  console.log("hubspage userid", session, userId);
  return (
    <div className="flex flex-col pr-4">
      <DashboardPageHeader title={`${name ? name : ""}: hubs`} />
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
              websiteName={name}
              websiteId={websiteId}
              userId={userId}
            />
          </DashboardSectionHeader>
          <Suspense fallback={<div>Loading websites...</div>}>
            <HubListTable
              websiteId={websiteId}
              websiteName={name}
              userId={userId}
            />
          </Suspense>
        </section>
      </DashboardPagesContainer>
    </div>
  );
}
