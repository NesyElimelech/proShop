import React, { useEffect } from 'react';
// Router
import { Link } from 'react-router-dom';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { listTopProducts } from '../store/actions/productActions';
// Components
import Loader from './Loader';
import Message from './Message';
// Styles
import { Carousel, Image } from 'react-bootstrap';

const ProductCarousel = () => {
  const dispatch = useDispatch();
  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;
  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger" children={error} />
  ) : (
    <Carousel
      pause="hover"
      indicators={false}
      touch={true}
      className="bg-primary rounded mb-5"
    >
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/products/${product._id}`}>
            <Carousel.Caption className="carousel-caption">
              <h2>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
            <Image src={product.image} alt={product.name} fluid />
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
