import { Request } from "express";
import { IUser } from "../../models/user.model";

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
