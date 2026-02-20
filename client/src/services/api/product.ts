import { userAxiosInstance } from "../axiosInstance/userInstance";
import axios from "axios";

const productApi = userAxiosInstance;

export function extractErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      fallback
    );
  }
  if (error instanceof Error) return error.message;
  return fallback;
}

export interface Product {
  _id: string;
  id: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  createdAt: string;
}

export interface ProductPayload {
  name: string;
  description?: string;
  price: number;
  quantity: number;
}

export interface ProductPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GetProductsParams {
  page: number;
  limit: number;
  search?: string;
}

export interface GetProductsResponse {
  success: boolean;
  data: Product[];
  pagination: ProductPagination;
}

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("access-token")}`,
});

export const getProducts = async ({
  page,
  limit,
  search,
}: GetProductsParams): Promise<GetProductsResponse> => {
  const response = await productApi.get("/api/products", {
    params: { page, limit, search: search || undefined },
    headers: authHeader(),
  });
  return response.data;
};

export const createProduct = async (
  payload: ProductPayload,
): Promise<Product> => {
  const response = await productApi.post("/api/products", payload, {
    headers: authHeader(),
  });
  return response.data;
};

export const updateProduct = async (
  id: string,
  payload: ProductPayload,
): Promise<Product> => {
  const response = await productApi.put(`/api/products/${id}`, payload, {
    headers: authHeader(),
  });
  return response.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await productApi.delete(`/api/products/${id}`, {
    headers: authHeader(),
  });
};
