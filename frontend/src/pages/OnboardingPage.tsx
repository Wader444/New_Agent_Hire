import { Button } from "@/components/base/Button";
import { Input } from "@/components/base/Input";
import { UserRole, useAuthStore } from "@/store/authStore";
import { useNavigate } from "@tanstack/react-router";
import { Briefcase, UserSearch } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

export default function OnboardingPage() {
  const { completeOnboarding } = useAuthStore();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [role, setRole] = useState<UserRole>(null);
  const [field, setField] = useState("");

  function finish() {
    if (!role) {
      toast.error("Please select an account type");
      return;
    }
    if (!field.trim()) {
      toast.error("Please enter your relevant field or skills");
      return;
    }
    completeOnboarding(role, field);
    navigate({ to: "/dashboard" });
  }

  function handleNext() {
    if (step === 1) {
      if (!role) {
        toast.error("Please select how you want to use AgentHire");
        return;
      }
      setStep(2);
    } else {
      finish();
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-[400px] h-[300px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-lg mx-auto px-4 relative z-10">
        {/* Step counter */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-muted-foreground tracking-wide">
            Step {step} of 2
          </span>
        </div>

        {/* Progress bar segments */}
        <div className="flex gap-1.5 mb-8">
          <div className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full origin-left"
              animate={{ scaleX: 1 }}
            />
          </div>
          <div className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: step === 2 ? 1 : 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Main card */}
        <div className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden min-h-[380px] flex flex-col p-8">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="flex-1 flex flex-col"
              >
                <div className="text-center mb-6">
                  <h1 className="text-2xl font-display font-bold text-foreground">
                    How do you want to use AgentHire?
                  </h1>
                  <p className="text-sm text-muted-foreground mt-2">
                    This helps us tailor your matching and search experience.
                  </p>
                </div>

                <div className="grid gap-4 mt-auto">
                  <button
                    type="button"
                    onClick={() => setRole("client")}
                    className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${
                      role === "client"
                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                        : "border-border hover:border-primary/50 hover:bg-muted/50"
                    }`}
                  >
                    <div className="h-10 w-10 shrink-0 bg-primary/10 text-primary flex items-center justify-center rounded-full">
                      <UserSearch className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        I'm a Client
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        I want to post projects and hire freelancers.
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole("freelancer")}
                    className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${
                      role === "freelancer"
                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                        : "border-border hover:border-primary/50 hover:bg-muted/50"
                    }`}
                  >
                    <div className="h-10 w-10 shrink-0 bg-accent/10 text-accent flex items-center justify-center rounded-full">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        I'm a Freelancer
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        I want to find relevant work and accept projects.
                      </p>
                    </div>
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="flex-1 flex flex-col"
              >
                <div className="text-center mb-6">
                  <h1 className="text-2xl font-display font-bold text-foreground">
                    What are you looking for?
                  </h1>
                  <p className="text-sm text-muted-foreground mt-2">
                    {role === "client" 
                      ? "Tell us what skills or fields you are hiring for."
                      : "Tell us your core skills and the field you work in."}
                  </p>
                </div>

                <div className="mt-8 flex-1">
                  <Input
                    label={role === "client" ? "Target Field / Skills to Hire" : "Your Profession / Core Skills"}
                    placeholder={role === "client" ? "e.g. React Developers, UI/UX" : "e.g. Frontend Dev, TypeScript"}
                    value={field}
                    onChange={(e) => setField(e.target.value)}
                    autoFocus
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-8 flex items-center gap-3 pt-4 border-t border-border">
            {step === 2 && (
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="flex-1"
              >
                Back
              </Button>
            )}
            <Button
              variant="primary"
              onClick={handleNext}
              className={step === 1 ? "w-full" : "flex-[2]"}
            >
              {step === 1 ? "Continue" : "Complete Setup"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
