import ToolsCard from "./ToolsCard";

const ToolsSection = ({ tools }) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {tools &&
        tools.map((tool, index) => {
          return <ToolsCard key={index} tool={tool} />;
        })}
    </div>
  );
};

export default ToolsSection;
