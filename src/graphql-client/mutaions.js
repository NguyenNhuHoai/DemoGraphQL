import { gql } from "@apollo/client";

const addSingleBook = gql`
  mutation addSingleBookMutaion($name: String, $genre: String, $authorId: ID!) {
    createBook(name: $name, genre: $genre, authorId: $authorId) {
      id
      name
    }
  }
`;

const addSingleAuthor = gql`
  mutation addSingleAuthorMutation($name: String, $age: Int) {
    createAuthor(name: $name, age: $age) {
      id
      name
    }
  }
`;

const deleteSingleBook = gql`
  mutation deleteSingleBookMutation($id: ID!) {
    deleteBook(id: $id) {
      id
    }
  }
`;

const editSingleBook = gql`
  mutation editSingleBookMutation(
    $id: ID!
    $name: String
    $genre: String

  ) {
    updateBook(id: $id, name: $name, genre: $genre) {
      id
      name
      genre
    }
  }
`;

export { addSingleBook, addSingleAuthor, deleteSingleBook, editSingleBook };
