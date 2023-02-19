import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import FirstVideoScrollSection from "../components/FirstVideoScrollSection";
import ForthNormalScrollSection from "../components/ForthNormalScrollSection";
import SecondNormalScrollSection from "../components/SecondNormalScrollSection";
import ThirdVideoScrollSection from "../components/ThirdVideoScrollSection";
import { getRemoveOnRenderTree, scrollLoop, setLayout } from "../../../utils";
import {
  fstSecOpacityInValue,
  fstSecOpacityOutValue,
  fstSecTranslateYInValue,
  fstSecTranslateYOutValue,
  trdSecPinsOpacityOutValue,
  trdSecOpacityInValue,
  trdSecOpacityOutValue,
  trdSecPinsOpacityInValue,
  trdSecTranslateYInValue,
  trdSecTranslateYOutValue,
  trdSecPinsScaleYValue,
} from "../data/animationData";

export const MainPage = () => {
  const mainRef = useRef();
  /**현재 viewport 이전의 scroll 높이의 합 */
  const prevScrollHeightRef = useRef(0);
  /**useEffect에서 호출하는 함수의 클로저 해결을 위한 현재 section index */
  const currSecIdxRef = useRef(0);
  const fstSecStickyMsgArrRef = useRef([]);
  const fstSecCanvasRef = useRef();
  const trdSecStickyMsgArrRef = useRef([]);
  const trdSecPinArrRef = useRef([]);
  const trdSecCanvasRef = useRef();
  const fthSecCaptionRef = useRef();
  const fthSecCanvasRef = useRef();
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
          canvas: fstSecCanvasRef.current,
          context: fstSecCanvasRef.current.getContext("2d"),
          videoImagesArr: [],
        },
        values: {
          msg_opacity_in_arr: fstSecOpacityInValue,
          msg_opacity_out_arr: fstSecOpacityOutValue,
          msg_translate_in_arr: fstSecTranslateYInValue,
          msg_translate_out_arr: fstSecTranslateYOutValue,
          videoImageCount: 300,
          imageSequence: [0, 299],
          canvas_opacity: [1, 0, { start: 0.85, end: 0.95 }],
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
          sticky_msgs: trdSecStickyMsgArrRef.current,
          pins: trdSecPinArrRef.current,
          canvas: trdSecCanvasRef.current,
          context: trdSecCanvasRef.current.getContext("2d"),
          videoImagesArr: [],
        },
        values: {
          msg_opacity_in_arr: trdSecOpacityInValue,
          msg_opacity_out_arr: trdSecOpacityOutValue,
          msg_translate_in_arr: trdSecTranslateYInValue,
          msg_translate_out_arr: trdSecTranslateYOutValue,
          pins_opacity_in_arr: trdSecPinsOpacityInValue,
          pins_opacity_out_arr: trdSecPinsOpacityOutValue,
          pins_scaleY_arr: trdSecPinsScaleYValue,
          videoImageCount: 960,
          imageSequence: [0, 959],
          canvas_opacity_in: [0, 1, { start: 0, end: 0.1 }],
          canvas_opacity_out: [1, 0, { start: 0.9, end: 1 }],
        },
      },
      {
        //3
        type: "sticky",
        heightNum: 5,
        scrollHeight: 0,
        objs: {
          container: mainRef.current.childNodes[3],
          canvasCaption: fthSecCaptionRef.current,
          canvas: fthSecCanvasRef.current,
          context: fthSecCanvasRef.current.getContext("2d"),
          imagesArr: [],
        },
        values: {
          imagesCount: 2,
          leftRectCoorX: [0, 0, { start: 0, end: 0 }],
          rightRectCoorX: [0, 0, { start: 0, end: 0 }],
          blendHeight: [0, 0, { start: 0, end: 0 }],
          canvas_scale: [0, 0, { start: 0, end: 0 }],
          canvasCaption_opacity: [0, 1, { start: 0, end: 0 }],
          canvasCaption_translateY: [20, 0, { start: 0, end: 0 }],
          rectStartY: 0,
        },
      },
    ];

    setLayout(sceneInfos, currSecIdxRef);

    window.addEventListener("resize", () => {
      setLayout(sceneInfos, currSecIdxRef);
    });
    window.addEventListener("load", () => {
      setLayout(sceneInfos, currSecIdxRef);
      if (currSecIdxRef.current === 0)
        sceneInfos[0].objs.context.drawImage(
          sceneInfos[0].objs.videoImagesArr[0],
          0,
          0
        );
    });
    window.addEventListener("scroll", () => {
      scrollLoop(sceneInfos, prevScrollHeightRef, setCurrSecIdx, currSecIdxRef);
    });

    return () => {
      window.removeEventListener("resize", () => {
        setLayout(sceneInfos, currSecIdxRef);
      });
      window.removeEventListener("load", () => {
        setLayout(sceneInfos, currSecIdxRef);
      });

      window.removeEventListener("scroll", () => {
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
      <FirstVideoScrollSection
        ref={{ fstSecStickyMsgArrRef, fstSecCanvasRef }}
      />
      <SecondNormalScrollSection />
      <ThirdVideoScrollSection
        ref={{ trdSecStickyMsgArrRef, trdSecPinArrRef, trdSecCanvasRef }}
      />
      <ForthNormalScrollSection ref={{ fthSecCaptionRef, fthSecCanvasRef }} />
    </MainLayout>
  );
};

const MainLayout = styled.div`
  > section {
    /* padding-top: 45vh; */
  }
`;
