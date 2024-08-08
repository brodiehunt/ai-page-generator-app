import DashboardPageHeader from "@/src/components/shared/dashboard/DashboardPageHeader";
import DashboardPagesContainer from "@/src/components/shared/dashboard/DashboardPagesContainer";
import DashboardSectionHeader from "@/src/components/shared/dashboard/DashboardSectionHeader";
import SpokeGeneratorClientWrapper from "@/src/components/spokeCreatorPage/SpokeGeneratorClientWrapper";
export default function SpokeGeneratorPage() {
  return (
    <div className="flex flex-col pr-4">
      <DashboardPageHeader title="Spoke Generator" />
      <DashboardPagesContainer>
        {/* <DashboardSectionHeader title="Spoke Generator Tools" /> */}
        <div className="">
          <SpokeGeneratorClientWrapper />
        </div>
      </DashboardPagesContainer>
    </div>
  );
}
