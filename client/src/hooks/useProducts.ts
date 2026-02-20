import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
  extractErrorMessage,
  type GetProductsParams,
  type GetProductsResponse,
  type ProductPayload,
} from "../services/api/product";

const PRODUCTS_KEY = ({
  page,
  search,
}: Pick<GetProductsParams, "page" | "search">) =>
  ["products", { page, search }] as const;

interface UseProductsParams {
  page: number;
  limit: number;
  search?: string;
}

export function useProducts({ page, limit, search }: UseProductsParams) {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery<GetProductsResponse>({
    queryKey: PRODUCTS_KEY({ page, search }),
    queryFn: () => getProducts({ page, limit, search }),
    placeholderData: (previousData: GetProductsResponse | undefined) =>
      previousData, // ✅ v5 syntax
  });

  const invalidate = () =>
    queryClient.invalidateQueries({
      queryKey: PRODUCTS_KEY({ page, search }),
    });

  const addProduct = useMutation({
    mutationFn: (payload: ProductPayload) => createProduct(payload),
    onSuccess: () => {
      toast.success("Product created successfully.");
      invalidate();
    },
    onError: (error) =>
      toast.error(extractErrorMessage(error, "Failed to create product.")),
  });

  const editProduct = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: ProductPayload }) =>
      updateProduct(id, payload),
    onSuccess: () => {
      toast.success("Product updated successfully.");
      invalidate();
    },
    onError: (error) =>
      toast.error(extractErrorMessage(error, "Failed to update product.")),
  });

  const removeProduct = useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => {
      toast.success("Product deleted.");
      invalidate();
    },
    onError: (error) =>
      toast.error(extractErrorMessage(error, "Failed to delete product.")),
  });

  return {
    products: data?.data ?? [],
    pagination: data?.pagination,
    isLoading,
    isError,
    error,
    addProduct,
    editProduct,
    removeProduct,
  };
}
