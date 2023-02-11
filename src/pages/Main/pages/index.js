import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import FirstVideoScrollSection from "../components/FirstVideoScrollSection";
import ForthNormalScrollSection from "../components/ForthNormalScrollSection";
import SecondNormalScrollSection from "../components/SecondNormalScrollSection";
import ThirdVideoScrollSection from "../components/ThirdVideoScrollSection";
import { setLayout } from "../../../utils";

export const MainPage = () => {
  const mainRef = useRef();
  useEffect(() => {
    const sceneInfo = [
      {
        //0
        type: "sticky",
        heightNum: 5, //브라우저 높이의 몇배로 scrollHeight 세팅할지
        scrollHeight: 0,
        objs: {
          container: mainRef.current.childNodes[0],
        },
      },
      {
        //1
        type: "normal",
        heightNum: 5, //브라우저 높이의 몇배로 scrollHeight 세팅할지
        scrollHeight: 0,
        objs: {
          container: mainRef.current.childNodes[1],
        },
      },
      {
        //2
        type: "sticky",
        heightNum: 5, //브라우저 높이의 몇배로 scrollHeight 세팅할지
        scrollHeight: 0,
        objs: {
          container: mainRef.current.childNodes[2],
        },
      },
      {
        //3
        type: "sticky",
        heightNum: 5, //브라우저 높이의 몇배로 scrollHeight 세팅할지
        scrollHeight: 0,
        objs: {
          container: mainRef.current.childNodes[3],
        },
      },
    ];

    setLayout(sceneInfo);

    window.addEventListener("resize", () => {
      setLayout(sceneInfo);
    });

    return () => {
      removeEventListener("resize", () => {
        setLayout(sceneInfo);
      });
    };
  }, []);

  return (
    <MainLayout ref={mainRef}>
      <FirstVideoScrollSection />
      <SecondNormalScrollSection />
      <ThirdVideoScrollSection />
      <ForthNormalScrollSection />
    </MainLayout>
  );
};

const MainLayout = styled.div`
  > section {
    padding-top: 50vh;
  }
`;
