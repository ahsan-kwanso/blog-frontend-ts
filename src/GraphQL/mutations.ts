import { gql } from "@apollo/client";

// GraphQL mutation for login
export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(loginDto: { email: $email, password: $password }) {
      message
      token
    }
  }
`;
