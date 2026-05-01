import { Package, CheckCircle, Clock, XCircle } from "lucide-react";
import { type Order } from "@/types/Order";

const OrderCard = ({
  order,
  onCancel,
}: {
  order: Order;
  onCancel: (id: string) => void;
}) => {
  const statusValues = {
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

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const status = statusValues[order.orderStatus];

  return (
    <div className="bg-white sm:rounded-sm p-4 sm:p-5">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div className="flex flex-col sm:flex-row sm:gap-8 gap-1">
          <div>
            <p className="inter text-xs text-[#42493E] uppercase tracking-wide">
              Order ID
            </p>
            <p className="manrope font-bold text-[#1C4419] text-sm">
              #{order.transactionId}
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
            <p className="manrope font-bold text-[#1C4419] text-sm">₱1000</p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap justify-end">
          <span
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${status.bg} ${status.text}`}
          >
            {status.icon}
            {status.label}
          </span>
          {order.orderStatus === 0 && (
            <button
              onClick={() => onCancel(order.transactionId)}
              className="bg-[#7E2700] text-white text-xs px-3 py-1 rounded-sm manrope font-semibold hover:bg-[#9b3300] transition-colors"
            >
              Cancel Order
            </button>
          )}
        </div>
      </div>

      <div className="border-t border-[#E2E1DF] mt-4 pt-3">
        <div className="flex items-center gap-2 text-gray-500">
          <Package size={14} />
          <p className="inter text-sm">{"Example product"}</p>
          <span className="inter text-xs text-gray-400">
            x{order.orderQuantity}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
