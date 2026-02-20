import { Response } from "express";

const isProduction = process.env.NODE_ENV === "production";

/**
 * Sets an HTTP-only cookie with JWT token
 * @param res - Express response object
 * @param tokenName - Name of the cookie (e.g., 'accessToken' or 'refreshToken')
 * @param token - JWT token value
 * @param maxAge - Cookie expiration time in milliseconds (default: 7 days)
 */
export const setCookie = (
  res: Response,
  tokenName: string,
  token: string,
  maxAge: number = 7 * 24 * 60 * 60 * 1000 // 7 days default
): void => {
  res.cookie(tokenName, token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge,
    path: "/",
  });
};

/**
 * Clears a cookie by setting it to expire immediately
 * @param res - Express response object
 * @param tokenName - Name of the cookie to clear
 */
export const clearCookie = (res: Response, tokenName: string): void => {
  res.cookie(tokenName, "", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    expires: new Date(0),
    path: "/",
  });
};
