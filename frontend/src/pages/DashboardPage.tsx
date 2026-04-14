import { Avatar } from "@/components/base/Avatar";
import { Badge } from "@/components/base/Badge";
import { Button } from "@/components/base/Button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/base/Card";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { useAuthStore } from "@/store/authStore";
import { freelancers } from "@/utils/mockData";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Briefcase,
  BriefcaseBusiness,
  CheckCircle2,
  DollarSign,
  MessageSquare,
  Sparkles,
  Star,
  TrendingDown,
  TrendingUp,
  UserCheck,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

const stats = [
  {
    label: "Total Projects Posted",
    value: "12",
    icon: BriefcaseBusiness,
    change: "+2 this month",
    trend: "up",
  },
  {
    label: "Active Freelancers",
    value: "34",
    icon: Users,
    change: "+5 this week",
    trend: "up",
  },
  {
    label: "Hired This Month",
    value: "7",
    icon: UserCheck,
    change: "+3 vs last month",
    trend: "up",
  },
  {
    label: "Total Spent",
    value: "$8,420",
    icon: DollarSign,
    change: "↓12% vs last month",
    trend: "down",
  },
];

const recentActivity = [
  {
    icon: UserCheck,
    message: "John D. applied to your React Dashboard project",
    time: "15 min ago",
    status: "primary",
  },
  {
    icon: Briefcase,
    message: "Your 'Mobile App Redesign' project went live",
    time: "2h ago",
    status: "success",
  },
  {
    icon: Sparkles,
    message: "AI found 4 new matches for your Backend API project",
    time: "4h ago",
    status: "primary",
  },
  {
    icon: MessageSquare,
    message: "Priya Patel sent you a project proposal",
    time: "1d ago",
    status: "default",
  },
  {
    icon: CheckCircle2,
    message: "Project 'Landing Page Revamp' marked as completed",
    time: "2d ago",
    status: "success",
  },
];

const aiRecommended =
  freelancers.find((f) => f.isAiRecommended) ?? freelancers[0];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function formatDate() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function DashboardPage() {
  const email = useAuthStore((s) => s.email);
  const displayName = email?.split("@")[0] ?? "there";

  return (
    <DashboardLayout title="Dashboard">
      <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8">
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground capitalize">
            {getGreeting()}, {displayName} 👋
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">{formatDate()}</p>
        </motion.div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(({ label, value, icon: Icon, change, trend }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: "easeOut" }}
            >
              <Card
                elevated
                className="p-5 flex flex-col gap-3 hover:-translate-y-0.5 transition-smooth"
                data-ocid={`stat-card-${label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="flex items-start justify-between">
                  <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  {trend === "up" ? (
                    <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                  ) : (
                    <TrendingDown className="h-3.5 w-3.5 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-foreground tracking-tight">
                    {value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
                    {label}
                  </p>
                </div>
                <p
                  className={`text-xs font-medium ${trend === "up" ? "text-emerald-500" : "text-muted-foreground"}`}
                >
                  {change}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions + AI Teaser row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35, duration: 0.4 }}
          >
            <Card elevated className="h-full">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  <CardTitle>Quick Actions</CardTitle>
                </div>
              </CardHeader>
              <CardBody className="flex flex-col gap-3">
                <Link
                  to="/post-project"
                  data-ocid="dashboard-post-project-link"
                >
                  <Button
                    variant="primary"
                    className="w-full justify-between"
                    data-ocid="dashboard-post-project"
                  >
                    Post New Project <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/freelancers" data-ocid="dashboard-browse-link">
                  <Button
                    variant="outline"
                    className="w-full justify-between"
                    data-ocid="dashboard-browse"
                  >
                    Browse Freelancers <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <p className="text-xs text-muted-foreground mt-1">
                  Need help? Our AI matches you with the right talent in
                  seconds.
                </p>
              </CardBody>
            </Card>
          </motion.div>

          {/* AI Recommendation Teaser */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.42, duration: 0.4 }}
          >
            <Card elevated className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <CardTitle>AI Recommended</CardTitle>
                  </div>
                  <Link to="/freelancers" data-ocid="dashboard-view-all-ai">
                    <Button variant="ghost" className="text-xs h-7 px-2 gap-1">
                      View All <ArrowRight className="h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardBody>
                <div className="flex items-start gap-4">
                  <div className="relative shrink-0">
                    <Avatar initials={aiRecommended.avatar} size="lg" />
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500">
                      <span className="h-2 w-2 rounded-full bg-emerald-200 animate-ping absolute" />
                      <span className="h-1.5 w-1.5 rounded-full bg-white relative" />
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-display font-semibold text-foreground truncate">
                        {aiRecommended.name}
                      </h3>
                      <Badge variant="primary" className="shrink-0">
                        {aiRecommended.matchPercentage}% Match
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {aiRecommended.role}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-medium text-foreground">
                        {aiRecommended.rating}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({aiRecommended.reviewCount} reviews)
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {aiRecommended.bio}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {aiRecommended.skills.slice(0, 3).map((skill) => (
                        <Badge
                          key={skill}
                          variant="default"
                          className="text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                      {aiRecommended.skills.length > 3 && (
                        <Badge variant="default" className="text-xs">
                          +{aiRecommended.skills.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="shrink-0 text-right hidden sm:block">
                    <p className="font-display text-lg font-bold text-foreground">
                      ${aiRecommended.hourlyRate}
                      <span className="text-xs font-normal text-muted-foreground">
                        /hr
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {aiRecommended.experience} exp.
                    </p>
                    <Link
                      to="/freelancers"
                      className="mt-3 block"
                      data-ocid="dashboard-ai-hire"
                    >
                      <Button
                        variant="primary"
                        className="text-xs h-8 px-3 mt-2"
                      >
                        View Profile
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <Card elevated>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardBody className="divide-y divide-border">
              {recentActivity.map(
                ({ icon: ActivityIcon, message, time, status }, i) => (
                  <motion.div
                    key={message}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.55 + i * 0.06, duration: 0.35 }}
                    className="flex items-start gap-3 py-3 first:pt-0 last:pb-0"
                    data-ocid={`activity-item-${i}`}
                  >
                    <div
                      className={`mt-0.5 h-7 w-7 rounded-full flex items-center justify-center shrink-0 ${
                        status === "success"
                          ? "bg-emerald-100 dark:bg-emerald-900/30"
                          : status === "primary"
                            ? "bg-primary/10"
                            : "bg-muted"
                      }`}
                    >
                      <ActivityIcon
                        className={`h-3.5 w-3.5 ${
                          status === "success"
                            ? "text-emerald-600"
                            : status === "primary"
                              ? "text-primary"
                              : "text-muted-foreground"
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground leading-snug">
                        {message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {time}
                      </p>
                    </div>
                    <Badge
                      variant={
                        status === "success"
                          ? "success"
                          : status === "primary"
                            ? "primary"
                            : "default"
                      }
                      className="shrink-0 self-start mt-0.5"
                    >
                      {status === "success"
                        ? "Done"
                        : status === "primary"
                          ? "New"
                          : "Active"}
                    </Badge>
                  </motion.div>
                ),
              )}
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
