export {
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
} from "@/components/ui/card";
export { CardContent as CardBody } from "@/components/ui/card";

import * as React from "react";
import { Card as ShadcnCard } from "@/components/ui/card";

export interface CardProps extends React.ComponentProps<typeof ShadcnCard> {
  elevated?: boolean;
  interactive?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, elevated, interactive, ...props }, ref) => {
    return (
      <ShadcnCard
        ref={ref}
        className={`${className || ""} ${elevated ? "shadow-md" : ""} ${interactive ? "hover:shadow-lg transition-shadow cursor-pointer" : ""}`}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";
