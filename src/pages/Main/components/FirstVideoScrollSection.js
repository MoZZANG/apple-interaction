import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { forwardRef } from "react";

const FirstVideoScrollSection = forwardRef((_, ref) => {
  const { fstSecStickyMsgArrRef, fstSecCanvasRef } = ref;
  const stickyMsgData = [
    { upper: "온전히 빠져들기 하는", lower: "최고급 세라믹" },
    { upper: " 주변 맛을 느끼게 해주는", lower: " 주변 맛 허용모드" },
    { upper: "온종일 편안한", lower: "맞춤형 손잡이" },
    { upper: "새롭게 입가를", lower: "찾아온 매혹" },
  ];
  return (
    <Section>
      <h1>AirMug Pro</h1>
      <CanvasWrapper>
        <canvas ref={fstSecCanvasRef} width="1920" height="1080"></canvas>
      </CanvasWrapper>
      {stickyMsgData.map((data, i) => {
        return (
          <StickyMessage
            key={i}
            ref={(elem) => (fstSecStickyMsgArrRef.current[i] = elem)}
          >
            <p>
              {data.upper}
              <br />
              {data.lower}
            </p>
          </StickyMessage>
        );
      })}
    </Section>
  );
});

const Section = styled.section`
  padding-top: 50vh;
  font-size: 4rem;
  text-align: center;

  > h1 {
    position: relative;
    top: -10vh;
    z-index: 5;
  }

  @media (min-width: 1024px) {
    h1 {
      font-size: 9vw;
    }
  } ;
`;
const StickyMessage = styled.div`
  display: none;
  /* justify-content: center;
  align-items: center; */
  /* height: 3em; */
  font-size: 2.5rem;
  /* margin: 5px 0; */
  position: sticky;
  width: 100%;
  top: 45vh;
  left: 0;
  opacity: 0;
  > p {
    line-height: 1.2;
    font-weight: bold;
    text-align: center;
  }

  @media (min-width: 1024px) {
    font-size: 4vw;
  }
`;

const CanvasWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 96px;
  left: 0;
  width: 100%;
  height: 100%;

  > canvas {
    position: absolute;
    top: 50%;
    left: 50%;
  }
`;

export default FirstVideoScrollSection;
