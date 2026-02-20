import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
  type GetProductsParams,
  type GetProductsResponse,
} from "../services/api/product";
import type { ProductPayload } from "../services/api/product";

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

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: PRODUCTS_KEY({ page, search }),
    queryFn: (): Promise<GetProductsResponse> =>
      getProducts({ page, limit, search }),
    keepPreviousData: true,
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

  const products = data?.data ?? [];
  const pagination = data?.pagination;

  return {
    products,
    pagination,
    isLoading,
    isError,
    error,
    addProduct,
    editProduct,
    removeProduct,
  };
}
