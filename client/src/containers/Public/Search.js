import React from "react";
import { SearchItem } from "../../components";
import icons from "../../ultils/icons";
import { FiSearch } from "react-icons/fi";

const {
  BsChevronRight,
  HiOutlineLocationMarker,
  TbReportMoney,
  RiCrop2Line,
  MdOutlineHouseSiding,
} = icons;
const Search = () => {
  return (
    <div className="p-[10px] bg-[#febb02] rounded-lg flex-col lg:flex-row flex items-center justify-around gap-2">
      <SearchItem
        IconBefore={<MdOutlineHouseSiding />}
        fontWeight
        IconAfter={<BsChevronRight />}
        text="Phòng trọ, nhà trọ"
      />
      <SearchItem
        IconBefore={<HiOutlineLocationMarker />}
        IconAfter={<BsChevronRight color="rbg(156, 163, 175" />}
        text="Toàn quốc"
      />
      <SearchItem
        IconBefore={<TbReportMoney />}
        IconAfter={<BsChevronRight color="rbg(156, 163, 175" />}
        text="Chọn giá"
      />
      <SearchItem
        IconBefore={<RiCrop2Line />}
        IconAfter={<BsChevronRight color="rbg(156, 163, 175" />}
        text="Chọn diện tích"
      />
      <button
        type="button"
        className="outline-none py-2 px-4 w-full bg-secondary1 text-[13.3px] flex items-center justify-center gap-2 text-white font-medium"
      >
        <FiSearch />
        Tìm kiếm
      </button>
    </div>
  );
};

export default Search;
