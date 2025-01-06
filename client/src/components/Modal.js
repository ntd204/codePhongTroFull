import React, { useEffect, useState } from "react";

import icons from "../ultils/icons";

const { GrLinkPrevious } = icons;

const Modal = ({ setIsShowModal, content, name }) => {
  const [persent1, setPersent1] = useState(0);
  const [persent2, setPersent2] = useState(100);
  const [activeEl, setActiveEl] = useState("");

  useEffect(() => {
    const activeTrackEl = document.getElementById("track-active");
    if (activeTrackEl) {
      if (persent2 <= persent1) {
        activeTrackEl.style.left = `${persent2}%`;
        activeTrackEl.style.right = `${100 - persent1}%`;
      } else {
        activeTrackEl.style.left = `${persent1}%`;
        activeTrackEl.style.right = `${100 - persent2}%`;
      }
    }
  }, [persent1, persent2]);

  const handleClickStack = (e, value) => {
    const stackEl = document.getElementById("track");
    const stackReact = stackEl.getBoundingClientRect();
    let persent = value
      ? value
      : Math.round(((e.clientX - stackReact.left) * 100) / stackReact.width, 0);
    if (Math.abs(persent - persent1) <= Math.abs(persent - persent2)) {
      setPersent1(persent);
    } else {
      setPersent2(persent);
    }
  };

  const convert100toTarget = (persent) => {
    return name === "prices"
      ? (Math.ceil(Math.round(persent * 1.5) / 5) * 5) / 10
      : name === "areas"
      ? (Math.ceil(Math.round(persent * 0.9)) / 5) * 5
      : 0;
  };

  const convert15to100 = (persent) => {
    let target = name === "prices" ? 15 : name === "areas" ? 90 : 1;
    return Math.floor((persent / target) * 100);
  };
  const getNumbers = (string) =>
    string
      .split(" ")
      .map((item) => +item)
      .filter((item) => !item === false);
  const getNumbersArea = (string) =>
    string
      .split(" ")
      .map((item) => +item.match(/\d+/))
      .filter((item) => item !== 0);
  const handleActive = (code, value) => {
    setActiveEl(code);
    let arrMaxMin =
      name === "prices" ? getNumbers(value) : getNumbersArea(value);
    if (arrMaxMin.length === 1) {
      if (arrMaxMin[0] === 1) {
        setPersent1(0);
        setPersent2(convert15to100(1));
      }
      if (arrMaxMin[0] === 20) {
        setPersent1(0);
        setPersent2(convert15to100(20));
      }
      if (arrMaxMin[0] === 15 || arrMaxMin[0] === 90) {
        setPersent1(100);
        setPersent2(100);
      }
    }
    if (arrMaxMin.length === 2) {
      setPersent1(convert15to100(arrMaxMin[0]));
      setPersent2(convert15to100(arrMaxMin[1]));
    }
  };

  const handleSubmit = () => {
    console.log(convert100toTarget(persent1), "start");
    console.log(convert100toTarget(persent2), "end");
  };
  return (
    <div
      onClick={() => {
        setIsShowModal(false);
      }}
      className="fixed top-0 bottom-0 left-0 right-0 bg-overlay-70 z-20 flex justify-center items-center"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          setIsShowModal(true);
        }}
        className="w-1/3 bg-white rounded-md"
      >
        <div className="h-[45px] px-4 flex items-center border-b border-gray-200">
          <span
            onClick={(e) => {
              e.stopPropagation();
              setIsShowModal(false);
            }}
            className="cursor-pointer"
          >
            <GrLinkPrevious size={24} />
          </span>
        </div>
        {(name === "categories" || name === "provinces") && (
          <div className="p-4 flex flex-col">
            {content?.map((item) => {
              return (
                <span
                  key={item.code}
                  className="py-2 flex gap-2 items-center border-b border-gray-200"
                >
                  <input
                    type="radio"
                    name={name}
                    id={item.code}
                    value={item.code}
                  />
                  <label htmlFor={item.code}>{item.value}</label>
                </span>
              );
            })}
          </div>
        )}
        {(name === "prices" || name === "areas") && (
          <div className="p-12 py-20">
            <div className="flex flex-col items-center justify-center relative">
              <div className="z-30 absolute top-[-48px] font-bold text-xl text-orange-600">
                {`Từ ${
                  persent1 <= persent2
                    ? convert100toTarget(persent1)
                    : convert100toTarget(persent2)
                } - ${
                  persent2 >= persent1
                    ? convert100toTarget(persent2)
                    : convert100toTarget(persent1)
                } ${name === "prices" ? "triệu" : "m2"}`}
              </div>
              <div
                onClick={handleClickStack}
                id="track"
                className="slider-track h-[5px] absolute top-0 bottom-0 w-full bg-gray-300 rounded-full"
              ></div>
              <div
                onClick={handleClickStack}
                id="track-active"
                className="slider-track-active h-[5px] absolute top-0 bottom-0 bg-orange-600 rounded-full"
              ></div>
              <input
                max="100"
                min="0"
                step="1"
                type="range"
                value={persent1}
                className="w-full appearance-none pointer-events-none absolute top-0 bottom-0"
                onChange={(e) => {
                  setPersent1(+e.target.value);
                  activeEl && setActiveEl("");
                }}
              />
              <input
                max="100"
                min="0"
                step="1"
                type="range"
                value={persent2}
                className="w-full appearance-none pointer-events-none absolute top-0 bottom-0"
                onChange={(e) => {
                  setPersent1(+e.target.value);
                  activeEl && setActiveEl("");
                }}
              />
              <div className="absolute z-30 top-6 left-0 right-0 flex justify-between items-center">
                <span
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClickStack(e, 0);
                  }}
                >
                  0
                </span>
                <span
                  className="mr-[12px] cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClickStack(e, 100);
                  }}
                >
                  {name === "prices"
                    ? "15 triệu +"
                    : name === "areas"
                    ? "Trên 90m2"
                    : ""}
                </span>
              </div>
            </div>
            <div className="mt-24">
              <h4 className="font-medium mb-6">Chọn nhanh</h4>
              <div className="flex gap-2 items-center flex-wrap w-full">
                {content?.map((item) => {
                  return (
                    <button
                      key={item.code}
                      onClick={() => handleActive(item.code, item.value)}
                      className={`px-4 bg-gray-200 rounded-md cursor-pointer ${
                        item.code === activeEl ? "bg-[#FFA500] text-white" : ""
                      }`}
                    >
                      {item.value}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        {(name === "prices" || name === "areas") && (
          <button
            type="button"
            className="w-full bg-orange-400 py-2 font-medium rounded-bl-md rounded-br-md"
            onClick={handleSubmit}
          >
            ÁP DỤNG
          </button>
        )}
      </div>
    </div>
  );
};

export default Modal;
