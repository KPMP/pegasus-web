import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from 'reactstrap';


const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Container>
      <Navbar id="navbar" className="fixed-top px-1 py-1 mb-3 container-fluid" expand="md" light>
        <NavbarBrand href="/" className="ml-2 text-dark d-flex align-items-center">
          <img src="/explorer/img/logo.png" alt="Kidney Tissue Atlas" className="logo" />
          <span id="title-text" className="ml-2">Kidney Tissue Atlas</span>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem className="px-1">
              <NavLink href="/"><span className="nav-text px-1">Dashboard (Home)</span></NavLink>
            </NavItem>
            <NavItem className="active px-1">
              <NavLink href="/explorer"><span className="nav-text px-1">Explorer</span></NavLink>
            </NavItem>
            <NavItem className="px-1">
              <NavLink href="/repository"><span className="nav-text px-1">Repository</span></NavLink>
            </NavItem>
          </Nav>
          <Nav>
            <NavItem className="test px-1">
              <NavLink href="https://www.kpmp.org/help-docs/data">
                <i className="far fa-question-circle"></i>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </Container>
  );
}

export default NavBar;