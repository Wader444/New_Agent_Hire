import { Avatar } from "@/components/base/Avatar";
import { Badge } from "@/components/base/Badge";
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
import { useAuthStore } from "@/store/authStore";
import { Camera, DollarSign, Save, X } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

interface ProfileFormValues {
  fullName: string;
  email: string;
  bio: string;
  hourlyRate: string;
}

const DEFAULT_SKILLS = [
  "Product Management",
  "React",
  "TypeScript",
  "UI/UX Design",
];
const DEFAULT_BIO =
  "Experienced product manager and developer looking to hire top-tier freelancers for fast-moving projects.";

export default function ProfilePage() {
  const email = useAuthStore((s) => s.email);
  const derivedName = email?.split("@")[0]?.replace(/[._-]/g, " ") ?? "User";

  const { control, handleSubmit, reset, watch } = useForm<ProfileFormValues>({
    defaultValues: {
      fullName: derivedName,
      email: email ?? "",
      bio: DEFAULT_BIO,
      hourlyRate: "85",
    },
  });

  const [skills, setSkills] = useState<string[]>(DEFAULT_SKILLS);
  const [skillInput, setSkillInput] = useState("");
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Track the "committed" skills for cancel support
  const [savedSkills, setSavedSkills] = useState<string[]>(DEFAULT_SKILLS);
  const [savedAvatarSrc, setSavedAvatarSrc] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const watchedName = watch("fullName");
  const initials =
    watchedName
      .trim()
      .split(/\s+/)
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatarSrc(url);
  }

  function handleSkillKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      const trimmed = skillInput.trim();
      if (!skills.includes(trimmed)) {
        setSkills((prev) => [...prev, trimmed]);
      }
      setSkillInput("");
    }
  }

  function removeSkill(skill: string) {
    setSkills((prev) => prev.filter((s) => s !== skill));
  }

  async function onSubmit(_values: ProfileFormValues) {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 900));
    setSaving(false);
    setSavedSkills(skills);
    setSavedAvatarSrc(avatarSrc);
    toast.success("Profile updated!");
  }

  function handleCancel() {
    reset();
    setSkills(savedSkills);
    setAvatarSrc(savedAvatarSrc);
    setSkillInput("");
  }

  return (
    <DashboardLayout title="Profile">
      <motion.div
        className="p-6 md:p-8 max-w-5xl mx-auto space-y-6"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Page header */}
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            My Profile
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Manage your account details and public presence.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 items-start">
            {/* ── Left column: Avatar ── */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.35,
                delay: 0.08,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <Card elevated>
                <CardBody className="py-8 flex flex-col items-center gap-5">
                  {/* Large avatar */}
                  <div className="relative group">
                    <div className="h-28 w-28 rounded-full overflow-hidden bg-primary flex items-center justify-center ring-4 ring-border">
                      {avatarSrc ? (
                        <img
                          src={avatarSrc}
                          alt="Profile avatar"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-primary-foreground text-3xl font-bold font-display">
                          {initials}
                        </span>
                      )}
                    </div>
                    {/* Overlay on hover */}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute inset-0 rounded-full flex items-center justify-center bg-foreground/0 group-hover:bg-foreground/50 transition-all duration-200 cursor-pointer"
                      aria-label="Change profile photo"
                      data-ocid="profile-avatar-overlay"
                    >
                      <Camera className="h-6 w-6 text-background opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </button>
                  </div>

                  {/* Hidden file input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={handlePhotoChange}
                    data-ocid="profile-photo-input"
                  />

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="gap-1.5"
                    data-ocid="profile-change-photo-btn"
                  >
                    <Camera className="h-3.5 w-3.5" />
                    Change Photo
                  </Button>

                  <div className="text-center space-y-1">
                    <p className="font-semibold text-foreground capitalize leading-snug">
                      {watchedName || "Your Name"}
                    </p>
                    <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                      {email}
                    </p>
                    <Badge variant="primary" size="sm" className="mt-1">
                      Client
                    </Badge>
                  </div>

                  <p className="text-xs text-muted-foreground text-center leading-relaxed">
                    JPG, PNG or GIF. Max 5 MB. Changes are previewed locally.
                  </p>
                </CardBody>
              </Card>
            </motion.div>

            {/* ── Right column: Form fields ── */}
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.35,
                delay: 0.12,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="space-y-5"
            >
              <Card elevated>
                <CardHeader>
                  <CardTitle>Edit Profile</CardTitle>
                  <CardDescription>
                    Update your personal details, skills, and rate.
                  </CardDescription>
                </CardHeader>
                <CardBody className="pb-6 space-y-5">
                  {/* Full Name */}
                  <Controller
                    name="fullName"
                    control={control}
                    rules={{ required: "Name is required" }}
                    render={({ field, fieldState }) => (
                      <Input
                        {...field}
                        label="Full Name"
                        placeholder="e.g. Sarah Johnson"
                        error={fieldState.error?.message}
                        data-ocid="profile-name"
                      />
                    )}
                  />

                  {/* Email (readonly) */}
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Email"
                        readOnly
                        disabled
                        hint="Email address cannot be changed"
                        className="opacity-60 cursor-not-allowed"
                        data-ocid="profile-email"
                      />
                    )}
                  />

                  {/* Bio */}
                  <Controller
                    name="bio"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        label="Bio"
                        placeholder="Tell freelancers about yourself and your projects..."
                        rows={3}
                        data-ocid="profile-bio"
                      />
                    )}
                  />

                  {/* Skills tags input */}
                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-foreground">
                      Skills / Interests
                    </span>
                    <div
                      className={cn(
                        "flex flex-wrap gap-2 p-3 rounded-lg min-h-[52px] border border-border bg-muted/30",
                        skills.length === 0 && "items-center",
                      )}
                    >
                      {skills.length === 0 && (
                        <span className="text-xs text-muted-foreground">
                          No skills added yet
                        </span>
                      )}
                      {skills.map((skill) => (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-medium px-2.5 py-1 rounded-full border border-primary/20 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 transition-all duration-150"
                          aria-label={`Remove ${skill}`}
                          data-ocid={`profile-skill-tag-${skill.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                          {skill}
                          <X className="h-3 w-3" />
                        </button>
                      ))}
                    </div>
                    <Input
                      placeholder="Type a skill and press Enter to add..."
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={handleSkillKeyDown}
                      hint="Press Enter to add · Click a tag to remove"
                      data-ocid="profile-skill-input"
                    />
                  </div>

                  {/* Hourly Rate with $ prefix */}
                  <Controller
                    name="hourlyRate"
                    control={control}
                    rules={{
                      min: { value: 0, message: "Rate must be positive" },
                    }}
                    render={({ field, fieldState }) => (
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="hourly-rate"
                          className="text-sm font-medium text-foreground"
                        >
                          Hourly Rate
                        </label>
                        <div className="relative flex items-center">
                          <span className="absolute left-3 flex items-center pointer-events-none">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                          </span>
                          <input
                            {...field}
                            id="hourly-rate"
                            type="number"
                            min={0}
                            step={5}
                            placeholder="85"
                            className={cn(
                              "input-base w-full text-sm pl-8",
                              fieldState.error &&
                                "border-destructive focus:ring-destructive",
                            )}
                            data-ocid="profile-hourly-rate"
                          />
                          <span className="absolute right-3 text-xs text-muted-foreground pointer-events-none">
                            /hr
                          </span>
                        </div>
                        {fieldState.error && (
                          <p className="text-xs text-destructive">
                            {fieldState.error.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </CardBody>
              </Card>

              {/* Action buttons */}
              <div className="flex items-center gap-3 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={handleCancel}
                  disabled={saving}
                  data-ocid="profile-cancel"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  loading={saving}
                  className="gap-2 min-w-[140px]"
                  data-ocid="profile-save"
                >
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </motion.div>
          </div>
        </form>
      </motion.div>
    </DashboardLayout>
  );
}
