import React, { useState, useEffect } from 'react';
// Data
import axios from 'axios';
// Components
import Product from '../components/Product';
// Styles
import { Row, Col } from 'react-bootstrap';

const HomeScreen = () => {
  // Fetching data from the backend
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchedProducts = async () => {
      const { data } = await axios.get('/api/products');
      setProducts(data);
    };
    fetchedProducts();
  }, []);
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
