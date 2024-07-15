const CogBars = ({ customHeight }) => {
  return (
    <div className="h-8 gap-1 flex">
      <div className="w-2 h-full bg-cog-green rounded-sm"> </div>
      <div className="w-2 h-full bg-cog-orange rounded-sm"> </div>
      <div className="w-2 h-full bg-cog-blue rounded-sm"> </div>
      <div className="w-2 h-full bg-cog-red rounded-sm"> </div>
      <div className="w-2 h-full bg-cog-purple rounded-sm"> </div>
    </div>
  );
};

export default CogBars;
