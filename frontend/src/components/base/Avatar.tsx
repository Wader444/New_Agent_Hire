export { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// Custom wrapper to handle custom props
export function CustomAvatar({
  initials,
  size,
  online,
  ...props
}: any) {
  const { Avatar, AvatarFallback } = require("@/components/ui/avatar");
  const sizeClass = size === "sm" ? "h-8 w-8" : "h-10 w-10";
  
  return (
    <div className={`relative ${sizeClass}`}>
      <Avatar className={sizeClass}>
        <AvatarFallback className={sizeClass}>{initials}</AvatarFallback>
      </Avatar>
      {online && <div className="absolute bottom-0 right-0 h-2 w-2 bg-green-500 rounded-full" />}
    </div>
  );
}
