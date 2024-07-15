import DashboardPageHeader from "@/src/components/shared/dashboard/DashboardPageHeader";
import DashboardPagesContainer from "@/src/components/shared/dashboard/DashboardPagesContainer";
import DashboardSectionHeader from "@/src/components/shared/dashboard/DashboardSectionHeader";
import { auth } from "@/auth";
import { Suspense } from "react";
import NewWebsiteModalButton from "@/src/components/shared/WebsiteLists/NewWebsiteModalButton";
import WebsiteListTable from "@/src/components/shared/WebsiteLists/WebsiteListTable";
import ToolsSection from "@/src/components/shared/Tools/ToolsSection";
import { dashboardTools } from "@/src/components/shared/Tools/ToolsData";

const tools = [
  {
    toolIcon: "",
  },
];

export default async function Dashboard({}) {
  const session = await auth();

  return (
    <div className="flex flex-col pr-4 h-screen">
      <DashboardPageHeader title="Dashboard" />
      <DashboardPagesContainer>
        <section>
          <DashboardSectionHeader title="Tools" />
          <ToolsSection tools={dashboardTools} />
        </section>
        <section className="flex-grow">
          <DashboardSectionHeader title="Websites">
            <NewWebsiteModalButton />
          </DashboardSectionHeader>
          <Suspense fallback={<div>Loading websites...</div>}>
            <WebsiteListTable />
          </Suspense>
        </section>
        <div className=""></div>
      </DashboardPagesContainer>
    </div>
  );
}

// dc709db48f44dc890dd1b7cc7e76ba38-91fbbdba-0409e134
