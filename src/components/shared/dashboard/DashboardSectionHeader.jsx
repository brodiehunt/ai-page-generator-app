export default function DashboardSectionHeader({ title, children }) {
  return (
    <div className="flex justify-between items-end py-4">
      <h2 className="text-2xl font-medium">{title}</h2>
      <div className="self-center">{children}</div>
    </div>
  );
}
