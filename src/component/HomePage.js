import React from "react";
import Container from "react-bootstrap/esm/Container";
import { Form } from "react-router-dom";
import BookList from "./BookList";

const HomePage = () => {
  return (
    <Container className="py-3 mt-3" style={{ backgroundColor: "lightcyan" }}>
      <h1 className="text-center text-info mb-3">My Books</h1>
      <hr></hr>
      <Form />
      <hr></hr>
      <BookList />
    </Container>
  );
};

export default HomePage;
