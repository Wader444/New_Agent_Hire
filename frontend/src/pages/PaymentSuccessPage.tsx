import { Badge } from "@/components/base/Badge";
import { Button } from "@/components/base/Button";
import { Card, CardBody } from "@/components/base/Card";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { CheckCircle2, Copy, LayoutDashboard, PlusCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// Confetti particle
interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  width: number;
  height: number;
  delay: number;
  duration: number;
  initialRotation: number;
  finalRotation: number;
}

const CONFETTI_COLORS = [
  "oklch(0.72 0.15 250 / 0.9)",
  "oklch(0.62 0.2 28 / 0.9)",
  "oklch(0.55 0.18 140 / 0.9)",
  "oklch(0.70 0.18 55 / 0.9)",
  "oklch(0.60 0.20 310 / 0.9)",
  "oklch(0.65 0.16 180 / 0.9)",
];

function ConfettiOverlay() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const items: Particle[] = Array.from({ length: 64 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -(5 + Math.random() * 15),
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      width: 6 + Math.random() * 7,
      height: 4 + Math.random() * 4,
      delay: Math.random() * 0.8,
      duration: 2.2 + Math.random() * 1.6,
      initialRotation: Math.random() * 360,
      finalRotation: Math.random() * 360 + 180,
    }));
    setParticles(items);
    const hideTimer = setTimeout(() => setVisible(false), 4500);
    return () => clearTimeout(hideTimer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden z-50"
      aria-hidden="true"
    >
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              rotate: p.initialRotation,
              opacity: 1,
            }}
            animate={{
              top: "108%",
              rotate: p.finalRotation,
              opacity: [1, 1, 0.6, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              ease: "easeIn",
            }}
            style={{
              position: "absolute",
              width: p.width,
              height: p.height,
              background: p.color,
              borderRadius: 2,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

function AlgorandSymbol() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.16 19.16L16.2 9.77l-1.87 5.19H9.88L8 9.77l-3 9.39H2.84L7.1 4.84h2.16l2.74 8.28 2.74-8.28h2.16l4.26 14.32z" />
    </svg>
  );
}

export default function PaymentSuccessPage() {
  const navigate = useNavigate();
  // Read txId from URL search params; fall back to a mock ID
  const search = useSearch({ strict: false }) as Record<
    string,
    string | undefined
  >;
  const txId = search.txId ?? `MOCK-${Date.now()}`;

  const transactionDate = new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  function copyTxId() {
    navigator.clipboard
      ?.writeText(txId)
      .then(() => toast.success("Transaction ID copied!"));
  }

  return (
    <>
      <ConfettiOverlay />

      {/* Full-screen centered layout — NO sidebar */}
      <div
        className="min-h-screen bg-background flex items-center justify-center px-4 py-12 relative"
        data-ocid="payment-success-page"
      >
        {/* Subtle radial glow */}
        <div
          className="pointer-events-none fixed inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 10%, oklch(0.45 0.15 250 / 0.08) 0%, transparent 65%)",
          }}
          aria-hidden="true"
        />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="relative z-10 w-full max-w-md"
        >
          {/* Animated checkmark */}
          <div className="flex justify-center mb-7">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 16,
                delay: 0.1,
              }}
              className="relative flex items-center justify-center"
            >
              {/* Pulsing ring */}
              <motion.div
                initial={{ scale: 0.6, opacity: 0.7 }}
                animate={{ scale: [1, 1.6, 2.1], opacity: [0.5, 0.25, 0] }}
                transition={{ duration: 1.8, delay: 0.25, repeat: 1 }}
                className="absolute w-20 h-20 rounded-full bg-emerald-500/20"
              />
              <motion.div
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{ scale: [1, 1.3, 1.7], opacity: [0.4, 0.2, 0] }}
                transition={{ duration: 1.6, delay: 0.5, repeat: 1 }}
                className="absolute w-20 h-20 rounded-full bg-emerald-500/15"
              />
              <CheckCircle2
                className="w-[84px] h-[84px] text-emerald-500 drop-shadow-lg relative z-10"
                strokeWidth={1.4}
              />
            </motion.div>
          </div>

          {/* Headings */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.4 }}
            className="text-center mb-7 space-y-2"
          >
            <h1 className="font-display text-3xl font-bold text-foreground tracking-tight">
              Payment Successful!
            </h1>
            <p className="text-muted-foreground text-[15px] leading-relaxed">
              Your freelancer has been hired. They will be notified shortly.
            </p>
          </motion.div>

          {/* Transaction details card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <Card
              elevated
              className="shadow-xl border-border/70"
              data-ocid="transaction-details-card"
            >
              <CardBody className="pt-6 pb-6 space-y-4">
                {/* Transaction ID */}
                <div className="space-y-1.5">
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
                    Transaction ID
                  </p>
                  <div className="flex items-center gap-2 bg-muted/50 border border-border rounded-lg px-3 py-2">
                    <code className="font-mono text-sm text-foreground flex-1 truncate min-w-0">
                      {txId}
                    </code>
                    <button
                      type="button"
                      aria-label="Copy transaction ID"
                      data-ocid="copy-txid-btn"
                      onClick={copyTxId}
                      className="text-muted-foreground hover:text-foreground transition-colors duration-200 shrink-0 p-0.5 rounded hover:bg-muted"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-border" />

                {/* Date/time */}
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
                    Date &amp; Time
                  </span>
                  <span className="text-sm text-foreground font-medium tabular-nums">
                    {transactionDate}
                  </span>
                </div>

                {/* Network */}
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
                    Network
                  </span>
                  <Badge
                    variant="primary"
                    size="md"
                    data-ocid="algorand-network-badge"
                  >
                    <AlgorandSymbol />
                    Algorand Testnet
                  </Badge>
                </div>

                {/* Status */}
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
                    Status
                  </span>
                  <Badge variant="success" size="md">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block shrink-0" />
                    Confirmed
                  </Badge>
                </div>
              </CardBody>
            </Card>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.54, duration: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 mt-6"
          >
            <Button
              variant="primary"
              size="lg"
              className="flex-1 gap-2"
              data-ocid="back-to-dashboard-btn"
              onClick={() => navigate({ to: "/dashboard" })}
            >
              <LayoutDashboard className="w-4 h-4" />
              Back to Dashboard
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="flex-1 gap-2"
              data-ocid="post-another-project-btn"
              onClick={() => navigate({ to: "/post-project" })}
            >
              <PlusCircle className="w-4 h-4" />
              Post Another Project
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
