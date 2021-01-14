import React from 'react';
// Routing
import { LinkContainer } from 'react-router-bootstrap';
// Styles
import { Navbar, Nav, Container } from 'react-bootstrap';

// Renders the navbar component
const Header = () => {
  return (
    <header className="mb-5">
      <Navbar
        bg="primary"
        variant="dark"
        expand="lg"
        collapseOnSelect
        fixed="top"
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <i className="fa fa-shopping-bag"></i> ProShop
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto ">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fa fa-shopping-cart"></i> Cart
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link>
                  <i className="fa fa-sign-in-alt"></i> Sign In
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
