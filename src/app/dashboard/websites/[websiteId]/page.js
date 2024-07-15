import DashboardPageHeader from "@/src/components/shared/dashboard/DashboardPageHeader";
import DashboardPagesContainer from "@/src/components/shared/dashboard/DashboardPagesContainer";
import DashboardSectionHeader from "@/src/components/shared/dashboard/DashboardSectionHeader";

export default function SingleWebsitePage() {
  return (
    <div className="flex flex-col pr-4">
      <DashboardPageHeader title="Single Website" />
      <DashboardPagesContainer>
        <DashboardSectionHeader title="Website Tools" />
        <div className="flex gap-4 justify-start"></div>
        {/* 
          This page needs:
          1. Top Section Tools (LongTail, blog, hub, allInOne)
          2. Websites (Title, Container, search, filter, add new);
        */}
        <section className="flex-grow"></section>
      </DashboardPagesContainer>
    </div>
  );
}
