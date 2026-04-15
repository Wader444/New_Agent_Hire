import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserRole = "client" | "freelancer" | null;

interface AuthState {
  email: string | null;
  token: string | null;
  role: UserRole;
  field: string | null;
  onboardingComplete: boolean;
  isAuthenticated: boolean;
  login: (email: string, token: string) => void;
  logout: () => void;
  completeOnboarding: (role: UserRole, field: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      email: null,
      token: null,
      role: null,
      field: null,
      onboardingComplete: false,
      isAuthenticated: false,
      login: (email, token) => set({ email, token, isAuthenticated: true }),
      logout: () =>
        set({
          email: null,
          token: null,
          role: null,
          field: null,
          isAuthenticated: false,
          onboardingComplete: false,
        }),
      completeOnboarding: (role, field) =>
        set({ role, field, onboardingComplete: true }),
    }),
    {
      name: "agenthire-auth",
    },
  ),
);
