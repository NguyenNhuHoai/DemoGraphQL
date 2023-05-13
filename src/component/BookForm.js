import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { getAuthors, getBooks } from "../graphql-client/queries";
import { useMutation, useQuery } from "@apollo/client";
import { addSingleBook } from "../graphql-client/mutaions";
const BookForm = () => {
  const [newBook, setNewBook] = useState({
    name: "",
    genre: "",
    authorId: "",
  });
  const { name, genre, authorId } = newBook;
  const onInputChange = (event) => {
    setNewBook({
      ...newBook,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    addBook({
      variables: {
        name,
        genre,
        authorId,
      },
      refetchQueries: [{ query: getBooks }],
    });
    setNewBook({
      name: "",
      genre: "",
      authorId: "",
    });
  };
  const { loading, error, data } = useQuery(getAuthors);

  // addBook là hàm để gọi lên mutaion vừa mới khai báo
  // dataMutaion
  const [addBook, dataMutation] = useMutation(addSingleBook);

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Book name"
          onChange={onInputChange}
          value={name}
          name="name"
        ></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Book genre"
          onChange={onInputChange}
          value={genre}
          name="genre"
        ></Form.Control>
      </Form.Group>
      <Form.Group>
        {loading ? (
          <p>loading author......</p>
        ) : (
          <Form.Control
            as="select"
            name="authorId"
            onChange={onInputChange}
            value={authorId}
          >
            <option value="" disabled>
              Select author
            </option>
            {data.authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </Form.Control>
        )}
      </Form.Group>
      <Button className="float-right" variant="info" type="submit">
        Add Book
      </Button>
    </Form>
  );
};

export default BookForm;
