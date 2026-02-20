import { publicAxiosInstance } from "../axiosInstance/userInstance";
import axios from "axios";

const publicApi = publicAxiosInstance;

// Extracts the most useful error message from an Axios error
export function extractErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      fallback
    );
  }
  if (error instanceof Error) return error.message;
  return fallback;
}

export const signUp = async (formData: object) => {
  const response = await publicApi.post("/api/auth/signUp", formData);
  return response.data;
};

export const signIn = async (formData: object) => {
  const response = await publicApi.post("/api/auth/signIn", formData);
  return response.data;
};

export const googleRequest = async (token: string) => {
  const response = await publicApi.post("/api/auth/google-signIn", { token });
  return response.data;
};

export const verifyEmail = async (email: string, token: string) => {
  const response = await publicApi.get(
    `/api/auth/verify-email?email=${email}&token=${token}`,
  );
  return response.data;
};

export const resendVerificationEmail = async (email: string) => {
  const response = await publicApi.post("/api/auth/resend-verification", {
    email,
  });
  return response.data;
};
