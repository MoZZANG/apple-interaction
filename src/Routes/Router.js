import React from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "../components/Footer";
import GNBSub from "../components/GNBSub";
import GNBUpper from "../components/GNBUpper";
import { MainPage } from "../pages/Main/pages";

const Router = () => {
  return (
    <>
      <GNBUpper />
      <GNBSub />
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default Router;
