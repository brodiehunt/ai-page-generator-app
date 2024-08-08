import DashboardSidebarNav from "@/src/components/shared/dashboard/DashboardSidebarNav";
import CogBars from "@/src/components/shared/CogBars";
import { auth } from "@/auth";
export default async function DashboardSidebar({}) {
  const session = await auth();

  return (
    <div className="bg-white h-full flex flex-col justify-stretch rounded-lg">
      <div className="h-[100px] p-4 px-8 flex items-center gap-2 text-2xl font-bold text-custom-dark shadow-sm">
        <div className="flex items-center gap-2">
          <CogBars /> <div className="text-4xl">Atria</div>
        </div>
      </div>
      <div className="p-4 px-8">
        <p className="text-2xl font-medium">Hello {session?.user?.email}</p>
      </div>
      <DashboardSidebarNav />
    </div>
  );
}
