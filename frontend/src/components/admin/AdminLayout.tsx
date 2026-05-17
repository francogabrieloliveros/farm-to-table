import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  BarChart2,
  LogOut,
  ChevronLeft,
  ChevronRight,
  User as UserIcon,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, type ReactElement } from "react";
import useAuth from "@/hooks/useAuth";

export default function AdminLayout({ children }: { children: ReactElement }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const page = pathname.split("/")[2] ?? "dashboard";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/admin/dashboard",
    },
    {
      id: "users",
      label: "Citizens",
      icon: <Users size={20} />,
      path: "/admin/users",
    },
    {
      id: "inventory",
      label: "Inventory",
      icon: <Package size={20} />,
      path: "/admin/inventory",
    },
    {
      id: "orders",
      label: "Orders",
      icon: <ShoppingCart size={20} />,
      path: "/admin/orders",
    },
    {
      id: "reports",
      label: "Analytics",
      icon: <BarChart2 size={20} />,
      path: "/admin/reports",
    },
  ];

  return (
    <div className="flex h-screen w-screen bg-[#FDFDFB] font-sans inter text-[#42493E]">
      {/* Sidebar */}
      <aside
        className={`${isCollapsed ? "w-20" : "w-64"} transition-all duration-300 ease-in-out shrink-0 flex flex-col bg-white border-r border-[#E8E7E4] shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-20 relative`}
      >
        {/* Logo Section */}
        <div className="h-20 flex items-center px-6 border-b border-[#F4F3F1]">
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-xl font-black text-[#1C4419] tracking-tight manrope">
                Farm-to-Table
              </span>
              <span className="text-[10px] font-bold text-[#7E2700] uppercase tracking-widest -mt-1">
                Farm-to-Table Admin
              </span>
            </div>
          )}
          {isCollapsed && (
            <div className="w-8 h-8 bg-[#1C4419] rounded-lg flex items-center justify-center text-white font-black text-xs">
              FTT
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 flex flex-col gap-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = page === item.id;
            return (
              <Link key={item.id} to={item.path}>
                <button
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group
                    ${
                      isActive
                        ? "bg-[#1C4419] text-white shadow-lg shadow-[#1C4419]/20"
                        : "text-[#6B7280] hover:bg-[#F4F3F1] hover:text-[#1C4419]"
                    }`}
                >
                  <span
                    className={`${isActive ? "text-white" : "text-[#6B7280] group-hover:text-[#1C4419]"}`}
                  >
                    {item.icon}
                  </span>
                  {!isCollapsed && <span>{item.label}</span>}
                  {isActive && !isCollapsed && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white/40" />
                  )}
                </button>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-[#F4F3F1] bg-[#FCFBF9]">
          {/* User Profile */}
          {!isCollapsed && (
            <div className="flex items-center gap-3 px-2 py-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-[#E8F5E2] border-2 border-white shadow-sm flex items-center justify-center text-[#1C4419]">
                <UserIcon size={20} />
              </div>
              <div className="flex flex-col truncate">
                <span className="text-sm font-bold text-[#1C4419] truncate">
                  {user?.firstName} {user?.lastName}
                </span>
                <span className="text-[10px] text-[#6B7280] truncate">
                  {user?.email}
                </span>
              </div>
            </div>
          )}

          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-bold text-[#7E2700] hover:bg-[#FFF5F1] transition-all duration-200 group`}
          >
            <LogOut size={20} />
            {!isCollapsed && <span>Sign Out</span>}
          </button>
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-24 w-6 h-6 bg-white border border-[#E8E7E4] rounded-full flex items-center justify-center text-[#6B7280] hover:text-[#1C4419] shadow-sm z-30"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-[#FDFDFB]">
        <div className="max-w-[1600px] mx-auto min-h-full">{children}</div>
      </main>
    </div>
  );
}
