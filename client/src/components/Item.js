import React, { memo, useState } from "react";
import icons from "../ultils/icons";

const indexs = [0, 1, 2, 3];

const { GrStar, RiHeartFill, RiHeartLine, BsBookmarkStarFill } = icons;

const Item = ({
  images,
  user,
  title,
  star,
  description,
  attributes,
  address,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="w-full flex border-t border-orange-600 py-4">
      <div className="w-2/5 flex flex-wrap gap-[2px] items-center relative cursor-pointer">
        {images.length > 0 &&
          images
            .filter((i, index) => indexs.some((i) => i === index))
            ?.map((i, index) => {
              return (
                <img
                  key={index}
                  src={i}
                  alt="preview"
                  className="w-[140px] h-[120px] object-cover"
                />
              );
            })}
        <span className="bg-overlay-700 text-white px-2 rounded-md absolute left-1 bottom-4">
          {`${images.length} ảnh`}
        </span>
        <span
          className="text-white absolute right-5 bottom-1"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered ? (
            <RiHeartFill size={26} color="red" />
          ) : (
            <RiHeartLine size={26} />
          )}
        </span>
      </div>
      <div className="w-3/5">
        <div className="w-full flex justify-between gap-4">
          <div className="text-red-600 font-medium">
            <GrStar className="star-item" size={18} color="yellow" />
            <GrStar className="star-item" size={18} color="yellow" />
            <GrStar className="star-item" size={18} color="yellow" />
            <GrStar className="star-item" size={18} color="yellow" />
            <GrStar className="star-item" size={18} color="yellow" />
            {title}
          </div>
          <div className="w-[10%] flex justify-end">
            <BsBookmarkStarFill size={24} color="orange" />
          </div>
        </div>
        <div className="my-2 flex items-center justify-around">
          <span className="font-bold text-green-600">{attributes?.price}</span>
          <span>{attributes?.acreage}</span>
          <span>{address}</span>
        </div>
        <p className="text-gray-500 w-full h-[50px] text-ellipsis overflow-hidden">
          {description}
        </p>
        <div className="flex items-center my-5 justify-between">
          <div className="flex items-center">
            <img
              src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2281862025.jpg"
              alt="avatar"
              className="w-[30px] h-[30px] object-cover"
            />
            <p>{user?.name}</p>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="bg-blue-700 text-white p-1 rounded-md"
            >
              {`Gọi ${user?.phone}`}
            </button>
            <button
              type="button"
              className="text-blue-700 p-1 rounded-md border border-blue-700"
            >
              Nhắn zalo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Item);