import { CheckCircle, Clock, Package, XCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { type Order, OrderStatus } from "@/types/Order";

type OrderCardProps = {
  order: Order;
  onCancel: (id: string) => void;
  isCanceling: boolean;
};

const statusValues: Record<
  number,
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

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(value);

const OrderCard = ({ order, onCancel, isCanceling }: OrderCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const status = statusValues[order.status];
  
  const firstItem = order.items[0];
  const moreItemsCount = order.items.length - 1;

  return (
    <div className="bg-white sm:rounded-lg shadow-sm border border-[#E8E7E4] overflow-hidden transition-all">
      <div className="p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Summary Info */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#F9FAFB] border border-[#E8E7E4] flex items-center justify-center shrink-0">
              <Package size={20} className="text-[#1C4419]" />
            </div>
            <div>
              <p className="manrope font-black text-[#1C4419] text-sm">
                Order #{order._id.slice(-8).toUpperCase()}
              </p>
              <p className="inter text-[10px] font-bold text-[#6B7280]">
                {formatDate(order.dateOrdered)} • {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
              </p>
            </div>
          </div>

          {/* Price and Status */}
          <div className="flex items-center gap-4 justify-between sm:justify-end">
            <div className="text-right">
              <p className="manrope font-black text-[#1C4419] text-sm">
                {formatCurrency(order.totalAmount)}
              </p>
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-[10px] font-bold text-[#6B7280] flex items-center gap-1 hover:text-[#1C4419] transition-colors"
              >
                {isExpanded ? "Hide Details" : "View Details"}
                {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${status.bg} ${status.text}`}
              >
                {status.icon}
                {status.label}
              </span>
              
              {order.status === OrderStatus.Pending && (
                <button
                  onClick={() => onCancel(order._id)}
                  disabled={isCanceling}
                  className="bg-[#7E2700] text-white text-[10px] px-3 py-1.5 rounded-lg manrope font-black uppercase tracking-wider hover:bg-[#9b3300] transition-all disabled:opacity-70 shadow-sm"
                >
                  {isCanceling ? "..." : "Cancel"}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="mt-5 pt-5 border-t border-[#F4F3F1] space-y-4 animate-in fade-in slide-in-from-top-1">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden border border-[#E8E7E4] shrink-0">
                    <img src={item.productId.imageUrl} alt={item.productId.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="inter font-bold text-[#1C4419] text-xs">{item.productId.name}</p>
                    <p className="inter text-[10px] text-[#6B7280]">
                      {item.quantity} &times; {formatCurrency(item.priceAtPurchase)}
                    </p>
                  </div>
                </div>
                <p className="inter font-bold text-[#1C4419] text-xs">
                  {formatCurrency(item.quantity * item.priceAtPurchase)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
