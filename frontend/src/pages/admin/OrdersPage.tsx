import { type fixedOrder, type Order } from "@/types/Order";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { orderService } from "@/services/order.service";
import { searchOrders } from "@/utils/searchOrders";
import OrderModal from "@/components/admin/OrderModal";
import toast from "react-hot-toast";

type OrderWithProduct = Order & { productName: string; productPrice: number };

const statusStyles: Record<string, string> = {
  Pending: "bg-[#e8f5e2] text-[#1C4419]",
  Completed: "bg-gray-100 text-gray-500",
  Cancelled: "bg-red-100 text-red-500",
};

function OrdersPage() {
  const [orders, setOrders] = useState<OrderWithProduct[]>([]);
  const [search, setSearch] = useState("");
  const [modalItem, setModalItem] = useState<fixedOrder | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [dummy, setDummy] = useState(false);

  useEffect(() => {
    orderService
      .getOrders()
      .then((data) => setOrders(searchOrders(search, data)));
  }, [dummy, search]);

  const orderItems = orders.map((order, idx) => {
    const statusNum = {
      0: "Pending",
      1: "Completed",
      2: "Cancelled",
    };
    const orderStatus = statusNum[order.status];

    return (
      <div
        className="w-full text-sm grid-cols-[1fr_1fr_2fr_1fr_1fr_1fr] flex flex-col md:grid bg-white p-5 items-start gap-2"
        style={{
          opacity:
            orderStatus === "Completed" || orderStatus === "Cancelled"
              ? 0.5
              : 1,
        }}
        key={idx}
      >
        <p className="font-semibold text-[#1C4419] max-md:mb-3 truncate">
          {order._id}
        </p>
        <p className="font-semibold truncate">{order.userEmail}</p>
        <p className="font-light text-[#1C4419] line-clamp-3 md:line-clamp-2">
          {order.productName}
        </p>
        <p className="font-semibold">
          &#8369;{(order.productPrice * order.quantity).toFixed(2)}
        </p>
        <div className="flex place-items-center">
          <p
            className={`font-light text-xs py px-2 rounded-sm ${statusStyles[orderStatus]}`}
          >
            {orderStatus}
          </p>
        </div>
        {orderStatus === "Pending" ? (
          <div className="flex flex-col">
            <button
              className="text-[#1C4419] text-left max-md:mt-5"
              onClick={async () => {
                try {
                  await orderService.confirmOrder(order._id);
                  toast.success("Order confirmed.");
                } catch (err: any) {
                  toast.error(
                    err?.response?.data?.message ?? "Something went wrong.",
                  );
                }
                setDummy((prev) => !prev);
              }}
            >
              Confirm
            </button>
            <button
              className="text-[#8C2A00] text-left max-md:mt-5"
              onClick={async () => {
                try {
                  await orderService.cancelOrder(order._id);
                  toast.success("Order cancelled.");
                } catch (err: any) {
                  toast.error(
                    err?.response?.data?.message ?? "Something went wrong.",
                  );
                }
                setDummy((prev) => !prev);
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            className="text-[#1C4419] text-left max-md:mt-5"
            onClick={() => {
              setModalItem(order);
              setShowModal(true);
            }}
          >
            View Details
          </button>
        )}
      </div>
    );
  });

  return (
    <>
      {showModal && modalItem ? (
        <OrderModal onClose={() => setShowModal(false)} order={modalItem} />
      ) : undefined}
      <div className="md:px-10 py-10 inter text-[#42493E]">
        <div className="flex items-center justify-between mb-8 max-md:px-2 flex-wrap gap-5">
          <h1 className="text-3xl font-extrabold text-[#1C4419] manrope">
            Orders
          </h1>
          <div className="relative w-60">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#42493E]"
            />
            <input
              type="text"
              placeholder="Search orders..."
              className="w-full pl-9 pr-4 py-2 text-sm border border-[#42493E] rounded-sm bg-white text-[#42493E] placeholder-gray-400 outline-none"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="w-full text-xs grid-cols-[1fr_1fr_2fr_1fr_1fr_1fr] hidden md:grid my-2 font-light px-5 gap-2">
            <p>ORDER ID</p>
            <p>CUSTOMER</p>
            <p>ITEM SNAPSHOT</p>
            <p>TOTAL</p>
            <p>STATUS</p>
            <p>ACTION</p>
          </div>
          {orderItems}
        </div>
      </div>
    </>
  );
}

export default OrdersPage;
