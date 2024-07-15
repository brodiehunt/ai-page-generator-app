import DashboardSidebar from "@/src/components/shared/dashboard/DashboardSidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="w-screen max-w-[1980px] mx-auto h-screen flex bg-slate-100/50">
      <div className="h-full max-h-[100%] flex-grow min-w-[350px] max-w-[350px] w-[350px] border-r-[1px] border-black/10">
        <DashboardSidebar />
      </div>
      <main className="h-full max-h-[100%] overflow-y-scroll flex-grow relative pl-4">
        {children}
      </main>
    </div>
  );
}
