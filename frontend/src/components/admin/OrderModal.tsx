import { X, User, Calendar, Clock, ShoppingCart, CheckCircle2, AlertCircle, XCircle } from "lucide-react";
import { type Order } from "@/types/Order";

export default function OrderModal({
  onClose,
  order,
}: {
  onClose: () => void;
  order: Order;
}) {
  const [date, fullTime] = order.dateOrdered.split("T");
  const time = fullTime.split(".")[0];

  const labelClass = "text-[10px] font-black uppercase tracking-widest text-[#9CA3AF] mb-1.5 flex items-center gap-1.5";
  const displayClass = "w-full bg-[#F9FAFB] border border-[#E8E7E4] rounded-xl px-4 py-3 text-sm text-[#1C4419] font-bold";

  const statusInfo = {
    0: { label: "Pending", icon: <AlertCircle size={14} />, color: "text-amber-600 bg-amber-50 border-amber-100" },
    1: { label: "Completed", icon: <CheckCircle2 size={14} />, color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
    2: { label: "Cancelled", icon: <XCircle size={14} />, color: "text-rose-600 bg-rose-50 border-rose-100" },
  }[order.status as 0 | 1 | 2];

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(value);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1C4419]/20 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-[#E8E7E4] overflow-hidden animate-in fade-in zoom-in duration-300 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-10 py-8 border-b border-[#F4F3F1] flex items-center justify-between bg-[#FCFBF9]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#7E2700] flex items-center justify-center text-white shadow-lg shadow-[#7E2700]/20">
              <ShoppingCart size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-[#1C4419] tracking-tight manrope">
                Order Review
              </h2>
              <p className="text-xs text-[#6B7280] font-medium flex items-center gap-1">
                Ref ID: <span className="font-bold text-[#1C4419]">{order._id.toUpperCase()}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-3 rounded-2xl text-[#9CA3AF] hover:bg-[#F4F3F1] hover:text-[#1C4419] transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-10 py-8 space-y-10 scrollbar-hide">
          
          {/* Status Banner */}
          <div className={`p-4 rounded-2xl border flex items-center justify-between ${statusInfo?.color}`}>
            <div className="flex items-center gap-2">
              {statusInfo?.icon}
              <span className="text-sm font-black uppercase tracking-wider">Current Status: {statusInfo?.label}</span>
            </div>
            <span className="text-[10px] font-bold opacity-60 italic">Managed via marketplace portal</span>
          </div>

          {/* Customer Details */}
          <section className="space-y-6">
            <h3 className="text-xs font-black text-[#1C4419] uppercase tracking-[0.2em] border-b border-[#F4F3F1] pb-2">Customer & Logistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label className={labelClass}><User size={12} /> Account Name</label>
                  <div className={displayClass}>{order.userId.firstName} {order.userId.lastName}</div>
                </div>
                <div>
                  <label className={labelClass}>Email Address</label>
                  <div className={displayClass}>{order.userId.email}</div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className={labelClass}><Calendar size={12} /> Order Date</label>
                  <div className={displayClass}>{date}</div>
                </div>
                <div>
                  <label className={labelClass}><Clock size={12} /> Timestamp</label>
                  <div className={displayClass}>{time}</div>
                </div>
              </div>
            </div>
          </section>

          {/* Product Items */}
          <section className="space-y-6">
            <h3 className="text-xs font-black text-[#1C4419] uppercase tracking-[0.2em] border-b border-[#F4F3F1] pb-2">Order Summary</h3>
            <div className="space-y-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-[#F9FAFB] border border-[#E8E7E4] rounded-2xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-[#E8E7E4]">
                      <img src={item.productId.imageUrl} alt={item.productId.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#1C4419]">{item.productId.name}</p>
                      <p className="text-[10px] text-[#6B7280] font-medium">
                        {formatCurrency(item.priceAtPurchase)} &times; {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-black text-[#1C4419]">
                    {formatCurrency(item.priceAtPurchase * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Financial Summary */}
          <section className="p-8 bg-[#E8F5E2]/50 rounded-[2rem] border border-[#E8F5E2]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-[#1C4419] uppercase tracking-[0.2em] mb-1">Total Transaction Value</p>
                <h4 className="text-4xl font-black text-[#1C4419] manrope tracking-tighter">
                  {formatCurrency(order.totalAmount)}
                </h4>
              </div>
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-[#1C4419] shadow-sm border border-[#E8F5E2]">
                <CheckCircle2 size={32} />
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="px-10 py-6 bg-[#FCFBF9] border-t border-[#F4F3F1] flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-10 py-3.5 rounded-2xl text-sm font-black text-white bg-[#1C4419] hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-[#1C4419]/20 transition-all"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
