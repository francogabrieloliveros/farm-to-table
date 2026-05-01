import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  BarChart2,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import type { ReactElement } from "react";

type Page = "dashboard" | "users" | "inventory" | "orders" | "reports";

export default function AdminLayout({ children }: { children: ReactElement }) {
  const [page, setPage] = useState<Page>("dashboard");

  return (
    <div className="flex h-screen w-screen bg-[#E2E1DF] font-sans">
      <aside className="w-44 shrink-0 flex flex-col bg-white border-r border-[#E2E1DF]">
        <div className="px-5 pt-6 pb-4">
          <p className="text-sm font-bold text-[#1C4419] leading-tight">
            Farm-to-table
          </p>
          <p className="text-xs text-gray-400 mt-0.5">Management Portal</p>
        </div>

        <nav className="flex-1 px-3 mt-2 flex flex-col gap-1">
          <Link to="/admin/dashboard">
            <button
              onClick={() => setPage("dashboard")}
              className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-md text-sm font-medium text-left transition-colors ${
                page === "dashboard"
                  ? "bg-[#1C4419] text-white"
                  : "text-gray-600"
              }`}
            >
              <LayoutDashboard size={18} />
              Dashboard
            </button>
          </Link>

          <Link to="/admin/users">
            <button
              onClick={() => setPage("users")}
              className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-md text-sm font-medium text-left transition-colors ${
                page === "users" ? "bg-[#1C4419] text-white" : "text-gray-600"
              }`}
            >
              <Users size={18} />
              Users
            </button>
          </Link>

          <Link to="/admin/inventory">
            <button
              onClick={() => setPage("inventory")}
              className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-md text-sm font-medium text-left transition-colors ${
                page === "inventory"
                  ? "bg-[#1C4419] text-white"
                  : "text-gray-600"
              }`}
            >
              <Package size={18} />
              Inventory
            </button>
          </Link>

          <Link to="/admin/orders">
            <button
              onClick={() => setPage("orders")}
              className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-md text-sm font-medium text-left transition-colors ${
                page === "orders" ? "bg-[#1C4419] text-white" : "text-gray-600"
              }`}
            >
              <ShoppingCart size={18} />
              Orders
            </button>
          </Link>

          <Link to="/admin/reports">
            <button
              onClick={() => setPage("reports")}
              className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-md text-sm font-medium text-left transition-colors ${
                page === "reports" ? "bg-[#1C4419] text-white" : "text-gray-600"
              }`}
            >
              <BarChart2 size={18} />
              Reports
            </button>
          </Link>
        </nav>

        <div className="px-3 pb-6">
          <button className="flex items-center gap-2.5 w-full px-3 py-2 rounded-md text-sm font-medium text-gray-500">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
