export interface CreateProductInput {
  name: string;
  description?: string;
  price: number;
  quantity: number;
}

export interface UpdateProductInput {
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
}

export interface SafeProduct {
  _id: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  createdAt: Date;
}

export interface ProductPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedProducts {
  products: SafeProduct[];
  pagination: ProductPagination;
}
