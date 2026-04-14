import { Button } from "@/components/base/Button";
import { Input } from "@/components/base/Input";
import { AuthLayout } from "@/layouts/AuthLayout";
import { useAuthStore } from "@/store/authStore";
import { Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignupPage() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({ mode: "onBlur" });

  const passwordValue = watch("password");

  async function onSubmit(data: SignupFormData) {
    await new Promise((res) => setTimeout(res, 900));
    login(data.email, `token-${Date.now()}`);
    toast.success("Account created!", {
      description: "Let's get you set up.",
    });
    navigate({ to: "/onboarding" });
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start hiring smarter with AI-powered matching"
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="space-y-5"
      >
        {/* Google button — disabled with tooltip */}
        <div className="relative group">
          <button
            type="button"
            disabled
            aria-disabled="true"
            data-ocid="signup-google-btn"
            className="w-full flex items-center justify-center gap-3 border border-border rounded-lg py-2.5 px-4 text-sm font-medium text-muted-foreground bg-card cursor-not-allowed opacity-60 transition-smooth select-none"
          >
            <FcGoogle className="h-5 w-5 flex-shrink-0" />
            Continue with Google
          </button>
          {/* Tooltip */}
          <span
            role="tooltip"
            className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-foreground text-background text-xs px-2.5 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none z-10 shadow-md"
          >
            Coming soon
          </span>
        </div>

        {/* OR divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider px-1">
            or
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Signup form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
        >
          <Input
            label="Full Name"
            type="text"
            placeholder="Alex Rivera"
            autoComplete="name"
            data-ocid="signup-name"
            error={errors.name?.message}
            {...register("name", {
              required: "Full name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            })}
          />

          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            data-ocid="signup-email"
            error={errors.email?.message}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            data-ocid="signup-password"
            error={errors.password?.message}
            hint={!errors.password ? "Minimum 8 characters" : undefined}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            data-ocid="signup-confirm-password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (val) =>
                val === passwordValue || "Passwords do not match",
            })}
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={isSubmitting}
            className="w-full mt-1"
            data-ocid="signup-submit"
          >
            {isSubmitting ? "Creating account…" : "Create account"}
          </Button>
        </form>

        {/* Login link */}
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/login"
            data-ocid="signup-login-link"
            className="text-primary font-medium hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded transition-smooth"
          >
            Sign in
          </Link>
        </p>
      </motion.div>
    </AuthLayout>
  );
}
