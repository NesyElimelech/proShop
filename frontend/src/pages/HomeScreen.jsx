import React from 'react';
// Components
import Product from '../components/Product';
// Data
import products from '../products';
// Styles
import { Row, Col } from 'react-bootstrap';

const HomeScreen = () => {
  return (
    <div className="mt-5">
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HomeScreen;
