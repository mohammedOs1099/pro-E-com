// src/pages/NotFound.js
import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container className="text-center my-2 vh-100 ">
      <h1 className="display-4 text-danger">404</h1>
      <p className="lead"> Not Found Page! </p>
      <Link to="/">
        <Button variant="success"> Back To Home  </Button>
      </Link>
    </Container>
  );
};

export default NotFound;
