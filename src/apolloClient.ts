import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { backend_url } from "./utils/settings";

// Create an HTTP link to your GraphQL server
const httpLink = new HttpLink({
  uri: `${backend_url}/graphql`, // Replace with your GraphQL endpoint
  credentials: "include", // Ensure cookies are sent with requests
});

// Create the Apollo Client
const client = new ApolloClient({
  link: httpLink, // Use only the HTTP link
  cache: new InMemoryCache(),
});

export default client;
