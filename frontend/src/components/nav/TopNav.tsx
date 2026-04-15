import { Avatar } from "@/components/base/Avatar";
import { useAuthStore } from "@/store/authStore";
import { useSidebar } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";

interface TopNavProps {
  onMenuClick?: () => void;
  title?: string;
}

export function TopNav({ onMenuClick, title }: TopNavProps) {
  const email = useAuthStore((s) => s.email);
  const initials = email ? email.slice(0, 2).toUpperCase() : "U";
  const { toggleSidebar } = useSidebar();

  const handleMenuClick = () => {
    if (onMenuClick) onMenuClick();
    toggleSidebar();
  };

  return (
    <header className="h-16 border-b border-border bg-card flex items-center px-4 md:px-6 gap-4 shrink-0">
      {/* Mobile menu button */}
      <button
        type="button"
        data-ocid="topnav-menu"
        onClick={handleMenuClick}
        className="lg:hidden p-2 rounded-lg text-foreground/70 hover:bg-muted hover:text-foreground transition-smooth"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Page title */}
      {title && (
        <h1 className="text-base font-semibold text-foreground truncate hidden md:block">
          {title}
        </h1>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {/* User info */}
      <div
        data-ocid="topnav-user"
        className="flex items-center gap-2.5 pl-2 border-l border-border"
      >
        <div className="hidden sm:flex flex-col items-end">
          <span className="text-xs font-medium text-foreground leading-none">
            {email ?? "User"}
          </span>
          <span className="text-xs text-muted-foreground mt-0.5">Client</span>
        </div>
        <Avatar initials={initials} size="sm" online={true} />
      </div>
    </header>
  );
}
