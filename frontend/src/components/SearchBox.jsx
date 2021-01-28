import React, { useState } from 'react';
// Styles
import { Form, Button } from 'react-bootstrap';

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  };
  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products..."
        className="mr-sm-2 ml-sm-5 formControl searchbox"
      ></Form.Control>
      <Button
        type="submit"
        variant="outline-light rounded"
        className="py-2 px-3 my-3"
      >
        <i className="fas fa-search"></i> <strong>Search</strong>
      </Button>
    </Form>
  );
};

export default SearchBox;
