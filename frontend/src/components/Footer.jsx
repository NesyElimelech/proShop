import React from 'react';
// Styles
import { Container, Row, Col } from 'react-bootstrap';

// Renders the footer component
const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">Copyright &copy; ProShop</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
