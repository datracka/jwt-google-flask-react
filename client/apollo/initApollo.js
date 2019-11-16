import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import fetch from "isomorphic-unfetch";
import { setContext } from "apollo-link-context";
import {
  TOKEN_KEY,
  getFromLocalStorage,
  removeLocalStorageKey,
} from "utils/local-storage";
import * as C from "constants";

const httpLink = new HttpLink({
  credentials: "same-origin",
  uri: process.env.GRAPHQL_ENDPOINT,
  useGETForQueries: false,
  fetch,
});

const authLink = setContext((_, { headers }) => {
  const token = getFromLocalStorage(TOKEN_KEY) || "";
  return {
    headers: {
      ...headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };
});

const errorsLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message }) => console.log(message));
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const cache = new InMemoryCache();

cache.writeData({
  data: {
    isDrawerOpened: false,
  },
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, errorsLink, httpLink]),
  cache,
});

export default client;
