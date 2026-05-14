import { X } from "lucide-react";
import { type fixedOrder } from "@/types/Order";

function OrderModal({
  onClose,
  order,
}: {
  onClose: () => void;
  order: fixedOrder;
}) {
  const labelClass =
    "block text-xs font-medium tracking-widest text-[#42493E] uppercase mb-1.5";
  const inputClass =
    "w-full bg-gray-100 rounded-sm px-3 py-2 text-sm text-[#42493E] placeholder:text-gray-500 focus:outline-none transition-all";

  const [date, fullTime] = order.dateOrdered.split("T");
  const time = fullTime.split(".")[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[2px]">
      <div className="relative max-md:h-dvh w-full md:max-w-lg md:mx-4 bg-white md:rounded-sm border border-[#E8E7E3] overflow-hidden inter">
        <div className="px-7 pt-7 pb-5 border-b border-[#EDECE8]">
          <div className="flex items-start justify-between">
            <h2 className="text-xl font-bold text-[#1C4419] manrope">
              ORDER DETAILS
            </h2>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#8A9186] hover:bg-[#EDECE8] hover:text-[#42493E] transition-colors -mt-0.5"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="overflow-y-scroll h-full md:max-h-[70vh] px-7 py-6 space-y-7 pb-40 md:pb-20">
          <section>
            <h3 className="font-bold text-[#1C4419] manrope mb-4">
              Order Information
            </h3>
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div>
                <label className={labelClass}>ORDER ID</label>
                <input
                  type="text"
                  className={inputClass}
                  value={order._id}
                  disabled
                />
              </div>
              <div>
                <label className={labelClass}>CUSTOMER EMAIL</label>
                <input
                  type="text"
                  className={inputClass}
                  value={order.userEmail}
                  disabled
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-5">
              <div>
                <label className={labelClass}>DATE</label>
                <input
                  type="text"
                  className={inputClass}
                  value={date}
                  disabled
                />
              </div>
              <div>
                <label className={labelClass}>TIME</label>
                <input
                  type="text"
                  className={inputClass}
                  value={time}
                  disabled
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-5">
              <div>
                <label className={labelClass}>QUANTITY</label>
                <input
                  type="number"
                  className={`${inputClass} pl-7`}
                  value={order.quantity}
                  disabled
                />
              </div>
              <div>
                <label className={labelClass}>PRICE</label>
                <input
                  type="number"
                  className={`${inputClass} pl-7`}
                  value={order.productPrice}
                  disabled
                />
              </div>
            </div>
          </section>

          <section>
            <h3 className="font-bold text-[#1C4419] manrope mb-4">
              Product Information
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>PRODUCT ID</label>
                <div className="relative">
                  <input
                    type="text"
                    className={inputClass}
                    value={order.productId}
                    disabled
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>PRODUCT NAME</label>
                <input
                  type="text"
                  className={inputClass}
                  value={order.productName}
                  disabled
                />
              </div>
            </div>
          </section>

          <section>
            <h3 className="font-bold text-[#1C4419] manrope mb-1">
              Order Status
            </h3>
            <div className="flex flex-wrap justify-between gap-2">
              <button
                className={`${order.status === 0 ? "bg-[#8C2A00] text-white" : "border"} rounded-sm flex-1`}
              >
                Pending
              </button>
              <button
                className={`${order.status === 2 ? "bg-[#8C2A00] text-white" : "border"} rounded-sm flex-1`}
              >
                Cancelled
              </button>
              <button
                className={`${order.status === 1 ? "bg-[#8C2A00] text-white" : "border"} rounded-sm flex-1`}
              >
                Completed
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default OrderModal;
