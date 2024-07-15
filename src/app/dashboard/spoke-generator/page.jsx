import DashboardPageHeader from "@/src/components/shared/dashboard/DashboardPageHeader";
import DashboardPagesContainer from "@/src/components/shared/dashboard/DashboardPagesContainer";
import DashboardSectionHeader from "@/src/components/shared/dashboard/DashboardSectionHeader";

export default function SpokeGeneratorPage() {
  return (
    <div className="flex flex-col pr-4">
      <DashboardPageHeader title="Spoke Generator" />
      <DashboardPagesContainer>
        <DashboardSectionHeader title="Spoke Generator Tools" />
        <div className="flex gap-4 justify-start"></div>
        {/* 
          This page needs:
          1. Top Section Tools (LongTail, blog, hub, allInOne)
          2. Websites (Title, Container, search, filter, add new);
        */}
      </DashboardPagesContainer>
    </div>
  );
}
