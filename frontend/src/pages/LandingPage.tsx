import { Button } from "@/components/base/Button";
import { Card, CardBody } from "@/components/base/Card";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  Github,
  Linkedin,
  Menu,
  Twitter,
  Users,
  X,
  Zap,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

/* ── Features data ───────────────────────────────────────────── */
const features = [
  {
    Icon: Brain,
    title: "AI-Powered Matching",
    description:
      "Our model scores every freelancer against your project brief, surfacing the highest-quality candidates in seconds.",
  },
  {
    Icon: Users,
    title: "Smart Pairing",
    description:
      "Beyond skills — we factor timezone overlap, communication style, and past collaboration history.",
  },
  {
    Icon: Zap,
    title: "Fast Payments",
    description:
      "Milestone-based escrow settles instantly with full transparency and zero chargebacks.",
  },
];

/* ── How it works data ───────────────────────────────────────── */
const steps = [
  {
    number: "01",
    title: "Post your project",
    body: "Describe your needs in plain language. AI parses requirements, budget, and timeline automatically.",
  },
  {
    number: "02",
    title: "Get AI matches",
    body: "Receive a ranked shortlist of vetted freelancers with match scores and proposal highlights.",
  },
  {
    number: "03",
    title: "Hire & Pay",
    body: "Review profiles, lock milestones in escrow, and release payment when fully satisfied.",
  },
];

