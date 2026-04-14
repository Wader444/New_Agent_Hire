import { Avatar } from "@/components/base/Avatar";
import { Badge } from "@/components/base/Badge";
import { Button } from "@/components/base/Button";
import { Card, CardBody } from "@/components/base/Card";
import { cn } from "@/lib/utils";
import type { Freelancer } from "@/utils/mockData";
import { MapPin, Star } from "lucide-react";
import { motion } from "motion/react";

const AVATAR_COLORS = [
  "bg-violet-500",
  "bg-blue-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-cyan-500",
];

function getAvatarColor(id: string): string {
  const idx =
    id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) %
    AVATAR_COLORS.length;
  return AVATAR_COLORS[idx];
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            "h-3.5 w-3.5",
            star <= Math.round(rating)
              ? "fill-amber-400 text-amber-400"
              : "text-muted-foreground/30 fill-muted-foreground/10",
          )}
        />
      ))}
      <span className="text-xs font-semibold text-foreground ml-1">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

const availabilityConfig = {
  available: { label: "Available", variant: "default" as const },
  "part-time": { label: "Part-time", variant: "secondary" as const },
  busy: { label: "Busy", variant: "destructive" as const },
};

interface FreelancerCardProps {
  freelancer: Freelancer;
  index: number;
  onHire: (freelancer: Freelancer) => void;
}

export function FreelancerCard({
  freelancer,
  index,
  onHire,
}: FreelancerCardProps) {
  const isAI = !!freelancer.isAiRecommended;
  const visibleSkills = freelancer.skills.slice(0, 3);
  const extraSkills = freelancer.skills.length - 3;
  const avatarColor = getAvatarColor(freelancer.id);
  const avail = availabilityConfig[freelancer.availability];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="h-full"
      data-ocid="freelancer-card"
    >
      <Card
        className={cn(
          "h-full flex flex-col relative overflow-hidden transition-shadow duration-300",
          isAI
            ? [
                "border-primary/40",
                "shadow-[0_0_0_1px_oklch(var(--primary)/0.25),0_4px_24px_-4px_oklch(var(--primary)/0.3)]",
                "hover:shadow-[0_0_0_1px_oklch(var(--primary)/0.4),0_8px_32px_-4px_oklch(var(--primary)/0.4)]",
              ]
            : "hover:shadow-md",
        )}
      >
        {/* AI Recommended gradient ribbon */}
        {isAI && (
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-violet-400 to-primary/60" />
        )}

        <CardBody className="flex-1 flex flex-col gap-4 p-5">
          {/* Header row */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 min-w-0">
              {/* Colored initials avatar */}
              <div
                className={cn(
                  "h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-base shrink-0",
                  avatarColor,
                )}
              >
                {freelancer.avatar}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-foreground truncate leading-tight">
                  {freelancer.name}
                </p>
                <p className="text-xs text-muted-foreground truncate mt-0.5">
                  {freelancer.role}
                </p>
              </div>
            </div>

            {/* AI Badge or availability */}
            {isAI ? (
              <span className="shrink-0 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide bg-gradient-to-r from-primary/20 to-violet-500/20 text-primary border border-primary/30">
                ✦ AI Pick
              </span>
            ) : (
              <Badge variant={avail.variant} className="shrink-0 text-xs">
                {avail.label}
              </Badge>
            )}
          </div>

          {/* AI match percentage */}
          {isAI && freelancer.matchPercentage && (
            <div className="flex items-center gap-2 bg-primary/5 border border-primary/15 rounded-lg px-3 py-2">
              <span className="text-xs text-muted-foreground">AI Match</span>
              <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-violet-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${freelancer.matchPercentage}%` }}
                  transition={{ delay: index * 0.08 + 0.4, duration: 0.6 }}
                />
              </div>
              <span className="text-xs font-bold text-primary">
                {freelancer.matchPercentage}%
              </span>
            </div>
          )}

          {/* Bio */}
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
            {freelancer.bio}
          </p>

          {/* Skills */}
          <div className="flex flex-wrap gap-1.5">
            {visibleSkills.map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {extraSkills > 0 && (
              <Badge variant="outline" className="text-xs">
                +{extraSkills}
              </Badge>
            )}
          </div>

          {/* Stats row */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <StarRating rating={freelancer.rating} />
            <span className="text-[11px]">
              {freelancer.reviewCount} reviews
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3 shrink-0" />
              <span className="truncate">{freelancer.location}</span>
            </div>
            <span className="text-xs text-muted-foreground">
              {freelancer.experience}
            </span>
          </div>
        </CardBody>

        {/* Footer */}
        <div className="px-5 pb-5 pt-0 flex items-center justify-between gap-3 border-t border-border mt-auto pt-4">
          <div>
            <span className="text-lg font-bold text-foreground">
              ${freelancer.hourlyRate}
            </span>
            <span className="text-xs text-muted-foreground">/hr</span>
          </div>
          <Button
            variant={isAI ? "default" : "outline"}
            size="sm"
            onClick={() => onHire(freelancer)}
            className={cn(isAI && "shadow-sm shadow-primary/30")}
            data-ocid="hire-btn"
          >
            Hire
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
