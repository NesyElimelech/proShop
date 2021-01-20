import React, { useState, useEffect } from 'react';
// Router
import { LinkContainer } from 'react-router-bootstrap';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { listUsers, deleteUser } from '../store/actions/userActions';
// Components
import Loader from '../components/Loader';
import Message from '../components/Message';
// Styles
import { Table, Button, Modal } from 'react-bootstrap';

const UsersListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const usersList = useSelector((state) => state.usersList);
  const { loading, error, users } = usersList;
  const [show, setShow] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const deleteHandler = (id) => {
    if (show) {
      dispatch(deleteUser(id));
    }
    handleClose();
  };
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo, successDelete]);
  return (
    <>
      {successDelete ? (
        <Message variant="success" children={'User deleted'} />
      ) : (
        <></>
      )}
      <h1>Users</h1>
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
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: 'green' }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button
                      variant="light"
                      className="btn-sm"
                      disabled={user._id === userInfo._id}
                    >
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    disabled={user._id === userInfo._id}
                    onClick={() => handleShow()}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                  <Modal show={show} onHide={handleClose} animation={true}>
                    <Modal.Header closeButton>
                      <Modal.Title>Delete User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      You are about to delete this user, Are you sure?
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => deleteHandler(user._id)}
                      >
                        Delete User
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UsersListScreen;
