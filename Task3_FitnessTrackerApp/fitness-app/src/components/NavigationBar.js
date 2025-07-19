import React from 'react';
import styled from 'styled-components';

const Navbar = styled.nav`
  background-color: #333;
  color: #fff;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
`;

const NavItem = styled.li`
  margin-right: 1rem;
  cursor: pointer;

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    text-decoration: underline;
  }
`;

function NavigationBar() {
  return (
    <Navbar>
      <Container>
        <NavList>
          <NavItem>Dashboard</NavItem>
          <NavItem>Profile</NavItem>
          <NavItem>Historical Data</NavItem>
          <NavItem>Settings</NavItem>
        </NavList>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;