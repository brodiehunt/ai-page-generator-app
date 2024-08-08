import LongtailGeneratorClientWrapper from "@/src/components/longtailCreatorPage/longtailGeneratorClientWrapper";
import DashboardPageHeader from "@/src/components/shared/dashboard/DashboardPageHeader";
import DashboardPagesContainer from "@/src/components/shared/dashboard/DashboardPagesContainer";

export default async function longtailGeneratorPage({ searchParams }) {
  return (
    <>
      <div className="flex flex-col">
        <DashboardPageHeader title="Longtail Generator" />
        <DashboardPagesContainer>
          <LongtailGeneratorClientWrapper />
        </DashboardPagesContainer>
      </div>
    </>
  );
}

export const dynamic = "force-dynamic";
