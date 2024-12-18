import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Item } from "../../components";
import { getPostsLimit } from "../../store/actions/post";

const List = ({ page }) => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    let offset = page ? +page - 1 : 0;
    dispatch(getPostsLimit({ offset }));
  }, [page]);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Cập nhật mỗi giây

    return () => clearInterval(timer); // Xóa timer khi component bị unmount
  }, []);
  return (
    <div className="w-full p-2 bg-white shadow-md rounded-md px-6">
      <div className="flex items-center justify-between my-3">
        <h4 className="text-xl font-semibold ">Danh sách tin đăng</h4>
        <span>
          Cập nhật: {currentTime.getHours()}:{currentTime.getMinutes()}{" "}
          {currentTime.toLocaleDateString()}
        </span>
      </div>
      <div className="flex items-center gap-2 my-2">
        <span>Sắp xếp:</span>
        <Button bgColor="bg-gray-200" text="Mặc định" />
        <Button bgColor="bg-gray-200" text="Mới nhất" />
      </div>
      <div className="items">
        {posts?.length > 0 &&
          posts.map((item) => {
            return (
              <Item
                key={item?.id}
                address={item?.address}
                attributes={item?.attributes}
                description={JSON.parse(item?.description)}
                images={JSON.parse(item?.images?.image)}
                star={+item?.star}
                title={item?.title}
                user={item?.user}
                id={item?.id}
              />
            );
          })}
      </div>
    </div>
  );
};

export default List;
