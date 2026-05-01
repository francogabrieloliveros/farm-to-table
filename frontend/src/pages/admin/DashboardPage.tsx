import { Users, ClipboardList, DollarSign } from "lucide-react";

const recentActivity = [
  {
    orderId: "#ORD-0092",
    customer: "Jane Doe",
    status: "Pending",
    amount: "$145.00",
  },
  {
    orderId: "#ORD-0091",
    customer: "Michael Smith",
    status: "Pending",
    amount: "$89.50",
  },
  {
    orderId: "#ORD-0090",
    customer: "Alice Johnson",
    status: "Completed",
    amount: "$210.25",
  },
  {
    orderId: "#ORD-0089",
    customer: "Bob Williams",
    status: "Cancelled",
    amount: "$45.00",
  },
];

const statusStyles: Record<string, string> = {
  Pending: "bg-[#e8f5e2] text-[#1C4419]",
  Completed: "bg-gray-100 text-gray-500",
  Cancelled: "bg-red-100 text-red-500",
};

export default function DashboardPage() {
  return (
    <div className="p-10">
      <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">
        Overview
      </p>
      <h1 className="text-4xl font-bold text-[#1C4419] mb-8">Dashboard</h1>

      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        <StatCard
          label="Total Registered Users"
          value="12,480"
          icon={<Users size={22} className="text-[#1C4419]" />}
          iconBg="bg-[#e8f5e2]"
        />
        <StatCard
          label="Total Pending Orders"
          value="342"
          icon={<ClipboardList size={22} className="text-[#7E2700]" />}
          iconBg="bg-orange-50"
        />
        <StatCard
          label="Sales Total (YTD)"
          value="$845k"
          icon={<DollarSign size={22} className="text-gray-500" />}
          iconBg="bg-gray-100"
        />
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Activity
        </h2>
        <div className="bg-white rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wider text-gray-400 border-b border-[#E2E1DF]">
                <th className="text-left px-6 py-3">Order ID</th>
                <th className="text-left px-6 py-3">Customer</th>
                <th className="text-left px-6 py-3">Status</th>
                <th className="text-right px-6 py-3">Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.map((row) => (
                <tr
                  key={row.orderId}
                  className="border-b border-[#E2E1DF] last:border-0"
                >
                  <td className="px-6 py-4 text-gray-700">{row.orderId}</td>
                  <td className="px-6 py-4 text-gray-700">{row.customer}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${statusStyles[row.status]}`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-gray-700">
                    {row.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  iconBg,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  iconBg: string;
}) {
  return (
    <div className="bg-white rounded-xl p-6 flex items-center justify-between">
      <div>
        <p className="text-xs uppercase tracking-wider text-gray-400 mb-2">
          {label}
        </p>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
      </div>
      <div className={`${iconBg} p-3 rounded-xl`}>{icon}</div>
    </div>
  );
}
