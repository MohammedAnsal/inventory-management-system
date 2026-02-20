import { Request } from "express";
import { IUser } from "../../models/user.model";

/**
 * Extended Express Request interface with user property
 */
export interface AuthRequest extends Request {
  user?: IUser;
}

/**
 * Safe user data (without password)
 */
export interface SafeUserData {
  _id: string;
  fullName: string;
  email: string;

}

/**
 * Auth response data
 */
export interface AuthResponse {
  user: SafeUserData;
  message: string;
}
