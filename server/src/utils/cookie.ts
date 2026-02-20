import { Response } from "express";

const isProduction = process.env.NODE_ENV === "production";

export const setCookie = (
  res: Response,
  tokenName: string,
  token: string,
  maxAge: number = 7 * 24 * 60 * 60 * 1000, 
): void => {
  res.cookie(tokenName, token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge,
    path: "/",
  });
};

export const clearCookie = (res: Response, tokenName: string): void => {
  res.cookie(tokenName, "", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    expires: new Date(0),
    path: "/",
  });
};
