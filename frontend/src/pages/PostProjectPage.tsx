import { Button } from "@/components/base/Button";
import {
  Card,
  CardBody,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/base/Card";
import { Input, Textarea } from "@/components/base/Input";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { cn } from "@/lib/utils";
import { postProject } from "@/utils/api";
import { useNavigate } from "@tanstack/react-router";
import { DollarSign, Tag, X } from "lucide-react";
import { type KeyboardEvent, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

interface ProjectFormData {
  title: string;
  description: string;
  budget: number;
}

export default function PostProjectPage() {
  const navigate = useNavigate();
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [skillError, setSkillError] = useState("");
  const skillInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormData>({ mode: "onBlur" });

  function addSkill(value: string) {
    const trimmed = value.trim().replace(/,$/, "");
    if (!trimmed) return;
    if (skills.includes(trimmed)) {
      setSkillError("Skill already added");
      return;
    }
    setSkills((prev) => [...prev, trimmed]);
    setSkillInput("");
    setSkillError("");
  }

  function removeSkill(skill: string) {
    setSkills((prev) => prev.filter((s) => s !== skill));
  }

  function handleSkillKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill(skillInput);
    } else if (e.key === "Backspace" && !skillInput && skills.length > 0) {
      setSkills((prev) => prev.slice(0, -1));
    }
  }

  async function onSubmit(data: ProjectFormData) {
    try {
      const res = await postProject({
        title: data.title,
        description: data.description,
        budget: String(data.budget),
      });
      toast.success(res.message);
      navigate({ to: "/freelancers" });
    } catch {
      toast.error("Failed to post project. Please try again.");
    }
  }

  return (
    <DashboardLayout title="Post a Project">
      <div className="p-6 md:p-8 max-w-2xl mx-auto">
        {/* Page heading */}
        <div className="mb-7">
          <h1 className="font-display text-2xl font-bold text-foreground">
            Post a Project
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Describe your project and our AI will find the best-fit freelancers
            for you.
          </p>
        </div>

        <Card elevated>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>
              Fill in the details below to attract top talent.
            </CardDescription>
          </CardHeader>
          <CardBody className="pb-7">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
              noValidate
            >
              {/* Project Title */}
              <Input
                label="Project Title"
                placeholder="e.g. Build a React Dashboard with TypeScript"
                error={errors.title?.message}
                data-ocid="post-project-title"
                {...register("title", {
                  required: "Project title is required",
                  minLength: {
                    value: 10,
                    message: "Title must be at least 10 characters",
                  },
                })}
              />

              {/* Description */}
              <Controller
                control={control}
                name="description"
                rules={{
                  required: "Description is required",
                  minLength: {
                    value: 50,
                    message: "Description must be at least 50 characters",
                  },
                }}
                render={({ field }) => (
                  <Textarea
                    label="Description"
                    placeholder="Describe the project scope, deliverables, required skills, and any important context..."
                    rows={5}
                    error={errors.description?.message}
                    data-ocid="post-project-description"
                    {...field}
                  />
                )}
              />

              {/* Budget */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="budget"
                  className="text-sm font-medium text-foreground"
                >
                  Budget (USD)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <input
                    id="budget"
                    type="number"
                    placeholder="e.g. 2500"
                    min={10}
                    step="1"
                    className={cn(
                      "input-base w-full text-sm pl-8",
                      errors.budget &&
                        "border-destructive focus:ring-destructive",
                    )}
                    data-ocid="post-project-budget"
                    {...register("budget", {
                      required: "Budget is required",
                      min: {
                        value: 10,
                        message: "Minimum budget is $10",
                      },
                      valueAsNumber: true,
                    })}
                  />
                </div>
                {errors.budget ? (
                  <p className="text-xs text-destructive">
                    {errors.budget.message}
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    Enter your total budget for this project
                  </p>
                )}
              </div>

              {/* Skills Tags Input */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="skills-input"
                  className="text-sm font-medium text-foreground"
                >
                  Skills Required
                  <span className="text-muted-foreground font-normal ml-1">
                    (optional)
                  </span>
                </label>
                <div
                  className={cn(
                    "input-base flex flex-wrap gap-1.5 min-h-[42px] cursor-text",
                    skillError &&
                      "border-destructive focus-within:ring-destructive",
                  )}
                >
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-medium px-2 py-0.5 rounded-md"
                    >
                      <Tag className="h-3 w-3" />
                      {skill}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeSkill(skill);
                        }}
                        className="ml-0.5 hover:text-destructive transition-colors rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        aria-label={`Remove ${skill}`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                  <input
                    ref={skillInputRef}
                    id="skills-input"
                    type="text"
                    value={skillInput}
                    onChange={(e) => {
                      setSkillInput(e.target.value);
                      setSkillError("");
                      if (e.target.value.endsWith(",")) {
                        addSkill(e.target.value);
                      }
                    }}
                    onKeyDown={handleSkillKeyDown}
                    onBlur={() => {
                      if (skillInput.trim()) addSkill(skillInput);
                    }}
                    placeholder={
                      skills.length === 0
                        ? "Type a skill and press Enter or comma…"
                        : ""
                    }
                    className="flex-1 min-w-[140px] bg-transparent outline-none text-sm placeholder:text-muted-foreground"
                    data-ocid="post-project-skills-input"
                  />
                </div>
                {skillError ? (
                  <p className="text-xs text-destructive">{skillError}</p>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    Press Enter or comma to add each skill. Backspace to remove
                    the last one.
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-3">
                <Button
                  type="submit"
                  loading={isSubmitting}
                  size="lg"
                  className="flex-1"
                  data-ocid="post-project-submit"
                >
                  {isSubmitting ? "Posting…" : "Post Project"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => navigate({ to: "/dashboard" })}
                  data-ocid="post-project-cancel"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  );
}
