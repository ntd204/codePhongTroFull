import React, { memo } from "react";

const SearchItem = ({ IconBefore, IconAfter, text, fontWeight }) => {
  return (
    <div className="bg-white py-2 px-4 w-full text-gray-400 rounded-md text-black text-[13.3px] flex justify-between items-center">
      <div className="w-full flex items-center gap-1">
        {IconBefore}
        <span
          className={`${
            fontWeight && "font-medium text-black "
          } w-full overflow-hidden text-ellipsis inline-block whitespace-nowrap`}
        >
          {text}
        </span>
      </div>
      {IconAfter}
    </div>
  );
};

export default memo(SearchItem);
