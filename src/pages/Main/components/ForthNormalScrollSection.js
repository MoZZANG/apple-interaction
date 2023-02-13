import React from "react";
import styled from "@emotion/styled";

const ForthNormalScrollSection = ({ showMessage }) => {
  return (
    <Section>
      <MidMessage>
        <strong>Retina 머그컵</strong>
        <br />
        아이디어를 광활하게 펼칠
        <br />
        아름답고 부드러운 음료 공간.
      </MidMessage>
      <Caption>
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
};

const Section = styled.section`
  padding-top: 50vh;
`;
const MidMessage = styled.p`
  font-size: 2rem;
  padding: 0 1rem;
  color: #888;
  max-width: 1000px;
  margin: 0 auto;

  strong {
    color: black;
  }

  @media (min-width: 1024px) {
    font-size: 4vw;
  }
`;
const Caption = styled.p`
  color: #888;
  padding: 0 1rem;
  font-size: 1.2rem;
  max-width: 1000px;
  margin: 0 auto;

  @media (min-width: 1024px) {
    font-size: 2rem;
  }
`;

export default ForthNormalScrollSection;
