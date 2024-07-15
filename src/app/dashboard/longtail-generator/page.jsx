import LongtailGeneratorClientWrapper from "@/src/components/longtailCreatorPage/longtailGeneratorClientWrapper";
import DashboardPageHeader from "@/src/components/shared/dashboard/DashboardPageHeader";
import DashboardPagesContainer from "@/src/components/shared/dashboard/DashboardPagesContainer";

async function fetchWebsiteData(websiteName) {
  return { name: websiteName };
}
export default async function longtailGeneratorPage({ searchParams }) {
  const { websiteName } = searchParams;
  const websiteData = websiteName ? await fetchWebsiteData(websiteName) : null;

  // If Searchparams: website has an id then -> fetch the website related data:
  // 1. Check to see if it has a matrix already.
  // 2. If so, Prefill the form object, the input form, and the 'selected website' -> remove 'select website button' and add 'change website button'
  // Pass both form data/and or key data into relevant forms.
  // Update current
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
