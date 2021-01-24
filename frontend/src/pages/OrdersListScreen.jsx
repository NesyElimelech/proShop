import React, { useEffect } from 'react';
// Router
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getOrdersList } from '../store/actions/orderActions';
import { ORDER_LIST_RESET } from '../store/constants/orderConstants';
// Components
import Loader from '../components/Loader';
import Message from '../components/Message';
// Styles
import { Button, Table } from 'react-bootstrap';

const OrdersListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const ordersList = useSelector((state) => state.ordersList);
  const { loading, error, orders } = ordersList;

  // const [show, setShow] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  // const deleteHandler = (id) => {
  //   if (show) {
  //     dispatch();
  //   }
  //   handleClose();
  // };
  useEffect(() => {
    dispatch({
      type: ORDER_LIST_RESET,
    });
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login');
    }

    dispatch(getOrdersList());
  }, [dispatch, history, userInfo]);
  return (
    <>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger" children={error} />
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>
                  <Link to={`/order/${order._id}`}>{order._id}</Link>
                </td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10) +
                    ' ' +
                    order.paidAt.substring(11, 19)
                  ) : (
                    <i className="fas fa-times" style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10) +
                    ' ' +
                    order.deliveredAt.substring(11, 19)
                  ) : (
                    <i className="fas fa-times" style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant="light" className="btn-sm">
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrdersListScreen;
