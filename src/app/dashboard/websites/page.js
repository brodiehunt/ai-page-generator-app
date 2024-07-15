import NewWebsiteModalButton from "@/src/components/shared/WebsiteLists/NewWebsiteModalButton";
import DashboardPageHeader from "@/src/components/shared/dashboard/DashboardPageHeader";
import DashboardPagesContainer from "@/src/components/shared/dashboard/DashboardPagesContainer";
import DashboardSectionHeader from "@/src/components/shared/dashboard/DashboardSectionHeader";
import WebsiteListTable from "@/src/components/shared/WebsiteLists/WebsiteListTable";
import { Suspense } from "react";

export default function WebsitesPage() {
  return (
    <div className="flex flex-col pr-4">
      <DashboardPageHeader title="Websites" />
      <DashboardPagesContainer>
        <section></section>
        <section className="flex-grow">
          <DashboardSectionHeader title="Websites">
            <NewWebsiteModalButton />
          </DashboardSectionHeader>
          <Suspense fallback={<div>Loading websites...</div>}>
            <WebsiteListTable />
          </Suspense>
        </section>
      </DashboardPagesContainer>
    </div>
  );
}
