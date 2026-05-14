import { CheckCircle, Clock, Package, XCircle } from "lucide-react";
import { type Order, type OrderStatus } from "@/types/Order";

type OrderCardProps = {
  order: Order;
  onCancel: (id: string) => void;
  isCanceling: boolean;
};

const statusValues: Record<
  OrderStatus,
  {
    label: string;
    icon: React.ReactNode;
    bg: string;
    text: string;
  }
> = {
  0: {
    label: "Pending",
    icon: <Clock size={14} />,
    bg: "bg-gray-100",
    text: "text-gray-600",
  },
  1: {
    label: "Completed",
    icon: <CheckCircle size={14} />,
    bg: "bg-green-100",
    text: "text-[#1C4419]",
  },
  2: {
    label: "Canceled",
    icon: <XCircle size={14} />,
    bg: "bg-red-100",
    text: "text-[#7E2700]",
  },
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const OrderCard = ({ order, onCancel, isCanceling }: OrderCardProps) => {
  const status = statusValues[order.status];

  return (
    <div className="bg-white sm:rounded-sm p-4 sm:p-5">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div className="flex flex-col sm:flex-row sm:gap-8 gap-1">
          <div>
            <p className="inter text-xs text-[#42493E] uppercase tracking-wide">
              Order ID
            </p>
            <p className="manrope font-bold text-[#1C4419] text-sm">
              #{order._id}
            </p>
          </div>

          <div>
            <p className="inter text-xs text-[#42493E] uppercase tracking-wide">
              Date
            </p>
            <p className="inter text-sm text-[#42493E]">
              {formatDate(order.dateOrdered)}
            </p>
          </div>

          <div>
            <p className="inter text-xs text-[#42493E] uppercase tracking-wide">
              Total
            </p>
            <p className="manrope font-bold text-[#1C4419] text-sm">
              Not available
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap justify-end">
          <span
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${status.bg} ${status.text}`}
          >
            {status.icon}
            {status.label}
          </span>

          {order.status === 0 && (
            <button
              onClick={() => onCancel(order._id)}
              disabled={isCanceling}
              className="bg-[#7E2700] text-white text-xs px-3 py-1 rounded-sm manrope font-semibold hover:bg-[#9b3300] transition-colors disabled:opacity-70"
            >
              {isCanceling ? "Canceling..." : "Cancel Order"}
            </button>
          )}
        </div>
      </div>

      <div className="border-t border-[#E2E1DF] mt-4 pt-3">
        <div className="flex items-center gap-2 text-gray-500">
          <Package size={14} />
          <p className="inter text-sm">Product ID: {order.productId}</p>
          <span className="inter text-xs text-gray-400">
            x{order.quantity}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
