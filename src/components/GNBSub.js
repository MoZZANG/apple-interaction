import React from "react";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";

const GNBSub = () => {
  return (
    <NavLayout>
      <NavLinks>
        <NavLink>
          <NavItem>Airmug Pro</NavItem>
        </NavLink>
        <NavLink>
          <NavItem>개요</NavItem>
        </NavLink>
        <NavLink>
          <NavItem>제품사양</NavItem>
        </NavLink>
        <NavLink>
          <NavItem>구입하기</NavItem>
        </NavLink>
      </NavLinks>
    </NavLayout>
  );
};

const NavLayout = styled.div`
  position: sticky;
  top: 45px;
  left: 0;
  width: 100%;
  height: 52px;
  padding: 14px;
  border-bottom: 1px solid #ddd;
`;
const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  height: 100%;
  max-width: 1000px;
  margin: 0 auto;

  > a:first-of-type {
    margin-right: auto;
    font-size: 1.4rem;
    font-weight: bold;
  }

  > a:not(:first-of-type) {
    font-size: 0.8rem;
    margin-left: 2em;
  }
`;
const NavItem = styled.div``;

export default GNBSub;
