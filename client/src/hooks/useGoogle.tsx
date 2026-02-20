import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { googleRequest } from "../services/api/auth";
import { toast } from "sonner";
import { useAuthStore } from "../store/useAuthStore";

export const useGoogle = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const { mutate: googleLogin } = useMutation({
    mutationFn: (credential: string) => googleRequest(credential),

    onSuccess: (response) => {
      if (!response?.success) return;

      const { accessToken, user } = response;

      localStorage.setItem("access-token", accessToken);

      login({
        userId: user._id,
        fullName: user.fullName,
        email: user.email,
        token: accessToken,
      });

      toast.success("Login successful!");
      navigate("/dashboard");
    },

    onError: (error: unknown) => {
      console.error("Google login failed:", error);
      toast.error("Google login failed. Please try again.");
    },
  });

  const handleGoogleSuccess = (credentialResponse: any) => {
    if (!credentialResponse.credential) {
      toast.error("Google login failed. Please try again.");
      return;
    }
    googleLogin(credentialResponse.credential);
  };

  const handleGoogleError = () => {
    toast.error("Google login failed. Please try again.");
  };

  return { handleGoogleSuccess, handleGoogleError };
};
