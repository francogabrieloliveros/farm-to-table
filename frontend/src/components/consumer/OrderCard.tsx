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
    bg: "bg-muted",
    text: "text-muted-foreground",
  },
  1: {
    label: "Completed",
    icon: <CheckCircle size={14} />,
    bg: "bg-primary/10",
    text: "text-primary",
  },
  2: {
    label: "Canceled",
    icon: <XCircle size={14} />,
    bg: "bg-destructive/10",
    text: "text-destructive",
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
  


  return (
    <div className="bg-card rounded-3xl shadow-sm border border-border/50 overflow-hidden transition-all hover:shadow-md">
      <div className="p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Summary Info */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
              <Package size={20} className="text-primary" />
            </div>
            <div>
              <p className="manrope font-extrabold text-foreground text-sm uppercase tracking-wider">
                Order #{order._id.slice(-8)}
              </p>
              <p className="inter text-xs font-medium text-muted-foreground mt-0.5">
                {formatDate(order.dateOrdered)} • {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
              </p>
            </div>
          </div>

          {/* Price and Status */}
          <div className="flex items-center gap-4 justify-between sm:justify-end">
            <div className="text-right">
              <p className="manrope font-black text-foreground text-lg">
                {formatCurrency(order.totalAmount)}
              </p>
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-xs font-bold text-muted-foreground flex items-center gap-1 hover:text-primary transition-colors justify-end ml-auto mt-0.5"
              >
                {isExpanded ? "Hide Details" : "View Details"}
                {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide ${status.bg} ${status.text}`}
              >
                {status.icon}
                {status.label}
              </span>
              
              {order.status === OrderStatus.Pending && (
                <button
                  onClick={() => onCancel(order._id)}
                  disabled={isCanceling}
                  className="bg-destructive/10 text-destructive text-xs px-4 py-1.5 rounded-full manrope font-bold hover:bg-destructive hover:text-destructive-foreground transition-all disabled:opacity-50"
                >
                  {isCanceling ? "..." : "Cancel"}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="mt-6 pt-6 border-t border-border/50 space-y-4 animate-in fade-in slide-in-from-top-1">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between gap-4 p-3 bg-muted/30 rounded-2xl border border-border/30">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl overflow-hidden shadow-sm shrink-0">
                    <img src={item.productId.imageUrl} alt={item.productId.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="manrope font-bold text-foreground text-sm">{item.productId.name}</p>
                    <p className="inter text-xs font-medium text-muted-foreground mt-0.5">
                      Qty: {item.quantity} &times; {formatCurrency(item.priceAtPurchase)}
                    </p>
                  </div>
                </div>
                <p className="manrope font-bold text-primary text-sm bg-primary/10 px-3 py-1.5 rounded-lg">
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
