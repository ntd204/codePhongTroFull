import React, { memo } from "react";
import icons from "../ultils/icons";

const images = [
  "https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2024/05/25/346156342-912750189784159-8201713291621173062-n_1716642305.jpg",
  "https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2024/05/25/344287999-200282962867082-2291105629241911601-n_1716642303.jpg",
  "https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2024/05/25/344295635-159893796816891-3296185884470786401-n_1716642303.jpg",
  "https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2024/05/25/344668767-239524092063472-3669298212386847303-n_1716642304.jpg",
];

const { GrStar, RiHeartFill, RiHeartLine, BsBookmarkStarFill } = icons;

const Item = () => {
  return (
    <div className="w-full flex border-t border-orange-600 p-4">
      <div className="w-2/5 flex flex-wrap gap-[2px] items-center">
        <img
          src={images[0]}
          alt="preview"
          className="w-[140px] h-[120px] object-cover"
        />
        <img
          src={images[1]}
          alt="preview"
          className="w-[140px] h-[120px] object-cover"
        />
        <img
          src={images[2]}
          alt="preview"
          className="w-[140px] h-[120px] object-cover"
        />
        <img
          src={images[3]}
          alt="preview"
          className="w-[140px] h-[120px] object-cover"
        />
      </div>
      <div className="w-3/5">
        <div className="w-full flex justify-between gap-4">
          <div className="text-red-600 font-medium">
            <GrStar className="star-item" size={18} color="yellow" />
            <GrStar className="star-item" size={18} color="yellow" />
            <GrStar className="star-item" size={18} color="yellow" />
            <GrStar className="star-item" size={18} color="yellow" />
            <GrStar className="star-item" size={18} color="yellow" />
            CHO THUÊ CĂN HỘ HOẶC VĂN PHÒNG LÀM VIỆC
          </div>
          <div className="w-[10%] flex justify-end">
            <BsBookmarkStarFill size={24} color="orange" />
          </div>
        </div>
        <div className="my-2 flex items-center justify-around">
          <span className="font-bold text-green-600">3.7 triệu/tháng</span>
          <span>28m</span>
          <span>Quận Tân Bình, Hồ Chí Minh</span>
        </div>
        <p className="text-gray-500">
          --------------------------------------------- 👉 Tui có nhận code các
          project đồ án hoặc website theo yêu cầu nha. Cứ inbox trao đổi ạ 🙏
          Ủng hộ tui thì dô đây nha:
        </p>
        <div className="flex items-center my-5 justify-between">
          <div className="flex items-center">
            <img
              src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2281862025.jpg"
              alt="avatar"
              className="w-[30px] h-[30px] object-cover"
            />
            <p>Tuệ Thu</p>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="bg-blue-700 text-white p-1 rounded-md"
            >
              Gọi 3243242341424
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
