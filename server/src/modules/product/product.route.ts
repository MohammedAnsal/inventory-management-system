import express from "express";
import * as productController from "./product.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
import { authorization } from "../../middleware/authrization.middleware";

const productRoutes = express.Router();

productRoutes.post(
  "/",
  authMiddleware,
  authorization,
  productController.create,
);
productRoutes.get("/", authMiddleware, authorization, productController.getAll);
productRoutes.put(
  "/:id",
  authMiddleware,
  authorization,
  productController.update,
);
productRoutes.delete(
  "/:id",
  authMiddleware,
  authorization,
  productController.remove,
);

export default productRoutes;
