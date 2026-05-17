import { Users, ClipboardList, DollarSign, Package, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useEffect, useState } from "react";
import api from "@/lib/api";

type RecentOrder = {
  _id: string;
  status: number;
  quantity: number;
  dateOrdered: string;
  productName: string;
  productPrice: number;
  totalAmount: number;
  customerName: string;
  customerEmail: string;
};

type DashboardStats = {
  totalUsers: number;
  totalPendingOrders: number;
  totalProducts: number;
  totalRevenue: number;
  recentOrders: RecentOrder[];
};

const statusStyles: Record<string, string> = {
  Pending: "bg-amber-50 text-amber-700 border-amber-100",
  Completed: "bg-emerald-50 text-emerald-700 border-emerald-100",
  Cancelled: "bg-rose-50 text-rose-700 border-rose-100",
};

const statusMap: Record<number, string> = {
  0: "Pending",
  1: "Completed",
  2: "Cancelled",
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(value);

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        const { data } = await api.get("/api/dashboard/stats");
        if (data.success) {
          setStats(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6 md:p-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#1C4419] tracking-tight manrope">System Overview</h1>
          <p className="text-sm text-[#6B7280] font-medium">Real-time metrics from across the platform.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E8E7E4] rounded-xl shadow-sm text-xs font-bold text-[#1C4419] uppercase tracking-wider">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Live System Status
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          label="Total Citizens"
          value={isLoading ? "..." : (stats?.totalUsers ?? 0).toLocaleString()}
          icon={<Users size={22} />}
          color="emerald"
          trend="+12%"
          isPositive={true}
        />
        <StatCard
          label="Pending Orders"
          value={isLoading ? "..." : (stats?.totalPendingOrders ?? 0).toLocaleString()}
          icon={<ClipboardList size={22} />}
          color="amber"
          trend="+4%"
          isPositive={true}
        />
        <StatCard
          label="Total Revenue"
          value={isLoading ? "..." : formatCurrency(stats?.totalRevenue ?? 0)}
          icon={<DollarSign size={22} />}
          color="blue"
          trend="+22%"
          isPositive={true}
        />
        <StatCard
          label="Product Catalog"
          value={isLoading ? "..." : (stats?.totalProducts ?? 0).toLocaleString()}
          icon={<Package size={22} />}
          color="rose"
          trend="-2%"
          isPositive={false}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity Table */}
        <div className="lg:col-span-2 bg-white border border-[#E8E7E4] rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
          <div className="px-8 py-6 border-b border-[#F4F3F1] flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#1C4419] manrope">Recent Transactions</h2>
            <button className="text-xs font-bold text-[#1C4419] hover:underline uppercase tracking-wider">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[10px] uppercase tracking-widest text-[#9CA3AF] font-black border-b border-[#F4F3F1] bg-[#FCFBF9]">
                  <th className="text-left px-8 py-4">ID</th>
                  <th className="text-left px-4 py-4">Customer</th>
                  <th className="text-left px-4 py-4">Status</th>
                  <th className="text-right px-8 py-4">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F4F3F1]">
                {isLoading ? (
                  Array(5).fill(0).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={4} className="px-8 py-4"><div className="h-4 bg-gray-100 rounded w-full"></div></td>
                    </tr>
                  ))
                ) : !stats?.recentOrders || stats.recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-8 py-10 text-center text-gray-400 font-medium">No recent transactions found.</td>
                  </tr>
                ) : (
                  stats.recentOrders.map((row) => {
                    const statusLabel = statusMap[row.status] ?? "Unknown";
                    return (
                      <tr key={row._id} className="hover:bg-[#FCFBF9] transition-colors group">
                        <td className="px-8 py-5 text-xs font-mono font-bold text-[#1C4419]">#{row._id.slice(-6).toUpperCase()}</td>
                        <td className="px-4 py-5">
                          <div className="flex flex-col">
                            <span className="font-bold text-[#42493E]">{row.customerName}</span>
                            <span className="text-[10px] text-gray-400 font-medium">{row.productName} × {row.quantity}</span>
                          </div>
                        </td>
                        <td className="px-4 py-5">
                          <span className={`text-[10px] px-2.5 py-1 rounded-lg font-black border uppercase tracking-wider ${statusStyles[statusLabel]}`}>
                            {statusLabel}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-right font-black text-[#1C4419]">{formatCurrency(row.totalAmount)}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Analytics Card (Mock Chart) */}
        <div className="bg-white border border-[#E8E7E4] rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-bold text-[#1C4419] manrope">Revenue Trend</h2>
            <TrendingUp size={20} className="text-[#1C4419]" />
          </div>
          
          <div className="flex-1 flex items-end justify-between gap-2 h-40 mb-6">
            {[40, 70, 45, 90, 65, 80, 55].map((height, i) => (
              <div key={i} className="flex flex-col items-center gap-2 group w-full">
                <div className="w-full bg-[#E8F5E2] rounded-t-lg transition-all duration-300 group-hover:bg-[#1C4419] relative" style={{ height: `${height}%` }}>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1C4419] text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {height}%
                  </div>
                </div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Day {i+1}</span>
              </div>
            ))}
          </div>

          <div className="p-4 bg-[#E8F5E2]/50 rounded-2xl border border-[#E8F5E2]">
            <p className="text-xs font-bold text-[#1C4419] leading-relaxed">
              Performance is up <span className="text-[#7E2700]">12.4%</span> this week compared to last month. Keep it up!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, color, trend, isPositive }: { label: string, value: string, icon: React.ReactNode, color: string, trend: string, isPositive: boolean }) {
  const colors: Record<string, string> = {
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    rose: "bg-rose-50 text-rose-600 border-rose-100",
  };

  return (
    <div className="bg-white border border-[#E8E7E4] rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 relative overflow-hidden group">
      <div className="flex justify-between items-start relative z-10">
        <div className={`p-3 rounded-2xl border ${colors[color]}`}>
          {icon}
        </div>
        <div className={`flex items-center gap-0.5 text-[10px] font-black px-2 py-1 rounded-lg ${isPositive ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
          {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {trend}
        </div>
      </div>
      <div className="mt-6 relative z-10">
        <p className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest mb-1">{label}</p>
        <p className="text-2xl font-black text-[#1C4419] tracking-tight manrope">{value}</p>
      </div>
      <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full opacity-[0.03] group-hover:scale-150 transition-transform duration-700 ${colors[color].split(" ")[0]}`} />
    </div>
  );
}
