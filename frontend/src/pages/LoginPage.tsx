import { Button } from "@/components/base/Button";
import { Input } from "@/components/base/Input";
import { AuthLayout } from "@/layouts/AuthLayout";
import { useAuthStore } from "@/store/authStore";
import { Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const onboardingComplete = useAuthStore((s) => s.onboardingComplete);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({ mode: "onBlur" });

  async function onSubmit(data: LoginFormData) {
    await new Promise((res) => setTimeout(res, 800));

    if (data.password !== "password123") {
      toast.error("Invalid credentials", { description: "For testing, please use 'password123'." });
      return;
    }

    login(data.email, `token-${Date.now()}`);
    toast.success("Welcome back!", { description: "You've been signed in." });
    navigate({ to: onboardingComplete ? "/dashboard" : "/onboarding" });
  }

  async function onGoogleLogin() {
    toast.loading("Redirecting to Google...", { id: "google" });
    await new Promise((res) => setTimeout(res, 1000));
    toast.success("Signed in with Google", { id: "google" });
    login("google-user@gmail.com", `token-${Date.now()}`);
    navigate({ to: onboardingComplete ? "/dashboard" : "/onboarding" });
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your AgentHire account"
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="space-y-5"
      >
        {/* Google button */}
        <button
          type="button"
          onClick={onGoogleLogin}
          data-ocid="login-google-btn"
          className="w-full flex items-center justify-center gap-3 border border-border hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring rounded-lg py-2.5 px-4 text-sm font-medium text-foreground bg-card transition-smooth select-none"
        >
          <FcGoogle className="h-5 w-5 flex-shrink-0" />
          Continue with Google
        </button>

        {/* OR divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider px-1">
            or
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Email + password form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
        >
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            data-ocid="login-email"
            error={errors.email?.message}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
          />

          <div className="space-y-1.5">
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              data-ocid="login-password"
              error={errors.password?.message}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                data-ocid="forgot-password-link"
                className="text-xs text-primary hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded transition-smooth"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={isSubmitting}
            className="w-full mt-1"
            data-ocid="login-submit"
          >
            {isSubmitting ? "Signing in…" : "Sign in"}
          </Button>
        </form>

        {/* Signup link */}
        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link
            to="/signup"
            data-ocid="login-signup-link"
            className="text-primary font-medium hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded transition-smooth"
          >
            Sign up free
          </Link>
        </p>
      </motion.div>
    </AuthLayout>
  );
}
