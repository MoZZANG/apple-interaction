import React from "react";
import styled from "@emotion/styled";

const SecondNormalScrollSection = () => {
  return (
    <Section>
      <p>
        <strong>보통 스크롤 영역</strong>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita, rem
        aperiam laboriosam optio ut illo at officia voluptates adipisci eos
        natus dignissimos alias omnis inventore facilis magnam cumque delectus!
        Quidem possimus aspernatur accusamus ab. Praesentium voluptas ratione
        eum ad veniam odio itaque accusamus repudiandae? Eum dignissimos error
        ipsum nemo doloremque impedit repudiandae itaque sint iure repellendus
        autem eaque exercitationem recusandae nihil natus provident, nostrum
        asperiores nisi illum placeat quam tenetur quos? Officia, modi. Rem
        repellendus corporis corrupti eius et, iste excepturi explicabo tempore
        repellat quod veritatis voluptas atque consequuntur nisi nemo doloribus
        delectus ab beatae, assumenda quidem consequatur porro reiciendis
        tempora. Voluptates excepturi, inventore nemo ullam soluta corrupti
        voluptate iure ipsa quo, molestias tempora dolorum optio aliquid vitae
        deserunt ipsum tenetur aperiam qui. Cupiditate hic neque dolor eligendi
        deserunt libero, facere laborum? Excepturi eos corrupti facilis? Sit
        dolores, cum delectus, rem mollitia aspernatur magnam culpa sint
        corrupti dolorum adipisci ea deserunt reiciendis expedita nobis soluta
        sed non omnis dolorem eum dolor, tempore quis! Itaque quasi modi
        accusamus error alias odit velit expedita, eveniet dolores, dolore vitae
        rerum saepe cum laboriosam nesciunt exercitationem dolorum labore
        distinctio deleniti quas quidem delectus quos quis. Dicta odit et,
        aliquam est officiis repellat. Magni, blanditiis.
      </p>
    </Section>
  );
};

const Section = styled.section`
  p {
    font-size: 1.2rem;
    color: #888;
    padding: 0 1rem;
    font-size: 1.2rem;
    max-width: 1000px;

    strong {
      font-size: 3rem;
      color: rgb(29, 29, 31);
      float: left;
      margin-right: 0.2em;
    }
  }

  @media (min-width: 1024px) {
    p {
      margin: 0 auto;
      font-size: 2rem;
    }

    strong {
      font-size: 6rem;
    }
  }
`;

export default SecondNormalScrollSection;
