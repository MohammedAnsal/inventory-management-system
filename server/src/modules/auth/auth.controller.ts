import { Request, Response } from "express";
import { ZodError } from "zod";
import { AuthRequest } from "./auth.types";
import {
  registerUser,
  loginUser,
  verifyUserEmail,
  resendVerification,
  googleLogin,
  getCurrentUser,
  refreshAccessToken,
} from "./auth.service";
import { signUpSchema, signInSchema } from "./auth.schema";
import { setCookie, clearCookie } from "../../utils/cookie";
import { HttpStatus, responseMessage } from "../../enums/http.status";
import { AppError } from "../../utils/custom.error";

/**
 * Register Controller
 */
export const register = async (req: Request, res: Response) => {
  try {
    const parsedData = signUpSchema.parse(req.body);

    const result = await registerUser(parsedData);

    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: result.message,
    });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: error.issues[0]?.message ?? "Validation failed",
      });
    }

    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: responseMessage.ERROR_MESSAGE,
    });
  }
};

/**
 * Login Controller
 */
export const login = async (req: Request, res: Response) => {
  try {
    const parsedData = signInSchema.parse(req.body);

    const { user, accessToken, refreshToken } = await loginUser(parsedData);

    setCookie(res, "refresh_token", refreshToken);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: "Login successful",
      user,
      accessToken,
    });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: error.issues[0]?.message ?? "Validation failed",
      });
    }

    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: responseMessage.ERROR_MESSAGE,
    });
  }
};

/**
 * Verify Email Controller
 */

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;
    const token = req.query.token as string;

    if (!email || !token) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: "Email and token are required.",
      });
    }

    const { user, accessToken, refreshToken } = await verifyUserEmail(
      email,
      token,
    );

    setCookie(res, "refresh_token", refreshToken);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: "Email verified successfully",
      user,
      accessToken,
    });
  } catch (error: any) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }

    console.error("Unexpected verifyEmail error:", error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error?.message || "Internal server error"
          : "Something went wrong. Please try again.",
    });
  }
};

/**
 * Resend Verification Email Controller
 */
export const resendVerificationEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: "Email is required.",
      });
    }

    const result = await resendVerification(email);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: result.message,
    });
  } catch (error: any) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: responseMessage.ERROR_MESSAGE,
    });
  }
};

/**
 * Google Sign-In Controller
 */
export const googleSign = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: "Google token is required",
      });
    }

    const { user, accessToken, refreshToken } = await googleLogin(token);

    setCookie(res, "refresh_token", refreshToken);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: "Google login successful",
      user,
      accessToken,
    });
  } catch (error: any) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: responseMessage.ERROR_MESSAGE,
    });
  }
};

/**
 * Logout Controller
 */
export const logout = async (_req: Request, res: Response) => {
  try {
    clearCookie(res, "refresh_token");

    return res.status(HttpStatus.OK).json({
      success: true,
      message: "Logout successful",
    });
  } catch {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: responseMessage.ERROR_MESSAGE,
    });
  }
};

/**
 * Get Current User
 */
export const me = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: responseMessage.LOGIN_REQUIRED,
      });
    }

    const user = await getCurrentUser(req.user._id.toString());

    return res.status(HttpStatus.OK).json({
      success: true,
      message: responseMessage.SUCCESS_MESSAGE,
      user,
    });
  } catch {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: responseMessage.ERROR_MESSAGE,
    });
  }
};

/**
 * Get RefreshToken
 */

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const token = req.cookies?.refresh_token;

    if (!token) {
      return res.status(HttpStatus.FORBIDDEN).json({
        success: false,
        message: "Refresh token not found",
      });
    }

    const { accessToken } = await refreshAccessToken(token);

    return res.status(HttpStatus.OK).json({
      success: true,
      accessToken,
    });
  } catch (error: any) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error",
    });
  }
};
