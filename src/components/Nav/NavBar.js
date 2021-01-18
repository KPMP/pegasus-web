import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavLink, NavbarText, NavItem } from 'reactstrap';

class NavBar extends Component {
  render() {

    return (
      <Navbar id="navbar" className="fixed-top px-1 py-1">
        <NavbarBrand href="/" id="title-text" className="ml-2 text-dark">
          <img src="img/logo.png" alt="Kidney Tissue Atlas" className="logo" />
          <span className="ml-2">Kidney Tissue Atlas</span>
        </NavbarBrand>
        
          <Nav className="mr-auto">
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
        
      </Navbar>
      
      
    );
  }
}

export default NavBar;


/* <Navbar id="navbar" className="px-1 py-1 fixed-top">
          <div className="navbar-header">
            <NavbarBrand href="/" >
              <img src="img/logo.png" alt="Kidney Tissue Atlas" className="logo" />
              <span id="title-text" className="ml-2 text-dark">
                Kidney Tissue Atlas
              </span>
            </NavbarBrand>
          </div>
         
          <Nav className="mr-auto" navbar>
            <NavLink href="">Dashboard (Home)</NavLink>
            <NavLink>Analysis</NavLink>
            <NavLink href="">Explorer</NavLink>
            <NavLink href="">Repository</NavLink>
          </Nav>
          
      </Navbar> */