import { create } from "zustand";

interface AuthState {
  user: any | null;
  isLoaded: boolean;
  setUser: (user: any) => void;
  clearUser: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") || "null") : null,
  isLoaded: false,
  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user, isLoaded: true });
  },
  clearUser: () => {
    localStorage.removeItem("user");
    set({ user: null, isLoaded: true });
  },
}));

export default useAuthStore;
