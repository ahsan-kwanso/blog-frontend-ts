// GraphQL/mutations.js

import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($loginDto: LoginDto!) {
    login(loginDto: $loginDto) {
      message
      token
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation Signup($signupDto: SignupDto!) {
    signup(signupDto: $signupDto) {
      message
    }
  }
`;

export const SIGNOUT_MUTATION = gql`
  mutation Signout {
    signout {
      message
    }
  }
`;

export const CREATE_POST_MUTATION = gql`
  mutation CreatePost($createPostDto: CreatePostDto!) {
    createPost(createPostDto: $createPostDto) {
      message
    }
  }
`;
