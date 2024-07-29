import DashboardPageHeader from "@/src/components/shared/dashboard/DashboardPageHeader";
import DashboardPagesContainer from "@/src/components/shared/dashboard/DashboardPagesContainer";
import DashboardSectionHeader from "@/src/components/shared/dashboard/DashboardSectionHeader";
import { auth } from "@/auth";
import ToolsSection from "@/src/components/shared/Tools/ToolsSection";
import { dashboardTools } from "@/src/components/shared/Tools/ToolsData";

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
        <section className="flex-grow"></section>
      </DashboardPagesContainer>
    </div>
  );
}
