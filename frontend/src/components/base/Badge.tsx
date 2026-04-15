import * as React from "react";
import { Badge as ShadcnBadge } from "@/components/ui/badge";

export interface BadgeProps extends Omit<React.ComponentProps<typeof ShadcnBadge>, "variant"> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "primary" | "success" | null | undefined;
  size?: "default" | "sm" | "md" | "lg" | string;
}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  let mappedVariant = variant;
  let customClass = className || "";

  if (variant === "primary") {
    mappedVariant = "default";
  } else if (variant === "success") {
    mappedVariant = "outline";
    customClass = `bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20 ${customClass}`;
  }

  // Handle generic sizes for badge
  if (size === "lg") customClass += " px-3 py-1 text-sm";
  if (size === "sm") customClass += " px-1.5 py-0.5 text-[10px]";

  return (
    <ShadcnBadge
      variant={mappedVariant as any}
      className={customClass}
      {...props}
    />
  );
}
