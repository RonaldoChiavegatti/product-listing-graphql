export interface Product {
  id: number;
  nome: string;
  descricao: string;
  valor: number;
  disponivel: boolean;
  criado_em: string;
  userId: number;
}

export interface CreateProductInput {
  nome: string;
  descricao: string;
  valor: number;
  disponivel: boolean | string;
}

export interface UpdateProductInput {
  id: number;
  nome?: string;
  descricao?: string;
  valor?: number;
  disponivel?: boolean;
}

export interface ProductsResponse {
  products: Product[];
  totalCount: number;
}