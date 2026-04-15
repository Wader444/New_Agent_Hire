import { AppSidebar } from "@/components/nav/AppSidebar";
import { TopNav } from "@/components/nav/TopNav";
import { SidebarProvider } from "@/components/ui/sidebar";
import { type ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
}

export function DashboardLayout({ children, title }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex w-full h-screen bg-background overflow-hidden">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <TopNav title={title} />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
