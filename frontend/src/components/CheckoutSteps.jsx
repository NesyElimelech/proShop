import React from 'react';
// Styles
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {step1 ? (
          <LinkContainer to="/login">
            <Nav.Link>
              <i className="fas fa-sign-in-alt"></i> Sign in
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            <i className="fas fa-sign-in-alt"></i> Sign in
          </Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <LinkContainer to="/shipping">
            <Nav.Link>
              <i className="fas fa-shipping-fast"></i> Shipping
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            <i className="fas fa-shipping-fast"></i> Shipping
          </Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <LinkContainer to="/payment">
            <Nav.Link>
              <i className="far fa-credit-card"></i> Payment
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            <i className="far fa-credit-card"></i> Payment
          </Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step4 ? (
          <LinkContainer to="/placeorder">
            <Nav.Link>
              <i className="fas fa-box"></i> Place Order
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            <i className="fas fa-box"></i> Place Order
          </Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
