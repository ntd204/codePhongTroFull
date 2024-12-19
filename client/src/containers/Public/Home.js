import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";

import Header from "./Header";
import Navigation from "./Navigation";
import { Contact, Intro } from "../../components";
import * as actions from "../../store/actions";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getPrices());
    dispatch(actions.getAreas());
  }, []);
  return (
    <div className="w-full flex gap-4 flex-col items-center h-full border">
      <Header />
      <Navigation />
      <div className="w-4/5 lg:w-3/5 flex flex-col items-center justify-start mt-3">
        <Outlet />
      </div>
      <Intro />
      <Contact />
      <div className="h-[500px]"></div>
    </div>
  );
};

export default Home;
