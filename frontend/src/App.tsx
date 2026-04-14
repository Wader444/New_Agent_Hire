import { PageLoader } from "@/components/base/LoadingSpinner";
import { useAuthStore } from "@/store/authStore";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";
import { Suspense, lazy } from "react";
import { Toaster } from "sonner";

// Lazy-loaded pages
const LandingPage = lazy(() => import("@/pages/LandingPage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const SignupPage = lazy(() => import("@/pages/SignupPage"));
const OnboardingPage = lazy(() => import("@/pages/OnboardingPage"));
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const PostProjectPage = lazy(() => import("@/pages/PostProjectPage"));
const FreelancersPage = lazy(() => import("@/pages/FreelancersPage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const PaymentSuccessPage = lazy(() => import("@/pages/PaymentSuccessPage"));

// Root route
const rootRoute = createRootRoute({
  component: () => (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      forcedTheme="light"
      storageKey="agenthire-theme"
    >
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
      <Toaster richColors position="top-right" />
    </ThemeProvider>
  ),
});

// Auth guard helpers
function requireAuth() {
  const { isAuthenticated } = useAuthStore.getState();
  if (!isAuthenticated) throw redirect({ to: "/login" });
}
function requireGuest() {
  const { isAuthenticated } = useAuthStore.getState();
  if (isAuthenticated) throw redirect({ to: "/dashboard" });
}

// Routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  beforeLoad: requireGuest,
  component: LoginPage,
});

const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/signup",
  beforeLoad: requireGuest,
  component: SignupPage,
});

const onboardingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/onboarding",
  beforeLoad: requireAuth,
  component: OnboardingPage,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  beforeLoad: requireAuth,
  component: DashboardPage,
});

const postProjectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/post-project",
  beforeLoad: requireAuth,
  component: PostProjectPage,
});

const freelancersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/freelancers",
  beforeLoad: requireAuth,
  component: FreelancersPage,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  beforeLoad: requireAuth,
  component: ProfilePage,
});

const paymentSuccessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/payment-success",
  beforeLoad: requireAuth,
  component: PaymentSuccessPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  signupRoute,
  onboardingRoute,
  dashboardRoute,
  postProjectRoute,
  freelancersRoute,
  profileRoute,
  paymentSuccessRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
