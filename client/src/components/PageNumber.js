import React, { memo } from "react";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const active =
  "w-[46px] h-[48px] flex items-center justify-center bg-[#E13427] text-white hover:opacity-90 rounded-md";
const noActive =
  "w-[46px] h-[48px] flex items-center justify-center bg-white hover:bg-gray-300 rounded-md";

const PageNumber = ({ text, currentPage, icon, setCurrentPage }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [paramsSearch] = useSearchParams();
  let entries = paramsSearch.entries();

  const append = (entries) => {
    let params = [];
    paramsSearch.append("page", +text);
    for (let entry of entries) {
      params.push(entry);
    }
    let a = {};
    params?.map((i) => {
      a = { ...a, [i[0]]: i[1] };
    });
    return a;
  };

  const handleChangePage = () => {
    if (!(text === "...")) {
      setCurrentPage(+text);
      navigate({
        pathname: location.pathname,
        search: createSearchParams(append(entries)).toString(),
      });
    }
  };
  return (
    <div
      className={
        +text === +currentPage
          ? `${active} ${text === "..." ? "cursor-text" : "cursor-pointer"}`
          : `${noActive} ${text === "..." ? "cursor-text" : "cursor-pointer"}`
      }
      onClick={handleChangePage}
    >
      {icon || text}
    </div>
  );
};

export default memo(PageNumber);
