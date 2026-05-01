import { Search, SlidersHorizontal } from "lucide-react";

const DUMMY_ORDERS = [
  {
    orderId: "#VH-4088",
    customer: "Sarah Williams",
    items: "Organic Microgreens, Cold-Pre...",
    total: "$55.20",
    status: "Pending",
  },
  {
    orderId: "#VH-4088",
    customer: "Sarah Williams",
    items: "Organic Microgreens, Cold-Pre...",
    total: "$55.20",
    status: "Pending",
  },
  {
    orderId: "#VH-4088",
    customer: "Sarah Williams",
    items: "Organic Microgreens, Cold-Pre...",
    total: "$55.20",
    status: "Pending",
  },
  {
    orderId: "#VH-4088",
    customer: "Sarah Williams",
    items: "Organic Microgreens, Cold-Pre...",
    total: "$55.20",
    status: "Completed",
  },
  {
    orderId: "#VH-4088",
    customer: "Sarah Williams",
    items: "Organic Microgreens, Cold-Pre...",
    total: "$55.20",
    status: "Completed",
  },
  {
    orderId: "#VH-4092",
    customer: "Elena Rostova",
    items: "Organic Heirloom Tomatoes (2l...",
    total: "$142.50",
    status: "Cancelled",
  },
];

const statusStyles: Record<string, string> = {
  Pending: "bg-[#e8f5e2] text-[#1C4419]",
  Completed: "bg-gray-100 text-gray-500",
  Cancelled: "bg-red-100 text-red-500",
};

export default function OrdersPage() {
  return (
    <div className="p-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">
            Queue
          </p>
          <h1 className="text-3xl font-bold text-gray-800">Orders</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-60">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search orders..."
              className="w-full pl-9 pr-4 py-2 text-sm border border-[#E2E1DF] rounded-lg bg-white text-gray-700 placeholder-gray-400 outline-none"
            />
          </div>
          <button className="border border-[#E2E1DF] bg-white p-2 rounded-lg text-gray-400">
            <SlidersHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-wider text-gray-400 border-b border-[#E2E1DF]">
              <th className="text-left px-6 py-3">Order ID</th>
              <th className="text-left px-6 py-3">Customer</th>
              <th className="text-left px-6 py-3">Items Snapshot</th>
              <th className="text-left px-6 py-3">Total</th>
              <th className="text-left px-6 py-3">Status</th>
              <th className="text-left px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {DUMMY_ORDERS.map((order, idx) => (
              <tr
                key={idx}
                className={`border-b border-[#E2E1DF] last:border-0 ${
                  order.status !== "Pending" ? "opacity-60" : ""
                }`}
              >
                <td className="px-6 py-4 font-medium text-gray-700">
                  {order.orderId}
                </td>
                <td className="px-6 py-4 text-gray-700 font-medium">
                  {order.customer}
                </td>
                <td className="px-6 py-4 text-gray-400">{order.items}</td>
                <td className="px-6 py-4 text-gray-700">{order.total}</td>
                <td className="px-6 py-4">
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${statusStyles[order.status]}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {order.status === "Pending" ? (
                    <button className="text-sm font-medium text-gray-700 border border-[#E2E1DF] px-3 py-1 rounded-lg">
                      Confirm
                    </button>
                  ) : (
                    <button className="text-sm font-medium text-gray-500">
                      View Details
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
