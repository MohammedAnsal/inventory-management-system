import { Request } from "express";
import { IUser } from "../../models/user.model";

export interface AuthRequest extends Request {
  user?: IUser;
}

export interface SafeUserData {
  _id: string;
  fullName: string;
  email: string;
}

export interface AuthResponse {
  user: SafeUserData;
  message: string;
}
