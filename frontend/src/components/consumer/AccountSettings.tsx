import { useState } from "react";
import { Pencil, Lock, LogOut, Mail } from "lucide-react";

const AccountSettings = () => {
  const [firstName, setFirstName] = useState("Eleanor");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("Vance");
  const [email, setEmail] = useState("eleanor.vance@example.com");
  const [isEditingInfo, setIsEditingInfo] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleUpdateInfo = () => {
    setIsEditingInfo(false);
    // Put request
  };

  const handleUpdatePassword = () => {
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      return;
    }
    setPasswordError("");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    // Put request
  };

  const inputClass =
    "w-full bg-[#e4e6e2] rounded-sm px-4 py-2.5 inter text-sm text-gray-700 outline-none";

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
        <div className="bg-white sm:rounded-sm p-5 sm:p-6">
          <div className="flex justify-between items-center mb-5">
            <h3 className="manrope font-bold text-[#1C4419] text-lg">
              Personal Information
            </h3>
            <button
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
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={!isEditingInfo}
                placeholder="Juan"
              />
            </div>
            <div>
              <label className="inter text-xs text-[#42493E] mb-1 block">
                Middle Name (Optional)
              </label>
              <input
                className={inputClass}
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
                disabled={!isEditingInfo}
                placeholder="Optional"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="inter text-xs text-[#42493E] mb-1 block">
                Last Name
              </label>
              <input
                className={inputClass}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={!isEditingInfo}
                placeholder="Dela Cruz"
              />
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!isEditingInfo}
                />
              </div>
            </div>
          </div>

          {isEditingInfo && (
            <div className="flex justify-end mt-5">
              <button
                onClick={handleUpdateInfo}
                className="bg-[#1C4419] text-white manrope font-semibold text-sm px-5 py-2.5 rounded-sm hover:bg-[#1C4419] transition-colors"
              >
                Update Information
              </button>
            </div>
          )}
        </div>

        <div className="bg-white sm:rounded-sm p-5 sm:p-6">
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
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="inter text-xs text-[#42493E] mb-1 block">
                New Password
              </label>
              <input
                className={inputClass}
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </div>
            <div>
              <label className="inter text-xs text-[#42493E] mb-1 block">
                Confirm New Password
              </label>
              <input
                className={inputClass}
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
              />
            </div>

            {passwordError && (
              <p className="inter text-xs text-[#7E2700]">{passwordError}</p>
            )}

            <div className="flex justify-end">
              <button
                onClick={handleUpdatePassword}
                className="bg-[#1C4419] text-white manrope font-semibold text-sm px-5 py-2.5 rounded-sm transition-colors"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end max-sm:p-5">
          <button className="flex items-center gap-2 bg-[#7E2700] text-white manrope font-semibold text-sm px-5 py-2.5 rounded-sm transition-colors">
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
