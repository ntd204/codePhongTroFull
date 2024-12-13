import React from "react";

import { List, Pagination } from "./index";
import { text } from "../../ultils/constant";
import { Province } from "../..//components";
import { useSearchParams } from "react-router-dom";

const Homepage = () => {
  const [params] = useSearchParams();
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
        <div className="w-[30%] border border-green-500">SideBar</div>
      </div>
    </div>
  );
};

export default Homepage;
