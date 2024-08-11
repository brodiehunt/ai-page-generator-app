export default function DocsPagesContainer({ children }) {
  return (
    <div className="rounded-lg flex-grow max-h-[100%] flex flex-col overflow-y-scroll gap-4 py-4 px-8 pt-0">
      {children}
    </div>
  );
}
