import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      nome
      descricao
      valor
      disponivel
      criado_em
      userId
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($createProductDto: CreateProductDto!) {
    createProduct(createProductDto: $createProductDto) {
      id
      nome
      descricao
      valor
      disponivel
      criado_em
      userId
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($updateProductDto: UpdateProductDto!, $id: Int!) {
    updateProduct(updateProductDto: $updateProductDto, id: $id) {
      id
      nome
      descricao
      valor
      disponivel
      criado_em
      userId
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: Int!) {
    removeProduct(id: $id) {
      id
      nome
      descricao
      valor
      disponivel
      criado_em
      userId
    }
  }
`; 