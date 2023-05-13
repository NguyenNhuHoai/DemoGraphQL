import Container from "react-bootstrap/Container";
import BookList from "./component/BookList";
import Form from "./component/Forms";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// uri là đường dẫn tới máy chủ GraphQL
// cache là một đối tượng bộ nhớ đệm được sử dụng để lưu trữ dữ liệu trả về từ máy chủ GraphQL để tối ưu hiệu suất của ứng dụng.
// Trong trường hợp này thì nó được tạo bởi InMemoryCache của Apoloclient
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Container className="py-3 mt-3" style={{ backgroundColor: "lightcyan" }}>
        <h1 className="text-center text-info mb-3">My Books</h1>
        <hr></hr>
        <Form />
        <hr></hr>
        <BookList />
      </Container>
    </ApolloProvider>
  );
}

export default App;
