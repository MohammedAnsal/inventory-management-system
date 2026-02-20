import { Product, IProduct } from "../../models/product.model";
import {
  CreateProductInput,
  UpdateProductInput,
  SafeProduct,
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
 * GET ALL PRODUCTS
 */
export const getAllProducts = async (
  userId: string,
): Promise<SafeProduct[]> => {
  const products = await Product.find({ createdBy: userId }).sort({
    createdAt: -1,
  });

  return products.map(toSafeProduct);
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
