import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  BarChart2,
  LogOut,
} from "lucide-react";
import { Link, useLocation } from "react-router";
import type { ReactElement } from "react";
import useAuth from "@/hooks/useAuth";

export default function AdminLayout({ children }: { children: ReactElement }) {
  const { logout } = useAuth();
  const { pathname } = useLocation();
  const page = pathname.split("/")[2] ?? "dashboard";

  const buttonStyling = (buttonPage: string) =>
    `flex items-center gap-2.5 w-full px-3 py-2 rounded-md text-sm font-medium text-left transition-colors ${
      page === buttonPage ? "bg-white text-[#1C4419] shadow-sm" : ""
    }`;

  return (
    <div className="flex h-screen w-screen bg-[#FAF9F6] font-sans inter text-[#42493E]">
      <aside className="w-12 md:w-64 shrink-0 flex flex-col bg-[#F5F5F4] border-r border-[#ecebe9]">
        <div className="px-5 pt-6 pb-4 max-md:hidden">
          <p className="text-lg font-bold text-[#1C4419] leading-tight manrope">
            Farm-to-table
          </p>
          <p className="text-xs mt-0.5">Management Portal</p>
        </div>

        <nav className="flex-1 px-1 md:px-3 mt-2 flex flex-col gap-1">
          <Link to="/admin/dashboard">
            <button className={buttonStyling("dashboard")}>
              <LayoutDashboard size={18} />
              <p className="hidden md:block">Dashboard</p>
            </button>
          </Link>

          <Link to="/admin/users">
            <button className={buttonStyling("users")}>
              <Users size={18} />
              <p className="hidden md:block">Users</p>
            </button>
          </Link>

          <Link to="/admin/inventory">
            <button className={buttonStyling("inventory")}>
              <Package size={18} />
              <p className="hidden md:block">Inventory</p>
            </button>
          </Link>

          <Link to="/admin/orders">
            <button className={buttonStyling("orders")}>
              <ShoppingCart size={18} />
              <p className="hidden md:block">Orders</p>
            </button>
          </Link>

          <Link to="/admin/reports">
            <button className={buttonStyling("reports")}>
              <BarChart2 size={18} />
              <p className="hidden md:block">Reports</p>
            </button>
          </Link>
        </nav>

        <div className="px-1 md:px-3 pb-6">
          <button className={buttonStyling("")} onClick={logout}>
            <LogOut size={18} />
            <p className="hidden md:block">Logout</p>
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
