import React from "react";
import { ProvinceBtn } from "./index";
import { location } from "../ultils/constant";

const Province = () => {
  return (
    <div className="flex items-center justify-center gap-5 p-5 shadow-md cursor-pointer">
      {location.map((item) => {
        return (
          <ProvinceBtn key={item.id} image={item.image} name={item.name} />
        );
      })}
    </div>
  );
};

export default Province;
