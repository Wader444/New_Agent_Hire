import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "@tanstack/react-router";
import { Bot, Briefcase, Sparkles, Users } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface OnboardingStep {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
}

const STEPS: OnboardingStep[] = [
  {
    icon: <Sparkles className="w-10 h-10" />,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    title: "Welcome to AgentHire",
    description:
      "AgentHire is an AI-powered freelance hiring platform that connects you with world-class talent in seconds. Our intelligent matching engine analyzes your project needs and surfaces the best-fit freelancers — saving you hours of manual searching.",
  },
  {
    icon: <Briefcase className="w-10 h-10" />,
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
    title: "Post a Project",
    description:
      "Describe what you need — from a quick design task to a long-term engineering contract. Add your budget, timeline, and required skills. Our AI immediately begins matching your posting against thousands of verified freelancer profiles.",
  },
  {
    icon: <Users className="w-10 h-10" />,
    iconBg: "bg-chart-5/10",
    iconColor: "text-chart-5",
    title: "Browse Freelancers",
    description:
      "Explore a curated pool of skilled professionals. Filter by skills, rating, availability, and budget. Every profile includes verified reviews, portfolio samples, and transparent hourly rates — everything you need to make a confident decision.",
  },
  {
    icon: <Bot className="w-10 h-10" />,
    iconBg: "bg-chart-2/10",
    iconColor: "text-chart-2",
    title: "Hire with AI",
    description:
      "Let our AI do the heavy lifting. AgentHire ranks candidates based on your project requirements and highlights the top match with a confidence score. One click to hire, secure payment, and you're ready to start building.",
  },
];

const TOTAL = STEPS.length;
type Direction = 1 | -1;

const slideVariants = {
  enter: (dir: Direction) => ({ x: dir > 0 ? 56 : -56, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: Direction) => ({ x: dir > 0 ? -56 : 56, opacity: 0 }),
};

export default function OnboardingPage() {
  const { completeOnboarding } = useAuthStore();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<Direction>(1);

  function finish() {
    completeOnboarding();
    navigate({ to: "/dashboard" });
  }

  function handleNext() {
    if (step === TOTAL - 1) {
      finish();
    } else {
      setDirection(1);
      setStep((s) => s + 1);
    }
  }

  function handleBack() {
    if (step === 0) return;
    setDirection(-1);
    setStep((s) => s - 1);
  }

  const current = STEPS[step];
  const isLast = step === TOTAL - 1;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-[400px] h-[300px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Skip */}
      <button
        type="button"
        onClick={finish}
        data-ocid="onboarding-skip"
        className="absolute top-6 right-6 text-sm text-muted-foreground hover:text-foreground transition-smooth px-3 py-1.5 rounded-lg hover:bg-muted/60 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        aria-label="Skip onboarding"
      >
        Skip
      </button>

      <div className="w-full max-w-lg mx-auto px-4 relative z-10">
        {/* Step counter + percent */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-muted-foreground tracking-wide">
            Step {step + 1} of {TOTAL}
          </span>
          <span className="text-xs font-medium text-primary">
            {Math.round(((step + 1) / TOTAL) * 100)}% complete
          </span>
        </div>

        {/* Progress bar segments */}
        <div
          className="flex gap-1.5 mb-8"
          role="progressbar"
          aria-valuenow={step + 1}
          aria-valuemin={1}
          aria-valuemax={TOTAL}
          aria-label={`Step ${step + 1} of ${TOTAL}`}
          tabIndex={0}
        >
          {Array.from({ length: TOTAL }).map((_, i) => (
            <div
              key={`seg-${i + 1}`}
              className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden"
            >
              <motion.div
                className="h-full bg-primary rounded-full origin-left"
                initial={false}
                animate={{ scaleX: i <= step ? 1 : 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              />
            </div>
          ))}
        </div>

        {/* Main card */}
        <div className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
          {/* Animated step content */}
          <div className="relative overflow-hidden min-h-[320px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                className="px-8 pt-10 pb-6 flex flex-col items-center text-center"
              >
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className={`w-20 h-20 rounded-2xl ${current.iconBg} ${current.iconColor} flex items-center justify-center mb-6`}
                >
                  {current.icon}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.15 }}
                >
                  <h1 className="text-2xl font-display font-bold text-foreground mb-3 leading-tight">
                    {current.title}
                  </h1>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
                    {current.description}
                  </p>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          <div className="px-8 pb-8 flex items-center gap-3">
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 0}
              data-ocid="onboarding-back"
              className="flex-1 py-2.5 rounded-xl text-sm font-medium border border-border text-foreground bg-transparent transition-smooth hover:bg-muted/60 disabled:opacity-30 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              aria-label="Previous step"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleNext}
              data-ocid={isLast ? "onboarding-get-started" : "onboarding-next"}
              className="flex-[2] py-2.5 rounded-xl text-sm font-semibold bg-primary text-primary-foreground transition-smooth hover:opacity-90 active:scale-[0.98] shadow-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              aria-label={isLast ? "Get started" : "Next step"}
            >
              {isLast ? "Get Started" : "Next →"}
            </button>
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2 mt-5">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <motion.button
              key={`dot-${i + 1}`}
              onClick={() => {
                setDirection(i > step ? 1 : -1);
                setStep(i);
              }}
              aria-label={`Go to step ${i + 1}`}
              className="rounded-full focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              animate={{
                width: i === step ? 20 : 8,
                height: 8,
                opacity: i === step ? 1 : 0.4,
                backgroundColor:
                  i === step
                    ? "oklch(var(--primary))"
                    : "oklch(var(--muted-foreground))",
              }}
              transition={{ duration: 0.25 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
