import React, { memo } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

const active =
  "w-[46px] h-[48px] flex items-center justify-center bg-[#E13427] text-white hover:bg-gray-300 rounded-md cursor-pointer";
const noActive =
  "w-[46px] h-[48px] flex items-center justify-center bg-white hover:bg-gray-300 rounded-md cursor-pointer";

const PageNumber = ({ text, currentPage, icon, setCurrentPage }) => {
  const navigate = useNavigate();
  const handleChangePage = () => {
    setCurrentPage(+text);
    navigate({
      pathname: "/",
      search: createSearchParams({
        page: text,
      }).toString(),
    });
  };
  return (
    <div
      className={+text === +currentPage ? active : noActive}
      onClick={handleChangePage}
    >
      {icon || text}
    </div>
  );
};

export default memo(PageNumber);
