import { Response, NextFunction } from "express";
import { createProductSchema, updateProductSchema } from "./product.schema";
import * as productService from "./product.service";
import { HttpStatus } from "../../enums/http.status";
import { AuthRequest } from "../../interface/api";

export const create = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const parsedData = createProductSchema.parse(req.body);

    const product = await productService.createProduct(
      parsedData,
      req.user!.id.toString(),
    );

    res.status(HttpStatus.CREATED).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const getAll = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 10;
    const search =
      typeof req.query.search === "string" ? req.query.search : undefined;

    const { products, pagination } = await productService.getAllProducts(
      req.user!.id.toString(),
      page,
      limit,
      search,
    );

    res.status(HttpStatus.OK).json({
      success: true,
      data: products,
      pagination,
    });
  } catch (error) {
    next(error);
  }
};

export const update = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const parsedData = updateProductSchema.parse(req.body);

    const product = await productService.updateProduct(
      req.params.id as string,
      parsedData,
      req.user!.id.toString(),
    );

    res.status(HttpStatus.OK).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const remove = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    await productService.deleteProduct(
      req.params.id as string,
      req.user!.id.toString(),
    );

    res.status(HttpStatus.OK).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
