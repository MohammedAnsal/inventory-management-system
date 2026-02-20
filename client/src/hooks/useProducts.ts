import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../services/api/product";
import type { ProductPayload } from "../services/api/product";

const PRODUCTS_KEY = ["products"] as const;

export function useProducts() {
  const queryClient = useQueryClient();

  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: PRODUCTS_KEY,
    queryFn: getProducts,
  });

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: PRODUCTS_KEY });

  const addProduct = useMutation({
    mutationFn: (payload: ProductPayload) => createProduct(payload),
    onSuccess: () => {
      toast.success("Product created successfully.");
      invalidate();
    },
    onError: () => toast.error("Failed to create product."),
  });

  const editProduct = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: ProductPayload }) =>
      updateProduct(id, payload),
    onSuccess: () => {
      toast.success("Product updated successfully.");
      invalidate();
    },
    onError: () => toast.error("Failed to update product."),
  });

  const removeProduct = useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => {
      toast.success("Product deleted.");
      invalidate();
    },
    onError: () => toast.error("Failed to delete product."),
  });

  return {
    products,
    isLoading,
    isError,
    error,
    addProduct,
    editProduct,
    removeProduct,
  };
}
