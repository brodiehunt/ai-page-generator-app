import HubGeneratorClientWrapper from "@/src/components/hubCreatorPage/HubGeneratorClientWrapper";
import DashboardPageHeader from "@/src/components/shared/dashboard/DashboardPageHeader";
import DashboardPagesContainer from "@/src/components/shared/dashboard/DashboardPagesContainer";
import DashboardSectionHeader from "@/src/components/shared/dashboard/DashboardSectionHeader";

export default function HubGeneratorPage() {
  return (
    <div className="flex flex-col pr-4">
      <DashboardPageHeader title="Hub generator" />
      <DashboardPagesContainer>
        <div className="">
          <HubGeneratorClientWrapper />
        </div>
      </DashboardPagesContainer>
    </div>
  );
}
