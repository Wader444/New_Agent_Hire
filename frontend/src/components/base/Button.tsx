import * as React from "react";
import { Button as ShadcnButton } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends Omit<React.ComponentProps<typeof ShadcnButton>, "variant" | "size"> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "primary" | "success" | null | undefined;
  size?: "default" | "sm" | "md" | "lg" | "icon" | null | undefined;
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, children, ...props }, ref) => {
    // Map custom variants to Shadcn equivalents or handle in classNames
    const mappedVariant = (variant === "primary" || variant === "success") ? "default" : variant;
    const mappedSize = size === "md" ? "default" : size;

    return (
      <ShadcnButton
        ref={ref}
        variant={mappedVariant as any}
        size={mappedSize as any}
        disabled={loading || props.disabled}
        className={className}
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin shrink-0" />}
        {children}
      </ShadcnButton>
    );
  }
);
Button.displayName = "Button";
