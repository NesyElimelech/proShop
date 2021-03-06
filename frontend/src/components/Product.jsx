import React from 'react';
// Routing
import { Link } from 'react-router-dom';
// Components
import Rating from './Rating';
// Styles
import { Card } from 'react-bootstrap';

// Renders a list of products cards in the homepage.
const Product = ({ product }) => {
  return (
    <Card className="my-3 rounded card">
      <Link to={`/products/${product._id}`}>
        <Card.Img variant="top" src={product.image} alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/products/${product._id}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          ></Rating>
        </Card.Text>
        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
