import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import FirstVideoScrollSection from "../components/FirstVideoScrollSection";
import ForthNormalScrollSection from "../components/ForthNormalScrollSection";
import SecondNormalScrollSection from "../components/SecondNormalScrollSection";
import ThirdVideoScrollSection from "../components/ThirdVideoScrollSection";
import { getRemoveOnRenderTree, scrollLoop, setLayout } from "../../../utils";
import { fstSecOpacityInValue } from "../data/animationData";

export const MainPage = () => {
  const mainRef = useRef();
  /**현재 viewport 이전의 scroll 높이의 합 */
  const prevScrollHeightRef = useRef(0);
  /**useEffect에서 호출하는 함수의 클로저 해결을 위한 현재 section index */
  const currSecIdxRef = useRef(0);
  const fstSecStickyMsgArrRef = useRef([]);
  const trdSecStickyMsgArrRef = useRef([]);
  const [currSceneIdx, setCurrSecIdx] = useState(0);

  useEffect(() => {
    /**모든 section에 대한 정보가 담긴 배열 */
    const sceneInfos = [
      {
        //0
        type: "sticky",
        heightNum: 5, //브라우저 높이의 몇배로 scrollHeight 세팅할지
        scrollHeight: 0,
        objs: {
          container: mainRef.current.childNodes[0],
          sticky_msgs: fstSecStickyMsgArrRef.current,
        },
        values: {
          msg_opacity_in_arr: fstSecOpacityInValue,
        },
      },
      {
        //1
        type: "normal",
        heightNum: 5,
        scrollHeight: 0,
        objs: {
          container: mainRef.current.childNodes[1],
        },
      },
      {
        //2
        type: "sticky",
        heightNum: 5,
        scrollHeight: 0,
        objs: {
          container: mainRef.current.childNodes[2],
          sticky_msgs: trdSecStickyMsgArrRef.current,
        },
      },
      {
        //3
        type: "sticky",
        heightNum: 5,
        scrollHeight: 0,
        objs: {
          container: mainRef.current.childNodes[3],
        },
      },
    ];

    setLayout(sceneInfos, currSecIdxRef);

    window.addEventListener("resize", () => {
      setLayout(sceneInfos, currSecIdxRef);
    });
    window.addEventListener("scroll", () => {
      scrollLoop(sceneInfos, prevScrollHeightRef, setCurrSecIdx, currSecIdxRef);
    });

    return () => {
      removeEventListener("resize", () => {
        setLayout(sceneInfos, currSecIdxRef);
      });

      removeEventListener("scroll", () => {
        scrollLoop(
          sceneInfos,
          prevScrollHeightRef,
          setCurrSecIdx,
          currSecIdxRef
        );
      });
    };
  }, []);

  useEffect(() => {
    const stickyMsgArrs = [
      fstSecStickyMsgArrRef,
      "",
      trdSecStickyMsgArrRef,
      "",
    ];
    getRemoveOnRenderTree(stickyMsgArrs, currSecIdxRef);
  }, [currSceneIdx]);

  return (
    <MainLayout ref={mainRef} className="test">
      <FirstVideoScrollSection ref={fstSecStickyMsgArrRef} />
      <SecondNormalScrollSection />
      <ThirdVideoScrollSection ref={trdSecStickyMsgArrRef} />
      <ForthNormalScrollSection />
    </MainLayout>
  );
};

const MainLayout = styled.div`
  > section {
    padding-top: 50vh;
  }
`;
