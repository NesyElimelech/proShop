import React, { useEffect } from 'react';
// Router
import { Link } from 'react-router-dom';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../store/actions/productActions';
// Components
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
// Styles
import { Row, Col } from 'react-bootstrap';

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;
  // Fetching products list data from the database
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      <div className="mt-1 mb-5">
        {!keyword ? (
          <ProductCarousel />
        ) : (
          <Link to="/" className="btn btn-light m-2 ">
            Go Back
          </Link>
        )}

        <h1>Latest Products</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger" children={error} />
        ) : (
          <Row>
            {products.map((product) => (
              <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        )}
      </div>
      <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
    </>
  );
};

export default HomeScreen;
