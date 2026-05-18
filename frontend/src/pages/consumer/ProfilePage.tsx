import { useState } from "react";
import { User, ClipboardList, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import AccountSettings from "@/components/consumer/AccountSettings";
import OrderHistory from "@/components/consumer/OrderHistory";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-[calc(100vh-80px)] py-12 px-4 sm:px-8 bg-muted/10 mt-16">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-card rounded-3xl p-4 shadow-sm border border-border/50 sticky top-24">
            <div className="px-4 pb-4 mb-4 border-b border-border/50">
              <h2 className="manrope font-extrabold text-xl text-foreground">
                My Account
              </h2>
            </div>
            <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveTab("profile")}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm inter font-bold transition-all w-full text-left whitespace-nowrap
                    ${
                      activeTab === "profile"
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
              >
                <User size={18} />
                Profile Settings
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm inter font-bold transition-all w-full text-left whitespace-nowrap
                    ${
                      activeTab === "orders"
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
              >
                <ClipboardList size={18} />
                Order History
              </button>
            </nav>
            <div className="mt-6 pt-6 border-t border-border/50">
              <Link
                to="/shop"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-sm inter font-bold transition-all w-full text-center bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft size={16} />
                Back to Shop
              </Link>
            </div>
          </div>
        </aside>

        <div className="flex-1 animate-in fade-in slide-in-from-right-4 duration-500">
          {activeTab === "profile" ? <AccountSettings /> : <OrderHistory />}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
