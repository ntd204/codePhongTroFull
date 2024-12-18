import React, { memo } from "react";

const Sitem = ({ title, price, image, createdAt }) => {
  return (
    <div className="w-full flex items-center gap-2 py-2 border-b border-gray-300">
      <img
        src="https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2024/05/16/img-2145_1715846260.jpg"
        alt="anh"
        className="w-[65px] h-[65px] object-cover flex-none rounded-md"
      />
      <div className="w-full flex-auto flex flex-col justify-between gap-1">
        <h4 className="text-blue-600 text-[14px]">{`${title?.slice(
          0,
          45
        )}...`}</h4>
        <div className=" flex items-center justify-between w-full">
          <span className="text-sm font-medium text-green-500">{price}</span>
          <span className="text-sm text-gray-300">{createdAt}</span>
        </div>
      </div>
    </div>
  );
};

export default memo(Sitem);
