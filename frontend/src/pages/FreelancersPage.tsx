import { FreelancerCardSkeleton } from "@/components/base/Skeleton";
import { FreelancerCard } from "@/components/freelancers/FreelancerCard";
import { HireModal } from "@/components/freelancers/HireModal";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import {
  freelancers as ALL_FREELANCERS,
  type Freelancer,
} from "@/utils/mockData";
import { Search, Sparkles, Users } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";

export default function FreelancersPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedFreelancer, setSelectedFreelancer] =
    useState<Freelancer | null>(null);

  // Simulate 500ms load
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ALL_FREELANCERS;
    return ALL_FREELANCERS.filter(
      (f) =>
        f.name.toLowerCase().includes(q) ||
        f.role.toLowerCase().includes(q) ||
        f.skills.some((s) => s.toLowerCase().includes(q)),
    );
  }, [query]);

  const aiFreelancer = filtered.find((f) => f.isAiRecommended);
  const count = filtered.length;

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
        {/* Page heading */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="flex items-center gap-2 mb-1">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-widest">
              Talent
            </span>
          </div>
          <h1 className="text-3xl font-bold text-foreground font-display tracking-tight">
            Find Freelancers
          </h1>
          <p className="text-muted-foreground mt-1.5">
            Browse curated talent matched by our AI hiring engine.{" "}
            {!loading && (
              <span className="font-medium text-foreground">
                {count} freelancer{count !== 1 ? "s" : ""} found
              </span>
            )}
          </p>
        </motion.div>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="relative max-w-xl"
        >
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, role, or skills…"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
            data-ocid="freelancer-search"
          />
        </motion.div>

        {/* AI Recommended banner */}
        {!loading && aiFreelancer && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.15 }}
            className="flex items-center gap-3 bg-primary/8 border border-primary/20 rounded-xl px-4 py-3"
          >
            <div className="h-8 w-8 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <div className="min-w-0">
              <span className="text-sm font-semibold text-foreground">
                AI Recommended:{" "}
              </span>
              <span className="text-sm text-muted-foreground">
                {aiFreelancer.name} is your top match with{" "}
                <span className="text-primary font-bold">
                  {aiFreelancer.matchPercentage}%
                </span>{" "}
                compatibility.
              </span>
            </div>
          </motion.div>
        )}

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {(["s1", "s2", "s3", "s4", "s5", "s6"] as const).map((id) => (
              <FreelancerCardSkeleton key={id} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
            data-ocid="empty-state"
          >
            <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1">
              No freelancers found
            </h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              Try adjusting your search query to find the right talent.
            </p>
          </motion.div>
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            data-ocid="freelancer-grid"
          >
            {filtered.map((freelancer, index) => (
              <FreelancerCard
                key={freelancer.id}
                freelancer={freelancer}
                index={index}
                onHire={setSelectedFreelancer}
              />
            ))}
          </div>
        )}
      </div>

      {/* Hire modal */}
      <HireModal
        freelancer={selectedFreelancer}
        onClose={() => setSelectedFreelancer(null)}
      />
    </DashboardLayout>
  );
}
