export default function DashboardPageHeader({ title, children }) {
  return (
    <header className="h-[100px] shadow-sm flex justify-between p-4 px-8 bg-white mb-4 rounded-lg sticky top-0 z-10">
      <div className="self-center">
        <h1 className="font-semibold text-3xl">{title}</h1>
      </div>
      <div className="self-center">
        <div className="w-10 h-10 rounded-full bg-slate-200"></div>
      </div>
    </header>
  );
}
