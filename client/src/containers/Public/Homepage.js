import React from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { List, Pagination } from "./index";
import { text } from "../../ultils/constant";
import { ItemSidebar, Province } from "../..//components";

const Homepage = () => {
  const [params] = useSearchParams();
  const { categories } = useSelector((state) => state.app);
  return (
    <div className="border border-red-500 w-full flex flex-col gap-3">
      <div>
        <h1 className="text-[28px] font-bold">{text.HOME_TITLE}</h1>
        <p className="text-sm text-gray-700">{text.HOME_DESCRIPTION}</p>
      </div>
      <Province />
      <div className="w-full flex gap-4">
        <div className="w-[70%]">
          <List page={params.get("page")} />
          <Pagination page={params.get("page")} />
        </div>
        <div className="w-[30%] border border-green-500 flex flex-col gap-4 justify-start items-center">
          <ItemSidebar content={categories} title="Danh sách cho thuê" />
          <ItemSidebar title="Xem theo giá" />
          <ItemSidebar title="Xem theo diện tích" />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
