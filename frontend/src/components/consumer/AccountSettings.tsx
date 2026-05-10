import { Lock, LogOut, Mail, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
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

  const profileMutation = useMutation({
    mutationFn: userService.updateProfile,
    onSuccess: (updatedUser) => {
      updateStoredUser({
        firstName: updatedUser.firstName,
        middleName: updatedUser.middleName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        userType: updatedUser.userType,
      });

      setIsEditingInfo(false);
      toast.success("Profile updated successfully.");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to update profile.";
      toast.error(message);
    },
  });

  const passwordMutation = useMutation({
    mutationFn: userService.updateProfile,
    onSuccess: () => {
      passwordForm.reset();
      toast.success("Password updated successfully.");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to update password.";
      toast.error(message);
    },
  });

  const handleUpdateInfo = (values: ProfileFormValues) => {
    profileMutation.mutate({
      firstName: values.firstName,
      middleName: values.middleName || "",
      lastName: values.lastName,
    });
  };

  const handleUpdatePassword = (values: PasswordFormValues) => {
    passwordMutation.mutate({
      firstName: user?.firstName || "",
      middleName: user?.middleName || "",
      lastName: user?.lastName || "",
      password: values.password,
    });
  };

  const inputClass =
    "w-full bg-[#e4e6e2] rounded-sm px-4 py-2.5 inter text-sm text-gray-700 outline-none disabled:opacity-70";

  const errorClass = "inter text-xs text-[#7E2700] mt-1";

  return (
    <div className="w-full">
      <div className="mb-6 max-sm:px-5">
        <h2 className="manrope font-bold text-2xl text-[#1C4419]">
          Account Settings
        </h2>
        <p className="inter text-sm text-[#42493E] mt-1">
          Manage your personal details and preferences.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <form
          onSubmit={profileForm.handleSubmit(handleUpdateInfo)}
          className="bg-white sm:rounded-sm p-5 sm:p-6"
        >
          <div className="flex justify-between items-center mb-5">
            <h3 className="manrope font-bold text-[#1C4419] text-lg">
              Personal Information
            </h3>
            <button
              type="button"
              onClick={() => setIsEditingInfo((prev) => !prev)}
              className="text-gray-400 hover:text-[#1C4419] transition-colors"
            >
              <Pencil size={18} color="#42493E" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="inter text-xs text-[#42493E] mb-1 block">
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
              <label className="inter text-xs text-[#42493E] mb-1 block">
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
              <label className="inter text-xs text-[#42493E] mb-1 block">
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
              <label className="inter text-xs text-[#42493E] mb-1 block">
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
            <div className="flex justify-end mt-5">
              <button
                type="submit"
                disabled={profileMutation.isPending}
                className="bg-[#1C4419] text-white manrope font-semibold text-sm px-5 py-2.5 rounded-sm transition-colors disabled:opacity-70"
              >
                {profileMutation.isPending
                  ? "Updating..."
                  : "Update Information"}
              </button>
            </div>
          )}
        </form>

        <form
          onSubmit={passwordForm.handleSubmit(handleUpdatePassword)}
          className="bg-white sm:rounded-sm p-5 sm:p-6"
        >
          <div className="flex justify-between items-center mb-5">
            <h3 className="manrope font-bold text-[#1C4419] text-lg">
              Security
            </h3>
            <Lock size={18} color="#42493E" />
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <label className="inter text-xs text-[#42493E] mb-1 block">
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
              <label className="inter text-xs text-[#42493E] mb-1 block">
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
              <label className="inter text-xs text-[#42493E] mb-1 block">
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

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={passwordMutation.isPending}
                className="bg-[#1C4419] text-white manrope font-semibold text-sm px-5 py-2.5 rounded-sm transition-colors disabled:opacity-70"
              >
                {passwordMutation.isPending
                  ? "Updating..."
                  : "Update Password"}
              </button>
            </div>
          </div>
        </form>

        <div className="flex justify-end max-sm:p-5">
          <button
            onClick={logout}
            className="flex items-center gap-2 bg-[#7E2700] text-white manrope font-semibold text-sm px-5 py-2.5 rounded-sm transition-colors cursor-pointer"
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
