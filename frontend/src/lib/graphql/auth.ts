import { gql } from '@apollo/client';

export const REGISTER = gql`
  mutation Register($registerInput: RegisterInput!) {
    register(registerInput: $registerInput) {
      access_token
      error {
        message
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      access_token
      error {
        message
      }
    }
  }
`; 