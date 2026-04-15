export { AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Avatar as ShadcnAvatar, AvatarFallback as ShadcnAvatarFallback } from "@/components/ui/avatar";
import * as React from "react";

export interface AvatarProps extends React.ComponentProps<typeof ShadcnAvatar> {
  initials?: string;
  size?: "sm" | "md" | "lg" | string;
  online?: boolean;
}

export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ initials, size, online, className, ...props }, ref) => {
    const sizeClass = size === "sm" ? "h-8 w-8 text-xs" : size === "md" ? "h-10 w-10 text-sm" : size === "lg" ? "h-12 w-12 text-base" : className || "h-10 w-10";
    
    return (
      <div className={`relative ${sizeClass}`}>
        <ShadcnAvatar ref={ref} className={sizeClass} {...props}>
          {initials && <ShadcnAvatarFallback className={sizeClass}>{initials}</ShadcnAvatarFallback>}
        </ShadcnAvatar>
        {online && <div className="absolute bottom-0 right-0 h-2.5 w-2.5 border-2 border-background bg-green-500 rounded-full" />}
      </div>
    );
  }
);
Avatar.displayName = "Avatar";
