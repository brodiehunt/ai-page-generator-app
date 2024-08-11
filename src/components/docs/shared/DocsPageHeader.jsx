export default function DocsPageHeader({ title, children }) {
  return (
    <header className="h-[100px] shadow-sm flex justify-between p-4 px-8 bg-white mb-4 rounded-lg sticky top-0 z-10">
      <div className="self-center">
        <h1 className="font-semibold text-3xl text-custom-primary">{title}</h1>
      </div>
    </header>
  );
}
