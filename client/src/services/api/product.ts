import { userAxiosInstance } from "../axiosInstance/userInstance";

const productApi = userAxiosInstance;

const handleResponse = (response: any, message: string) => {
  if (!response) console.error(message);
  return response;
};

const handleError = (error: any) => {
  console.error(error);
  throw error;
};

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

/**
 * GET ALL PRODUCTS
 */
export const getProducts = async () => {
  try {
    const response = await productApi.get("/api/products", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    });

    return handleResponse(response.data.data, "Error fetching products");
  } catch (error) {
    handleError(error);
  }
};

/**
 * CREATE PRODUCT
 */
export const createProduct = async (payload: ProductPayload) => {
  try {
    const response = await productApi.post("/api/products", payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    });

    return handleResponse(response.data, "Error creating product");
  } catch (error) {
    handleError(error);
  }
};

/**
 * UPDATE PRODUCT
 */
export const updateProduct = async (id: string, payload: ProductPayload) => {
  try {
    const response = await productApi.put(`/api/products/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    });

    return handleResponse(response.data, "Error updating product");
  } catch (error) {
    handleError(error);
  }
};

/**
 * DELETE PRODUCT
 */
export const deleteProduct = async (id: string) => {
  try {
    const response = await productApi.delete(`/api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    });

    return handleResponse(response.data, "Error deleting product");
  } catch (error) {
    handleError(error);
  }
};
