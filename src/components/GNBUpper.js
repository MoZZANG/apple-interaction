import React from "react";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";

const GNBUpper = () => {
  return (
    <NavLayout>
      <NavLinks>
        <NavLink>
          <NavItem>Rooms</NavItem>
        </NavLink>
        <NavLink>
          <NavItem>Ideas</NavItem>
        </NavLink>
        <NavLink>
          <NavItem>Stores</NavItem>
        </NavLink>
        <NavLink>
          <NavItem>Contact</NavItem>
        </NavLink>
      </NavLinks>
    </NavLayout>
  );
};

const NavLayout = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 44px;
  padding: 0 14px;
`;
const NavLinks = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  max-width: 1000px;
  margin: 0 auto;
`;
const NavItem = styled.div``;

export default GNBUpper;
