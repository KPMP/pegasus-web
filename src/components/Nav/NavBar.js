import React, { Component, useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';


const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar id="navbar" className="fixed-top px-1 py-1 container-fluid" expand="md" light>
        <NavbarBrand href="/" className="ml-2 text-dark">
          <img src="img/logo.png" alt="Kidney Tissue Atlas" className="logo" />
          <span id="title-text" className="ml-2">Kidney Tissue Atlas</span>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/">Dashboard (Home)</NavLink>
            </NavItem>
            <NavItem>
              <NavbarText className="inactive">Analysis</NavbarText>
            </NavItem>
            <NavItem className="active">
              <NavLink href="/explorer">Explorer</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/repository">Repository</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>

       
    </div>
  );
}

export default NavBar;