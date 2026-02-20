import { Product, IProduct } from "../../models/product.model";
import {
  CreateProductInput,
  UpdateProductInput,
  SafeProduct,
  PaginatedProducts,
} from "./product.types";
import { AppError } from "../../utils/custom.error";
import { HttpStatus } from "../../enums/http.status";
import mongoose from "mongoose";

const toSafeProduct = (product: IProduct): SafeProduct => ({
  _id: product._id.toString(),
  name: product.name,
  description: product.description,
  price: product.price,
  quantity: product.quantity,
  createdAt: product.createdAt,
});

/**
 * CREATE PRODUCT
 */
export const createProduct = async (
  input: CreateProductInput,
  userId: string,
): Promise<SafeProduct> => {
  const product = await Product.create({
    ...input,
    createdBy: new mongoose.Types.ObjectId(userId),
  });

  return toSafeProduct(product);
};

/**
 * GET ALL PRODUCTS (PAGINATED)
 */
export const getAllProducts = async (
  userId: string,
  page = 1,
  limit = 10,
  search?: string,
): Promise<PaginatedProducts> => {
  const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
  const safeLimit =
    Number.isFinite(limit) && limit > 0 && limit <= 100
      ? Math.floor(limit)
      : 10;

  const filter: Record<string, unknown> = {
    createdBy: userId,
  };

  if (search && search.trim()) {
    filter.name = {
      $regex: search.trim(),
      $options: "i",
    };
  }

  const skip = (safePage - 1) * safeLimit;

  const [products, total] = await Promise.all([
    Product.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(safeLimit),
    Product.countDocuments(filter),
  ]);

  const totalPages =
    safeLimit > 0 ? Math.max(1, Math.ceil(total / safeLimit)) : 1;

  return {
    products: products.map(toSafeProduct),
    pagination: {
      total,
      page: safePage,
      limit: safeLimit,
      totalPages,
    },
  };
};

/**
 * UPDATE PRODUCT
 */
export const updateProduct = async (
  productId: string,
  input: UpdateProductInput,
  userId: string,
): Promise<SafeProduct> => {
  const product = await Product.findOneAndUpdate(
    { _id: productId, createdBy: userId },
    input,
    { new: true },
  );

  if (!product) {
    throw new AppError(HttpStatus.NOT_FOUND, "Product not found");
  }

  return toSafeProduct(product);
};

/**
 * DELETE PRODUCT
 */
export const deleteProduct = async (
  productId: string,
  userId: string,
): Promise<void> => {
  const product = await Product.findOneAndDelete({
    _id: productId,
    createdBy: userId,
  });

  if (!product) {
    throw new AppError(HttpStatus.NOT_FOUND, "Product not found");
  }
};
