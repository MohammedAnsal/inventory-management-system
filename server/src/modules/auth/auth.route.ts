import express from "express";
import {
  googleSign,
  login,
  logout,
  me,
  register,
  refreshToken,
  resendVerificationEmail,
  verifyEmail,
} from "./auth.controller";

const authRouter = express.Router();

authRouter.post("/signUp", register);
authRouter.post("/signIn", login);
authRouter.get("/verify-email", verifyEmail);
authRouter.post("/google-signIn", googleSign);
authRouter.post("/resend-verification", resendVerificationEmail);
authRouter.post("/logout", logout);
authRouter.get("/refresh-token", refreshToken);
authRouter.get("/me", me);

export default authRouter;
