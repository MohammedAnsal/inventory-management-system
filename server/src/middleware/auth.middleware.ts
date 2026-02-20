import { Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt";
import { AuthRequest } from "../modules/auth/auth.types";
import { User } from "../models/user.model";
import { HttpStatus, responseMessage } from "../enums/http.status";

/**
 * Middleware to verify JWT token from cookie and attach user to request
 */
export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Get token from cookie
    const token = req.cookies?.accessToken;

    if (!token) {
      res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: responseMessage.LOGIN_REQUIRED,
      });
      return;
    }

    // Verify token
    const decoded = verifyAccessToken(token);

    if (!decoded) {
      res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: responseMessage.TOKEN_ACCESS,
      });
      return;
    }

    // Find user by ID
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: responseMessage.TOKEN_ACCESS,
      });
      return;
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    res.status(HttpStatus.UNAUTHORIZED).json({
      success: false,
      message: responseMessage.TOKEN_ACCESS,
    });
  }
};
