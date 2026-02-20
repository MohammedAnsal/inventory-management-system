import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export interface JWTPayload {
  userId: string;
  email: string;
}

const ACCESS_TOKEN =
  process.env.JWT_ACCESS_SECRET ||
  "5b31b8a136aea4e77156c90072185cc0bc2f31e784129b569f8b8dc2082ce8cd";

const REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET ||
  "39769aee2efe8ef7df54a4c4e4f0f5161e657fd0c8cffbae50afee9c6df53cc1";

const VERIFY_EMAIL_SECRET =
  process.env.VERIFY_EMAIL_SECRET || "yV9rZlD5rQsG3T2nH7uXpJk4SvWtMnBb";

export const generateAccessToken = (payload: object) => {
  return jwt.sign(payload, ACCESS_TOKEN, { expiresIn: "24h" });
};

export const generateRefreshToken = (payload: object) => {
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: "7d" });
};

export const generateEmailVerificationToken = (email: string) => {
  return jwt.sign({ email }, VERIFY_EMAIL_SECRET, { expiresIn: "7d" }); // ✅ 7 days
};

export const verifyAccessToken = (token: string): JWTPayload | null => {
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN) as JWTPayload;
    return decoded;
  } catch {
    return null;
  }
};

export const verifyRefreshToken = (token: string): JWTPayload | null => {
  try {
    const decoded = jwt.verify(token, REFRESH_SECRET) as JWTPayload;
    return decoded;
  } catch {
    return null;
  }
};

export const verifyEmailToken = (token: string): string => {
  try {
    const decoded = jwt.verify(token, VERIFY_EMAIL_SECRET) as { email: string };
    return decoded.email;
  } catch (error: any) {
    if (error?.name === "TokenExpiredError") {
      throw new Error("TokenExpiredError");
    }
    throw new Error("Invalid verification token");
  }
};
