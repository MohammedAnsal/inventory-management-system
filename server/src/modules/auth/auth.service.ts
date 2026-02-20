import { User, IUser } from "../../models/user.model";
import {
  hashPassword,
  comparePassword,
  generatePassword,
} from "../../utils/password";
import {
  generateAccessToken,
  generateRefreshToken,
  generateEmailVerificationToken,
  verifyEmailToken,
  JWTPayload,
  verifyRefreshToken,
} from "../../utils/jwt";
import { sendVerificationEmail } from "../../utils/email";
import { SignUpInput, SignInInput } from "./auth.schema";
import { SafeUserData } from "./auth.types";
import { AppError } from "../../utils/custom.error";
import { HttpStatus } from "../../enums/http.status";
import { OAuth2Client } from "google-auth-library";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * Remove sensitive fields
 */
const toSafeUserData = (user: IUser): SafeUserData => ({
  _id: user._id.toString(),
  fullName: user.fullName,
  email: user.email,
});

/**
 * REGISTER USER
 */
export const registerUser = async (
  input: SignUpInput,
): Promise<{ message: string }> => {
  const { fullName, email, password, confirmPassword } = input;

  if (password !== confirmPassword) {
    throw new AppError(
      HttpStatus.BAD_REQUEST,
      "Password and compare password do not match.",
    );
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    if (existingUser.is_verified) {
      throw new AppError(HttpStatus.BAD_REQUEST, "Email already registered");
    }

    throw new AppError(
      HttpStatus.BAD_REQUEST,
      "User already registered but not verified",
    );
  }

  const hashedPassword = await hashPassword(password);

  await User.create({
    fullName,
    email,
    password: hashedPassword,
    is_verified: false,
  } as IUser);

  const verificationToken = generateEmailVerificationToken(email);

  await sendVerificationEmail({
    email,
    token: verificationToken,
  });

  return {
    message: "Verification email sent. Please check your inbox.",
  };
};

/**
 * LOGIN USER
 */
export const loginUser = async (
  input: SignInInput,
): Promise<{
  user: SafeUserData;
  accessToken: string;
  refreshToken: string;
}> => {
  const { email, password } = input;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new AppError(HttpStatus.UNAUTHORIZED, "Invalid credentials");
  }

  if (!user.is_verified) {
    throw new AppError(
      HttpStatus.UNAUTHORIZED,
      "Email not verified. Please verify your email.",
    );
  }

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    throw new AppError(HttpStatus.UNAUTHORIZED, "Invalid credentials");
  }

  const payload: JWTPayload = {
    userId: user._id.toString(),
    email: user.email,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  return {
    user: toSafeUserData(user),
    accessToken,
    refreshToken,
  };
};

/**
 * VERIFY EMAIL
 */
// export const verifyUserEmail = async (
//   email: string,
//   token: string,
// ): Promise<{
//   user: SafeUserData;
//   accessToken: string;
//   refreshToken: string;
// }> => {
//   const user = await User.findOne({ email });

//   if (!user) {
//     throw new AppError(HttpStatus.NOT_FOUND, "User not found");
//   }

//   if (user.is_verified) {
//     throw new AppError(HttpStatus.BAD_REQUEST, "Email already verified");
//   }

//   const decodedEmail = verifyEmailToken(token);

//   if (decodedEmail !== email) {
//     throw new AppError(HttpStatus.UNAUTHORIZED, "Invalid or expired token");
//   }

//   user.is_verified = true;
//   await user.save();

//   const payload: JWTPayload = {
//     userId: user._id.toString(),
//     email: user.email,
//   };

//   const accessToken = generateAccessToken(payload);
//   const refreshToken = generateRefreshToken(payload);

//   return {
//     user: toSafeUserData(user),
//     accessToken,
//     refreshToken,
//   };
// };

export const verifyUserEmail = async (
  email: string,
  token: string,
): Promise<{
  user: SafeUserData;
  accessToken: string;
  refreshToken: string;
}> => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(HttpStatus.NOT_FOUND, "User not found.");
  }

  if (user.is_verified) {
    throw new AppError(HttpStatus.BAD_REQUEST, "Email is already verified.");
  }

  // ✅ Catch JWT errors specifically so they become proper AppErrors
  let decodedEmail: string;
  try {
    decodedEmail = verifyEmailToken(token);
  } catch (err: any) {
    // JsonWebTokenError, TokenExpiredError, etc.
    const isExpired = err?.name === "TokenExpiredError";
    throw new AppError(
      HttpStatus.UNAUTHORIZED,
      isExpired
        ? "Verification link has expired. Please request a new one."
        : "Invalid verification link.",
    );
  }

  if (decodedEmail !== email) {
    throw new AppError(
      HttpStatus.UNAUTHORIZED,
      "Verification link does not match this email.",
    );
  }

  user.is_verified = true;
  await user.save();

  const payload: JWTPayload = {
    userId: user._id.toString(),
    email: user.email,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  return {
    user: toSafeUserData(user),
    accessToken,
    refreshToken,
  };
};
/**
 * RESEND VERIFICATION EMAIL
 */
export const resendVerification = async (
  email: string,
): Promise<{ message: string }> => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(HttpStatus.NOT_FOUND, "User not found");
  }

  if (user.is_verified) {
    throw new AppError(
      HttpStatus.BAD_REQUEST,
      "Email already verified. Please login.",
    );
  }

  const verificationToken = generateEmailVerificationToken(email);

  await sendVerificationEmail({
    email,
    token: verificationToken,
  });

  return {
    message: "Verification email sent successfully.",
  };
};

/**
 * GOOGLE SIGN IN
 */
export const googleLogin = async (
  token: string,
): Promise<{
  user: SafeUserData;
  accessToken: string;
  refreshToken: string;
}> => {
  const ticket = await googleClient.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  if (!payload || !payload.email) {
    throw new AppError(HttpStatus.BAD_REQUEST, "Invalid Google token");
  }

  let user = await User.findOne({ email: payload.email });

  if (!user) {
    const randomPassword = await generatePassword();

    user = await User.create({
      fullName: payload.name,
      email: payload.email,
      password: randomPassword,
      is_verified: true,
    } as IUser);
  }

  const jwtPayload: JWTPayload = {
    userId: user._id.toString(),
    email: user.email,
  };

  const accessToken = generateAccessToken(jwtPayload);
  const refreshToken = generateRefreshToken(jwtPayload);

  return {
    user: toSafeUserData(user),
    accessToken,
    refreshToken,
  };
};

/**
 * GET CURRENT USER
 */
export const getCurrentUser = async (userId: string): Promise<SafeUserData> => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(HttpStatus.NOT_FOUND, "User not found");
  }

  return toSafeUserData(user);
};

export const refreshAccessToken = async (
  token: string,
): Promise<{ accessToken: string }> => {
  const decoded = verifyRefreshToken(token);

  if (!decoded || typeof decoded !== "object" || !("userId" in decoded)) {
    throw new AppError(
      HttpStatus.FORBIDDEN,
      "Invalid or expired refresh token",
    );
  }

  const user = await User.findById(decoded.userId);

  if (!user) {
    throw new AppError(HttpStatus.UNAUTHORIZED, "User not found");
  }

  const accessToken = generateAccessToken({
    userId: user._id.toString(),
    email: user.email,
  });

  return { accessToken };
};
