import { Button } from "@/components/base/Button";
import { cn } from "@/lib/utils";
import { hireFreelancer } from "@/utils/api";
import type { Freelancer } from "@/utils/mockData";
import { useNavigate } from "@tanstack/react-router";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

interface HireModalProps {
  freelancer: Freelancer | null;
  onClose: () => void;
}

export function HireModal({ freelancer, onClose }: HireModalProps) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isAI = !!freelancer?.isAiRecommended;

  async function handleConfirm() {
    if (!freelancer) return;
    setLoading(true);
    try {
      const res = await hireFreelancer(freelancer.id);
      toast.success("Hire confirmed!", {
        description: `Transaction ${res.transactionId} on ${res.network}`,
      });
      onClose();
      navigate({
        to: "/payment-success",
        search: { txId: `MOCK-${res.transactionId}` } as Record<string, string>,
      });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence>
      {freelancer && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            data-ocid="modal-backdrop"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            data-ocid="hire-modal"
          >
            <div className="bg-card border border-border rounded-2xl w-full max-w-md shadow-xl overflow-hidden">
              {/* Gradient top bar for AI recommended */}
              {isAI && (
                <div className="h-1 bg-gradient-to-r from-primary via-violet-400 to-primary/60" />
              )}

              {/* Header */}
              <div className="flex items-start justify-between p-6 pb-4">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    Hire Freelancer
                  </h2>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Confirm your hire request
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label="Close modal"
                  data-ocid="modal-close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Freelancer summary */}
              <div
                className={cn(
                  "mx-6 mb-5 rounded-xl p-4 border",
                  isAI
                    ? "bg-primary/5 border-primary/20"
                    : "bg-muted/50 border-border",
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0">
                    {freelancer.avatar}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground truncate">
                      {freelancer.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {freelancer.role}
                    </p>
                  </div>
                  {isAI && (
                    <span className="ml-auto shrink-0 text-[10px] font-bold px-2 py-1 rounded-full bg-primary/15 text-primary border border-primary/25">
                      {freelancer.matchPercentage}% Match
                    </span>
                  )}
                </div>

                <div className="mt-3 flex items-start justify-between text-sm">
                  <span className="text-muted-foreground mt-0.5">Project rate</span>
                  <div className="flex flex-col items-end text-right ml-4">
                    <span className="font-bold text-foreground text-base">
                      ${freelancer.hourlyRate}
                    </span>
                    <span className="text-[10px] font-normal text-muted-foreground leading-tight mt-0.5">
                      / project may increase or decrease based on the project
                    </span>
                  </div>
                </div>
                <div className="mt-1.5 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Experience</span>
                  <span className="font-medium text-foreground">
                    {freelancer.experience}
                  </span>
                </div>
                <div className="mt-1.5 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Network</span>
                  <span className="font-medium text-foreground">
                    Algorand Testnet
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 px-6 pb-6">
                <Button
                  variant="outline"
                  size="default"
                  className="flex-1"
                  onClick={onClose}
                  disabled={loading}
                  data-ocid="modal-cancel"
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  size="default"
                  className="flex-1"
                  disabled={loading}
                  onClick={handleConfirm}
                  data-ocid="modal-confirm"
                >
                  {loading ? "Processing..." : "Confirm & Pay"}
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
