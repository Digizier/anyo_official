import { create } from "zustand";

interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  role: "super_admin" | "editor" | "viewer";
}

interface AuthState {
  isAdmin: boolean;
  user: AdminUser | null;
  setAdminSession: (user: AdminUser) => void;
  logoutAdmin: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAdmin: false,
  user: null,
  setAdminSession: (user) => set({ isAdmin: true, user }),
  logoutAdmin: () => set({ isAdmin: false, user: null }),
}));
