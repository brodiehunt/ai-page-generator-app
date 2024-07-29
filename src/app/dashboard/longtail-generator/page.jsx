import LongtailGeneratorClientWrapper from "@/src/components/longtailCreatorPage/LongtailGeneratorClientWrapper";
import DashboardPageHeader from "@/src/components/shared/dashboard/DashboardPageHeader";
import DashboardPagesContainer from "@/src/components/shared/dashboard/DashboardPagesContainer";

async function fetchWebsiteData(websiteName) {
  return { name: websiteName };
}
export default async function longtailGeneratorPage({ searchParams }) {
  const { websiteName } = searchParams;
  const websiteData = websiteName ? await fetchWebsiteData(websiteName) : null;

  return (
    <>
      <div className="flex flex-col pr-4">
        <DashboardPageHeader title="Longtail Generator" />
        <DashboardPagesContainer>
          <LongtailGeneratorClientWrapper websiteDataServerLoad={websiteData} />
        </DashboardPagesContainer>
      </div>
    </>
  );
}

export const dynamic = "force-dynamic";
