const CogBars = ({ customHeight, customBarWidth }) => {
  let customClass;
  if (customHeight) {
    customClass = `${customHeight} gap-1 flex`;
  } else {
    customClass = "h-8 gap-1 flex";
  }
  return (
    <div className={customClass}>
      <div
        className={`${
          customBarWidth ? customBarWidth : "w-2"
        } h-full bg-cog-green rounded-sm`}
      >
        {" "}
      </div>
      <div
        className={`${
          customBarWidth ? customBarWidth : "w-2"
        } h-full bg-cog-orange rounded-sm`}
      >
        {" "}
      </div>
      <div
        className={`${
          customBarWidth ? customBarWidth : "w-2"
        } h-full bg-cog-blue rounded-sm`}
      >
        {" "}
      </div>
      <div
        className={`${
          customBarWidth ? customBarWidth : "w-2"
        } h-full bg-cog-red rounded-sm`}
      >
        {" "}
      </div>
      <div
        className={`${
          customBarWidth ? customBarWidth : "w-2"
        } h-full bg-cog-purple rounded-sm`}
      >
        {" "}
      </div>
    </div>
  );
};

export default CogBars;
