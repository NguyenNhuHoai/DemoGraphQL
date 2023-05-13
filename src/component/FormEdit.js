import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useMutation, useQuery } from "@apollo/client";
import { getAuthors, getBooks, getSingleBook } from "../graphql-client/queries";
import { editSingleBook } from "../graphql-client/mutaions";
const FormEdit = ({ bookID, book }) => {
  const [editBook, dataMutation] = useMutation(editSingleBook);
  const { loading, error, data } = useQuery(getAuthors);

  console.log(bookID);
  const [bookEdit, setBookEdit] = useState({
    name: "",
    genre: "",
    id: bookID,
  });

  const { name, genre, id } = bookEdit;
  function handleChangeValue(event) {
    setBookEdit((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }
  function hanleClickEdit() {
    console.log(bookEdit);
  }
  function handleSave(event) {
    event.preventDefault();

    editBook({
      variables: {
        id,
        name,
        genre,
      },
      refetchQueries: [{ query: getBooks }],
    });
  }
  return (
    <Form
    // onSubmit={onSubmit}
    >
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Book name"
          value={bookEdit.name}
          onChange={handleChangeValue}
          name="name"
        ></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Book genre"
          value={bookEdit.genre}
          onChange={handleChangeValue}
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
            value={bookEdit.authorId}
            onChange={handleChangeValue}
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
      <Button onClick={hanleClickEdit} variant="secondary">
        Sửa
      </Button>
      <Button
        onClick={handleSave}
        className="float-right"
        variant="info"
        type="submit"
      >
        Lưu
      </Button>
    </Form>
  );
};

export default FormEdit;
