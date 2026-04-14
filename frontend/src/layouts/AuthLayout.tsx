import { Zap } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-card border-r border-border p-12">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <Zap className="h-4.5 w-4.5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-foreground text-xl tracking-tight">
            AgentHire
          </span>
        </div>

        <div className="space-y-6 max-w-md">
          <div className="space-y-2">
            <h2 className="font-display text-4xl font-bold text-foreground leading-tight">
              Find the perfect freelancer with{" "}
              <span className="text-primary">AI-powered</span> matching.
            </h2>
            <p className="text-muted-foreground text-lg">
              Post your project, get matched with top talent, and hire with
              confidence.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {[
              {
                emoji: "⚡",
                label: "AI Matching",
                desc: "Smart recommendations based on your project needs",
              },
              {
                emoji: "🔒",
                label: "Secure Payments",
                desc: "Algorand blockchain-backed transactions",
              },
              {
                emoji: "⭐",
                label: "Vetted Talent",
                desc: "Only the top 5% of freelancers",
              },
            ].map(({ emoji, label, desc }) => (
              <div key={label} className="flex items-start gap-3">
                <span className="text-xl mt-0.5">{emoji}</span>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {label}
                  </p>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} AgentHire. All rights reserved.
        </p>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-6">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2.5 mb-2">
            <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-foreground text-lg">
              AgentHire
            </span>
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              {title}
            </h1>
            {subtitle && (
              <p className="text-muted-foreground text-sm mt-1">{subtitle}</p>
            )}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
