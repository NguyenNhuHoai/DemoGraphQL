import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CardGroup from "react-bootstrap/CardGroup";
import BookDetails from "./BookDetails";
import { useQuery } from "@apollo/client";
import { getBooks } from "../graphql-client/queries";

const BookList = () => {
  const [bookSelected, setBookSelected] = useState(null);
  // Lấy dữ liệu từ getBooks
  const { loading, error, data } = useQuery(getBooks);
  if (loading) return <p>Loading books...</p>;
  if (error) return <p>error loading books....</p>;

  return (
    <Row xs={1} md={2} className="g-4">
      <Col>
        {data.books.map((book) => (
          <Card
            border="info"
            text="infor"
            className="text-center shadow"
            key={book.id}
            onClick={setBookSelected.bind(this, book.id)}
          >
            <Card.Body>{book.name}</Card.Body>
            </Card>
        ))}
      </Col>
      <Col>
        <BookDetails bookID={bookSelected} />
      </Col>
    </Row>
  );
};

export default BookList;
