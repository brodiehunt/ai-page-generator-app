import DashboardPageHeader from "@/src/components/shared/dashboard/DashboardPageHeader";
import DashboardPagesContainer from "@/src/components/shared/dashboard/DashboardPagesContainer";

import ClientWrapper from "@/src/components/allInOne/ClientWrapper";
export default function AllInOneGeneratorPage() {
  return (
    <div className="flex flex-col pr-4 pb-20">
      <DashboardPageHeader title="All In One Generator" />
      <DashboardPagesContainer>
        <section>
          <ClientWrapper />
        </section>
      </DashboardPagesContainer>
    </div>
  );
}
