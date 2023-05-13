import { useMutation, useQuery } from "@apollo/client";
import React, { Fragment } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { getBooks, getSingleBook } from "../graphql-client/queries";
import { deleteSingleBook } from "../graphql-client/mutaions";
import { useState } from "react";
import { Link } from "react-router-dom";
import FormEdit from "./FormEdit";

const BookDetails = ({ bookID }) => {
  const [deleteBook, dataMutaion] = useMutation(deleteSingleBook);
  const [show, setShow] = useState(true);
  const [bookEdit, setBookEdit] = useState(null);
  // Lấy dữ liệu từ query getSingleBook
  const { loading, error, data } = useQuery(getSingleBook, {
    variables: {
      // khai báo id phải giống bên queries.js là $id
      id: bookID,
    },
    //  khi book Id == null thì nó sẽ dừng và không chạyyjf
    skip: bookID === null,
  });

  if (loading) return <p>Loading book detail.....</p>;
  if (bookID !== null && error) {
    console.log(error.message);
    return <p>Error loading book detail ......</p>;
  }

  const book = bookID !== null ? data.book : null;

  function handleDele(event) {
    event.preventDefault();
    const id = book.id;
    deleteBook({
      variables: { id },
      refetchQueries: [{ query: getBooks }],
    });
    setShow(false);
  }

  return (
    <Card bg="info" text="white" className="shadow">
      <Card.Body>
        {book === null ? (
          <Card.Text>Please select a book</Card.Text>
        ) : (
          <Fragment>
            <Card.Title>{book.name}</Card.Title>
            <Card.Subtitle>{book.genre}</Card.Subtitle>
            <p>{book.author.name}</p>
            <p>Age: {book.author.age}</p>
            <p>All books by this author</p>
            <ul>
              {book.author.books.map((item) => (
                <li key={book.id}>{item.name}</li>
              ))}
            </ul>
            <ButtonGroup aria-label="Basic example">
              <Button onClick={handleDele} variant="secondary">
                Xoá
              </Button>{" "}
              <hr></hr>
              <br></br>
            </ButtonGroup>
          </Fragment>
        )}
      </Card.Body>
      <FormEdit bookID={bookID} book={book} />
    </Card>
  );
};

export default BookDetails;
