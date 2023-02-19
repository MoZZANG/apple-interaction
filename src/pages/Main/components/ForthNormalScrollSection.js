import React, { forwardRef } from "react";
import styled from "@emotion/styled";

const ForthNormalScrollSection = forwardRef((_, ref) => {
  const { fthSecCaptionRef, fthSecCanvasRef } = ref;
  return (
    <Section>
      <MidMessage>
        <strong>Retina 머그컵</strong>
        <br />
        아이디어를 광활하게 펼칠
        <br />
        아름답고 부드러운 음료 공간.
      </MidMessage>
      <canvas width="1920" height="1080" ref={fthSecCanvasRef} />
      <Caption ref={fthSecCaptionRef}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet at
        fuga quae perspiciatis veniam impedit et, ratione est optio porro.
        Incidunt aperiam nemo voluptas odit quisquam harum in mollitia. Incidunt
        minima iusto in corporis, dolores velit. Autem, sit dolorum inventore a
        rerum distinctio vero illo magni possimus temporibus dolores neque
        adipisci, repudiandae repellat. Ducimus accusamus similique quas earum
        laborum. Autem tempora repellendus asperiores illum ex! Velit ea
        corporis odit? Ea, incidunt delectus. Sapiente rerum neque error
        deleniti quis, et, quibusdam, est autem voluptate rem voluptas. Ratione
        soluta similique harum nihil vel. Quas inventore perferendis iusto
        explicabo animi eos ratione obcaecati.
      </Caption>
    </Section>
  );
});

const Section = styled.section`
  position: relative; // canvas.offsetTop을 위한 position
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50vh;
  > canvas {
    /* margin-left: 20px; */
  }
`;

const MidMessage = styled.p`
  width: 1000px;
  margin: 0 auto 10rem;
  padding: 0 1rem;
  font-size: 2rem;
  color: #888;

  strong {
    color: black;
  }

  @media (min-width: 1024px) {
    font-size: 4vw;
  }
`;
const Caption = styled.p`
  max-width: 1000px;
  margin: -8rem auto 0;
  padding: 0 1rem;
  font-size: 1.2rem;
  color: #888;

  @media (min-width: 1024px) {
    font-size: 2rem;
  }
`;

export default ForthNormalScrollSection;
