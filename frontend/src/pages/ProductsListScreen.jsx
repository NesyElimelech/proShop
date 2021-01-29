import React, { useState, useEffect } from 'react';
// components
import Paginate from '../components/Paginate';
import Loader from '../components/Loader';
import Message from '../components/Message';
// Router
import { LinkContainer } from 'react-router-bootstrap';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  listProducts,
  createProduct,
  deleteProduct,
} from '../store/actions/productActions';
import { PRODUCT_CREATE_RESET } from '../store/constants/productConstants';
// Styles
import { Table, Button, Modal, Row, Col } from 'react-bootstrap';

const ProductsListScreen = ({ match, history }) => {
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;
  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;
  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;
  const [show, setShow] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteHandler = (id) => {
    if (show) {
      dispatch(deleteProduct(id));
    }
    handleClose();
  };
  const createProductHandler = () => {
    dispatch(createProduct());
  };
  useEffect(() => {
    dispatch({
      type: PRODUCT_CREATE_RESET,
    });
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login');
    }
    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts('', pageNumber));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ]);
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products List</h1>
        </Col>
        <Col className="text-right">
          <Button
            className="my-3"
            variant="outline-primary rounded"
            onClick={createProductHandler}
          >
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger" children={errorDelete} />}
      {successDelete && (
        <Message variant="success" children={'Delete Successful'} />
      )}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger" children={errorCreate} />}
      {successCreate && <Message variant="success" children={successCreate} />}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger" children={error} />
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => handleShow()}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                  <Modal show={show} onHide={handleClose} animation={true}>
                    <Modal.Header closeButton>
                      <Modal.Title>Delete User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      You are about to delete this product, Are you sure?
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => deleteHandler(product._id)}
                      >
                        Delete Product
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Paginate pages={pages} page={page} isAdmin={true} url={'productslist'} />
    </>
  );
};

export default ProductsListScreen;
