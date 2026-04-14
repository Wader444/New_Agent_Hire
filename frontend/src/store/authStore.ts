import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  email: string | null;
  token: string | null;
  onboardingComplete: boolean;
  isAuthenticated: boolean;
  login: (email: string, token: string) => void;
  logout: () => void;
  completeOnboarding: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      email: null,
      token: null,
      onboardingComplete: false,
      isAuthenticated: false,
      login: (email, token) => set({ email, token, isAuthenticated: true }),
      logout: () =>
        set({
          email: null,
          token: null,
          isAuthenticated: false,
          onboardingComplete: false,
        }),
      completeOnboarding: () => set({ onboardingComplete: true }),
    }),
    {
      name: "agenthire-auth",
    },
  ),
);
