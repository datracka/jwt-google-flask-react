import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "apollo";
import Routes from "./routes";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  );
};

export default App;
