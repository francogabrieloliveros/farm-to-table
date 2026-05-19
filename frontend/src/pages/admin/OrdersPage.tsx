import { type Order } from "@/types/Order";
import { Search, ShoppingBag, Check, X, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { orderService } from "@/services/order.service";
import { searchOrders } from "@/utils/searchOrders";
import OrderModal from "@/components/admin/OrderModal";
import toast from "react-hot-toast";

const statusStyles: Record<string, string> = {
  Pending: "bg-amber-50 text-amber-700 border-amber-100",
  Completed: "bg-emerald-50 text-emerald-700 border-emerald-100",
  Cancelled: "bg-rose-50 text-rose-700 border-rose-100",
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(value);

function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [modalItem, setModalItem] = useState<Order | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [dummy, setDummy] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    orderService
      .getOrders()
      .then((data) => {
        setOrders(searchOrders(search, data));
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, [dummy, search]);

  const handleStatusUpdate = async (
    id: string,
    action: "confirm" | "cancel",
  ) => {
    const loadingToast = toast.loading(
      `${action === "confirm" ? "Confirming" : "Cancelling"} order...`,
    );
    try {
      if (action === "confirm") {
        await orderService.confirmOrder(id);
        toast.success("Order confirmed successfully", { id: loadingToast });
      } else {
        await orderService.cancelOrder(id);
        toast.success("Order cancelled successfully", { id: loadingToast });
      }
      setDummy((prev) => !prev);
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Something went wrong.", {
        id: loadingToast,
      });
    }
  };

  return (
    <>
      {showModal && modalItem && (
        <OrderModal onClose={() => setShowModal(false)} order={modalItem} />
      )}

      <div className="p-6 md:p-10 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-[#1C4419] tracking-tight manrope">
              Order Management
            </h1>
          </div>

          <div className="relative w-full max-w-xs group">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] group-focus-within:text-[#1C4419] transition-colors"
            />
            <input
              type="text"
              placeholder="Search by ID, Name or Email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 text-sm bg-white border border-[#E8E7E4] rounded-2xl outline-none focus:border-[#1C4419] focus:ring-4 focus:ring-[#1C4419]/5 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-[#E8E7E4] rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[10px] uppercase tracking-widest text-[#9CA3AF] font-black border-b border-[#F4F3F1] bg-[#FCFBF9]">
                  <th className="text-left px-8 py-5">Order ID</th>
                  <th className="text-left px-4 py-5">Customer</th>
                  <th className="text-left px-4 py-5">Items</th>
                  <th className="text-left px-4 py-5">Total</th>
                  <th className="text-left px-4 py-5">Status</th>
                  <th className="text-right px-8 py-5">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F4F3F1]">
                {isLoading ? (
                  Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <tr key={i} className="animate-pulse">
                        <td colSpan={6} className="px-8 py-5">
                          <div className="h-4 bg-gray-100 rounded w-full"></div>
                        </td>
                      </tr>
                    ))
                ) : orders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-8 py-12 text-center">
                      <div className="flex flex-col items-center gap-2 text-gray-400">
                        <ShoppingBag size={40} className="opacity-20" />
                        <p className="font-medium">No orders found.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => {
                    const statusMap = {
                      0: "Pending",
                      1: "Completed",
                      2: "Cancelled",
                    };
                    const orderStatus =
                      statusMap[order.status as keyof typeof statusMap];

                    const itemSummary =
                      order.items.length > 0
                        ? `${order.items[0].productId.name}${order.items.length > 1 ? ` + ${order.items.length - 1} more` : ""}`
                        : "No items";

                    return (
                      <tr
                        key={order._id}
                        className="hover:bg-[#FCFBF9] transition-colors group"
                      >
                        <td className="px-8 py-5 text-xs font-mono font-bold text-[#1C4419]">
                          #{order._id.slice(-8).toUpperCase()}
                        </td>
                        <td className="px-4 py-5">
                          <div className="flex flex-col">
                            <span className="font-bold text-[#1C4419]">
                              {order.userId
                                ? `${order.userId.firstName} ${order.userId.lastName}`
                                : "Unknown User"}
                            </span>
                            <span className="text-[10px] text-[#6B7280]">
                              {order.userId?.email || "No email available"}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-5">
                          <div className="flex flex-col">
                            <span className="font-medium text-[#42493E] line-clamp-1">
                              {itemSummary}
                            </span>
                            <span className="text-[10px] text-gray-400 font-medium">
                              {order.items.reduce(
                                (acc, item) => acc + item.quantity,
                                0,
                              )}{" "}
                              items total
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-5 font-black text-[#1C4419]">
                          {formatCurrency(order.totalAmount)}
                        </td>
                        <td className="px-4 py-5">
                          <span
                            className={`text-[10px] px-2.5 py-1 rounded-lg font-black border uppercase tracking-wider ${statusStyles[orderStatus]}`}
                          >
                            {orderStatus}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {order.status === 0 ? (
                              <>
                                <button
                                  onClick={() =>
                                    handleStatusUpdate(order._id, "confirm")
                                  }
                                  className="p-2 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-all"
                                  title="Confirm Order"
                                >
                                  <Check size={18} />
                                </button>
                                <button
                                  onClick={() =>
                                    handleStatusUpdate(order._id, "cancel")
                                  }
                                  className="p-2 rounded-lg text-rose-600 hover:bg-rose-50 transition-all"
                                  title="Cancel Order"
                                >
                                  <X size={18} />
                                </button>
                              </>
                            ) : null}
                            <button
                              onClick={() => {
                                setModalItem(order);
                                setShowModal(true);
                              }}
                              className="p-2 rounded-lg text-[#6B7280] hover:bg-[#F4F3F1] hover:text-[#1C4419] transition-all"
                              title="View Details"
                            >
                              <Eye size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrdersPage;
