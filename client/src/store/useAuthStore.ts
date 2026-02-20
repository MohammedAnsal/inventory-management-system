import { create } from "zustand";

interface AuthState {
  userId: string | null;
  email: string | null;
  fullName: string | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (payload: {
    userId: string;
    email: string;
    fullName: string;
    token: string;
  }) => void;
  logout: () => void;
}

const tokenFromStorage = localStorage.getItem("access-token");
const userFromStorageRaw = localStorage.getItem("auth-user");

let userFromStorage:
  | { userId: string; email: string; fullName: string }
  | null = null;

if (userFromStorageRaw) {
  try {
    userFromStorage = JSON.parse(userFromStorageRaw);
  } catch {
    userFromStorage = null;
  }
}

export const useAuthStore = create<AuthState>((set) => ({
  userId: userFromStorage?.userId ?? null,
  email: userFromStorage?.email ?? null,
  fullName: userFromStorage?.fullName ?? null,
  token: tokenFromStorage,
  isAuthenticated: Boolean(tokenFromStorage),
  login: ({ userId, email, fullName, token }) => {
    localStorage.setItem("access-token", token);
    localStorage.setItem(
      "auth-user",
      JSON.stringify({ userId, email, fullName }),
    );
    set({
      userId,
      email,
      fullName,
      token,
      isAuthenticated: true,
    });
  },
  logout: () => {
    localStorage.removeItem("access-token");
    localStorage.removeItem("auth-user");
    set({
      userId: null,
      email: null,
      fullName: null,
      token: null,
      isAuthenticated: false,
    });
  },
}));