/* ── Social links ────────────────────────────────────────────── */
const socials = [
  { Icon: Twitter, label: "Twitter", href: "https://twitter.com" },
  { Icon: Github, label: "GitHub", href: "https://github.com" },
  { Icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
];

/* ── FadeUp wrapper ──────────────────────────────────────────── */
interface FadeUpProps {
  delay?: number;
  skip?: boolean;
  children: React.ReactNode;
  className?: string;
  "data-ocid"?: string;
}

function FadeUp({
  delay = 0,
  skip = false,
  children,
  className,
  ...rest
}: FadeUpProps) {
  if (skip) {
    return (
      <div className={className} {...rest}>
        {children}
      </div>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════ */
export default function LandingPage() {
  const reduced = useReducedMotion() ?? false;
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollIntoView(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* ── NAVBAR ─────────────────────────────────────────────── */}
      <header
        data-ocid="landing-nav"
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-card/90 backdrop-blur-md border-b border-border shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center gap-6">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 shrink-0">
            <span className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
              <Brain className="h-4 w-4 text-primary-foreground" />
            </span>
            <span className="font-display font-bold text-lg tracking-tight text-foreground">
              AgentHire
            </span>
          </a>

          {/* Center links (desktop) */}
          <nav className="hidden md:flex items-center gap-7 mx-auto">
            {[
              { label: "Features", id: "features" },
              { label: "How it works", id: "how-it-works" },
              { label: "Pricing", id: "pricing" },
            ].map(({ label, id }) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollIntoView(id)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Auth buttons (desktop) */}
          <div className="hidden md:flex items-center gap-3 ml-auto">
            <Link to="/login">
              <Button variant="ghost" size="sm" data-ocid="nav-login">
                Log in
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="primary" size="sm" data-ocid="nav-signup">
                Sign up free
              </Button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            data-ocid="nav-mobile-toggle"
            className="md:hidden ml-auto p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile drawer */}
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-card border-t border-border px-4 py-4 flex flex-col gap-4"
          >
            {[
              { label: "Features", id: "features" },
              { label: "How it works", id: "how-it-works" },
              { label: "Pricing", id: "pricing" },
            ].map(({ label, id }) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollIntoView(id)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 text-left"
              >
                {label}
              </button>
            ))}
            <div className="flex flex-col gap-2 pt-2 border-t border-border">
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full"
                  data-ocid="nav-mobile-login"
                >
                  Log in
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)}>
                <Button
                  variant="primary"
                  className="w-full"
                  data-ocid="nav-mobile-signup"
                >
                  Sign up free
                </Button>
              </Link>
            </div>
          </motion.nav>
        )}
      </header>

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative overflow-hidden flex-1 flex items-center justify-center min-h-[88vh]"
      >
        {/* Animated background orbs */}
        <motion.div
          aria-hidden="true"
          className="absolute -top-48 -left-48 w-[640px] h-[640px] rounded-full bg-primary/8 blur-3xl pointer-events-none"
          animate={
            reduced ? {} : { scale: [1, 1.14, 1], opacity: [0.5, 0.85, 0.5] }
          }
          transition={{
            duration: 9,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          aria-hidden="true"
          className="absolute -bottom-48 -right-32 w-[520px] h-[520px] rounded-full bg-accent/8 blur-3xl pointer-events-none"
          animate={
            reduced ? {} : { scale: [1, 1.09, 1], opacity: [0.4, 0.75, 0.4] }
          }
          transition={{
            duration: 11,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 text-center py-24">
          {/* Badge */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex"
          >
            <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20">
              <Zap className="h-3 w-3" />
              AI-powered hiring, built for modern teams
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
            className="font-display font-bold text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.06] text-foreground mb-6"
          >
            Hire the Best Freelancers
            <br />
            <span className="text-primary">with AI</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.17 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            AgentHire matches your project with top-tier talent in minutes —
            AI-ranked candidates, milestone payments, zero guesswork.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.26 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/signup">
              <Button
                variant="primary"
                size="lg"
                data-ocid="hero-cta-signup"
                className="gap-2"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <button
              type="button"
              data-ocid="hero-cta-learn"
              onClick={() => scrollIntoView("features")}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Learn More
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </motion.div>

          {/* Social proof */}
          <motion.p
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.38 }}
            className="mt-10 text-xs text-muted-foreground flex items-center justify-center gap-1.5"
          >
            <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
            Trusted by 2,400+ teams worldwide · No credit card required
          </motion.p>
        </div>
      </section>

      {/* ── FEATURES ───────────────────────────────────────────── */}
      <section
        id="features"
        className="bg-muted/30 border-y border-border py-24"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <FadeUp
            skip={reduced}
            className="text-center mb-16 max-w-2xl mx-auto"
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight text-foreground mb-4">
              Everything you need to hire smarter
            </h2>
            <p className="text-muted-foreground text-lg">
              Purpose-built for teams that can't afford to waste time on the
              wrong hire.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map(({ Icon, title, description }, i) => (
              <FadeUp key={title} delay={i * 0.1} skip={reduced}>
                <Card
                  interactive
                  className="h-full group"
                  data-ocid={`feature-card-${i}`}
                >
                  <CardBody className="pt-8 pb-8 flex flex-col gap-4">
                    <span className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center transition-smooth group-hover:bg-primary/20">
                      <Icon className="h-5 w-5 text-primary" />
                    </span>
                    <div>
                      <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                        {title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {description}
                      </p>
                    </div>
                  </CardBody>
                </Card>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────────── */}
      <section id="how-it-works" className="bg-background py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <FadeUp skip={reduced} className="text-center mb-16 max-w-xl mx-auto">
            <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight text-foreground mb-4">
              From brief to hire in three steps
            </h2>
            <p className="text-muted-foreground text-lg">
              No lengthy vetting, no back-and-forth. Just fast, confident hires.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector line (desktop) */}
            <div
              aria-hidden="true"
              className="hidden md:block absolute top-8 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px bg-border"
            />

            {steps.map(({ number, title, body }, i) => (
              <FadeUp
                key={number}
                delay={i * 0.12}
                skip={reduced}
                className="flex flex-col items-center text-center gap-4"
                data-ocid={`step-${i + 1}`}
              >
                <div className="relative">
                  <span className="h-16 w-16 rounded-2xl bg-card border border-border flex items-center justify-center text-2xl font-display font-bold text-primary shadow-sm">
                    {number}
                  </span>
                  <CheckCircle2 className="absolute -bottom-1.5 -right-1.5 h-5 w-5 text-primary bg-background rounded-full" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                    {title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                    {body}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp skip={reduced} delay={0.36} className="mt-16 text-center">
            <Link to="/signup">
              <Button
                variant="primary"
                size="lg"
                data-ocid="hiw-cta"
                className="gap-2"
              >
                Start your first project
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ── CTA BANNER ─────────────────────────────────────────── */}
      <section
        id="pricing"
        className="bg-primary/5 border-y border-primary/10 py-20"
      >
        <FadeUp
          skip={reduced}
          className="max-w-2xl mx-auto px-4 md:px-6 text-center space-y-6"
        >
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground">
            Ready to hire smarter?
          </h2>
          <p className="text-muted-foreground text-lg">
            Join thousands of companies already using AgentHire to build great
            teams.
          </p>
          <div>
            <Link to="/signup">
              <Button
                variant="primary"
                size="lg"
                data-ocid="landing-final-cta"
                className="gap-2"
              >
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </FadeUp>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────── */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            {/* Brand */}
            <div className="flex flex-col gap-2.5 max-w-xs">
              <a href="/" className="flex items-center gap-2">
                <span className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
                  <Brain className="h-4 w-4 text-primary-foreground" />
                </span>
                <span className="font-display font-bold text-lg tracking-tight text-foreground">
                  AgentHire
                </span>
              </a>
              <p className="text-sm text-muted-foreground">
                AI-powered freelance hiring. Fast, transparent, and built for
                the future of work.
              </p>
            </div>

            {/* Nav links */}
            <nav className="flex flex-wrap gap-x-8 gap-y-2">
              {[
                { label: "Features", id: "features" },
                { label: "How it works", id: "how-it-works" },
                { label: "Privacy", id: "pricing" },
                { label: "Terms", id: "pricing" },
              ].map(({ label, id }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => scrollIntoView(id)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {label}
                </button>
              ))}
            </nav>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socials.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="h-9 w-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} AgentHire. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== "undefined" ? window.location.hostname : "",
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground transition-colors duration-200"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
