import { Lock, LogOut, Mail, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";
import { userService } from "@/services/user.service";

const profileSchema = z.object({
  firstName: z.string().trim().min(2, "First name must be at least 2 characters."),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim().min(2, "Last name must be at least 2 characters."),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().optional(),
    password: z.string().min(6, "Password must be at least 6 characters."),
    confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type ProfileFormValues = z.infer<typeof profileSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;

const AccountSettings = () => {
  const { user, logout, updateStoredUser } = useAuth();
  const [isEditingInfo, setIsEditingInfo] = useState(false);

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      middleName: user?.middleName || "",
      lastName: user?.lastName || "",
    },
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (user) {
      profileForm.reset({
        firstName: user.firstName || "",
        middleName: user.middleName || "",
        lastName: user.lastName || "",
      });
    }
  }, [user, profileForm]);

  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const handleUpdateInfo = async (values: ProfileFormValues) => {
    try {
      setIsUpdatingProfile(true);
      const updatedUser = await userService.updateProfile({
        firstName: values.firstName,
        middleName: values.middleName || "",
        lastName: values.lastName,
      });

      updateStoredUser({
        firstName: updatedUser.firstName,
        middleName: updatedUser.middleName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        userType: updatedUser.userType,
      });

      setIsEditingInfo(false);
      toast.success("Profile updated successfully.");
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Failed to update profile.";
      toast.error(message);
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleUpdatePassword = async (values: PasswordFormValues) => {
    try {
      setIsUpdatingPassword(true);
      await userService.updateProfile({
        firstName: user?.firstName || "",
        middleName: user?.middleName || "",
        lastName: user?.lastName || "",
        password: values.password,
      });

      passwordForm.reset();
      toast.success("Password updated successfully.");
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Failed to update password.";
      toast.error(message);
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const inputClass =
    "w-full bg-background border border-border rounded-xl px-4 py-3 inter text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 hover:border-primary/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed";

  const errorClass = "inter text-xs text-destructive mt-1.5 font-medium";

  return (
    <div className="w-full">
      <div className="mb-6 px-2">
        <h2 className="manrope font-extrabold text-3xl text-foreground">
          Account Settings
        </h2>
        <p className="inter text-sm text-muted-foreground mt-1">
          Manage your personal details and preferences.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <form
          onSubmit={profileForm.handleSubmit(handleUpdateInfo)}
          className="bg-card shadow-sm border border-border/50 rounded-3xl p-6 sm:p-8"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="manrope font-bold text-foreground text-xl">
              Personal Information
            </h3>
            <button
              type="button"
              onClick={() => setIsEditingInfo((prev) => !prev)}
              className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-muted rounded-full"
            >
              <Pencil size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="inter text-xs font-semibold text-muted-foreground mb-1.5 block tracking-wide uppercase">
                First Name
              </label>
              <input
                className={inputClass}
                disabled={!isEditingInfo}
                placeholder="Juan"
                {...profileForm.register("firstName")}
              />
              {profileForm.formState.errors.firstName && (
                <p className={errorClass}>
                  {profileForm.formState.errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label className="inter text-xs font-semibold text-muted-foreground mb-1.5 block tracking-wide uppercase">
                Middle Name (Optional)
              </label>
              <input
                className={inputClass}
                disabled={!isEditingInfo}
                placeholder="Optional"
                {...profileForm.register("middleName")}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="inter text-xs font-semibold text-muted-foreground mb-1.5 block tracking-wide uppercase">
                Last Name
              </label>
              <input
                className={inputClass}
                disabled={!isEditingInfo}
                placeholder="Dela Cruz"
                {...profileForm.register("lastName")}
              />
              {profileForm.formState.errors.lastName && (
                <p className={errorClass}>
                  {profileForm.formState.errors.lastName.message}
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className="inter text-xs font-semibold text-muted-foreground mb-1.5 block tracking-wide uppercase">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#42493E]"
                />
                <input
                  className={`${inputClass} pl-9`}
                  value={user?.email || ""}
                  disabled
                />
              </div>
            </div>
          </div>

          {isEditingInfo && (
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                disabled={isUpdatingProfile}
                className="bg-primary text-primary-foreground manrope font-bold text-sm px-6 py-3 rounded-xl transition-all hover:bg-primary/90 hover:shadow-md disabled:opacity-70"
              >
                {isUpdatingProfile
                  ? "Updating..."
                  : "Update Information"}
              </button>
            </div>
          )}
        </form>

        <form
          onSubmit={passwordForm.handleSubmit(handleUpdatePassword)}
          className="bg-card shadow-sm border border-border/50 rounded-3xl p-6 sm:p-8"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="manrope font-bold text-foreground text-xl">
              Security
            </h3>
            <div className="p-2 bg-muted rounded-full">
              <Lock size={18} className="text-muted-foreground" />
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div>
              <label className="inter text-xs font-semibold text-muted-foreground mb-1.5 block tracking-wide uppercase">
                Current Password
              </label>
              <input
                className={inputClass}
                type="password"
                placeholder="••••••••"
                {...passwordForm.register("currentPassword")}
              />
            </div>

            <div>
              <label className="inter text-xs font-semibold text-muted-foreground mb-1.5 block tracking-wide uppercase">
                New Password
              </label>
              <input
                className={inputClass}
                type="password"
                placeholder="Enter new password"
                {...passwordForm.register("password")}
              />
              {passwordForm.formState.errors.password && (
                <p className={errorClass}>
                  {passwordForm.formState.errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label className="inter text-xs font-semibold text-muted-foreground mb-1.5 block tracking-wide uppercase">
                Confirm New Password
              </label>
              <input
                className={inputClass}
                type="password"
                placeholder="Confirm new password"
                {...passwordForm.register("confirmPassword")}
              />
              {passwordForm.formState.errors.confirmPassword && (
                <p className={errorClass}>
                  {passwordForm.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="flex justify-end mt-2">
              <button
                type="submit"
                disabled={isUpdatingPassword}
                className="bg-primary text-primary-foreground manrope font-bold text-sm px-6 py-3 rounded-xl transition-all hover:bg-primary/90 hover:shadow-md disabled:opacity-70"
              >
                {isUpdatingPassword
                  ? "Updating..."
                  : "Update Password"}
              </button>
            </div>
          </div>
        </form>

        <div className="flex justify-end px-2 sm:px-0">
          <button
            onClick={logout}
            className="flex items-center justify-center gap-2 w-full sm:w-auto bg-destructive text-destructive-foreground manrope font-bold text-sm px-6 py-3 rounded-xl transition-all hover:bg-destructive/90 hover:shadow-md cursor-pointer"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
