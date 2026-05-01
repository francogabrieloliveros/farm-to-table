import { useState } from "react";
import { User, ClipboardList } from "lucide-react";
import AccountSettings from "@/components/consumer/AccountSettings";
import OrderHistory from "@/components/consumer/OrderHistory";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen py-8 sm:px-8">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-6">
        <aside className="w-full sm:w-48 shrink-0 max-sm:px-5">
          <nav className="flex sm:flex-col flex-row gap-1">
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-sm text-sm inter font-medium transition-colors w-full text-left
                  ${
                    activeTab === "profile"
                      ? "bg-[#e4e6e2] text-[#1C4419]"
                      : "text-[#42493E] hover:bg-[#e4e6e2] hover:text-[#1C4419]"
                  }`}
            >
              <User size={16} />
              Profile
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-sm text-sm inter font-medium transition-colors w-full text-left
                  ${
                    activeTab === "orders"
                      ? "bg-[#e4e6e2] text-[#1C4419]"
                      : "text-[#42493E] hover:bg-[#e4e6e2] hover:text-[#1C4419]"
                  }`}
            >
              <ClipboardList size={16} />
              Order History
            </button>
          </nav>
        </aside>

        <div className="flex-1">
          {activeTab === "profile" ? <AccountSettings /> : <OrderHistory />}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
