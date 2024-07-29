import DashboardPageHeader from "@/src/components/shared/dashboard/DashboardPageHeader";
import DashboardPagesContainer from "@/src/components/shared/dashboard/DashboardPagesContainer";
import DashboardSectionHeader from "@/src/components/shared/dashboard/DashboardSectionHeader";

export default function HubGeneratorPage() {
  return (
    <div className="flex flex-col pr-4">
      <DashboardPageHeader title="Hub generator" />
      <DashboardPagesContainer>
        <DashboardSectionHeader title="Hub Generator Tools" />
        <div className="flex gap-4 justify-start"></div>
      </DashboardPagesContainer>
    </div>
  );
}
