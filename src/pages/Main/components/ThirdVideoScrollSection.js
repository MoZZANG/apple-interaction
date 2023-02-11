import React, { forwardRef } from "react";
import styled from "@emotion/styled";

const ThirdVideoScrollSection = () => {
  const stickyDescMsgData = [
    {
      comment:
        "편안한 목넘김을 완성하는 디테일한 여러 구성 요소들, 우리는 이를 하나하나 새롭게 살피고 재구성하는 과정을 거쳐 새로운 수준의 머그, AirMug Pro를 만들었습니다. 입에 뭔가 댔다는 감각은 어느새 사라지고 오롯이 당신과 음료만 남게 되죠.",
    },
    {
      comment: `디자인 앤 퀄리티 오브 스웨덴,\n메이드 인 차이나`,
    },
  ];
  return (
    <Section>
      <StickyMessage>
        <p>
          <small>편안한 촉감</small>입과 하나되다
        </p>
      </StickyMessage>
      {stickyDescMsgData.map((data, i) => {
        return (
          <StickyDescMsg key={i}>
            <p>{data.comment}</p>
            <Pin></Pin>
          </StickyDescMsg>
        );
      })}
    </Section>
  );
};

const Section = styled.section``;
const StickyMessage = styled.div`
  display: block;
  position: sticky;
  top: 0;
  left: 0;
  font-size: 3.5rem;
  line-height: 1.2;
  font-weight: bold;
  text-align: center;

  small {
    display: block;
    font-size: 1.2rem;
    margin-bottom: 0.5em;
  }

  @media (min-width: 1024px) {
    font-size: 6vw;

    small {
      font-size: 1.5vw;
    }
  }
`;

const StickyDescMsg = styled.div`
  display: block;
  position: sticky;
  top: ${({ index }) => (index ? "15%" : "10%")};
  left: ${({ index }) => (index ? "45%" : "40%")};
  font-weight: bold;
  width: 50%;
  white-space: pre-wrap;

  @media (min-width: 1024px) {
    width: 20%;
    left: ${({ index }) => (index ? "55%" : "53%")};
  }
`;

const Pin = styled.div`
  width: 1px;
  height: 100px;
  background-color: black;
`;

export default ThirdVideoScrollSection;
