import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";

const FirstVideoScrollSection = () => {
  const stickyMsgData = [
    { upper: "온전히 빠져들기 하는", lower: "최고급 세라믹" },
    { upper: " 주변 맛을 느끼게 해주는", lower: " 주변 맛 허용모드" },
    { upper: "온종일 편안한", lower: "맞춤형 손잡이" },
    { upper: "새롭게 입가를", lower: "찾아온 매혹" },
  ];
  return (
    <Section>
      <h1>AirMug Pro</h1>
      <div>
        <canvas
          css={css`
          width: :1920px;
          height: 1080px;
          `}
        />
      </div>
      {stickyMsgData.map((data, i) => {
        return (
          <StickyMessage key={i}>
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
};

const Section = styled.section`
  font-size: 4rem;
  text-align: center;

  @media (min-width: 1024px) {
    h1 {
      font-size: 9vw;
    }
  } ;
`;
const StickyMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3em;
  font-size: 2.5rem;
  margin: 5px 0;
  position: sticky;
  width: 100%;
  top: 35vh;
  left: 0;
  /* opacity: 0; */
  > p {
    line-height: 1.2;
    font-weight: bold;
    text-align: center;
  }

  @media (min-width: 1024px) {
    font-size: 4vw;
  }
`;

export default FirstVideoScrollSection;
