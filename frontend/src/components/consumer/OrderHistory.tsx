import { useState, useEffect } from "react";
import { orderService } from "@/services/order.service";
import { type Order } from "@/types/Order";
import OrderCard from "./OrderCard";

const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const handleCancel = (transactionId: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.transactionId === transactionId ? { ...o, orderStatus: 2 } : o,
      ),
    );
  };

  const ordersDisplay = orders.map((order, ind) => (
    <OrderCard key={ind} order={order} onCancel={handleCancel} />
  ));

  useEffect(() => {
    orderService
      .getOrders({ orderStatus: null, email: null })
      .then((data) => setOrders(data));
  }, []);

  return (
    <div className="w-full">
      <div className="mb-6 max-sm:px-5">
        <h2 className="manrope font-bold text-2xl text-[#1C4419]">My Orders</h2>
        <p className="inter text-sm text-[#42493E] mt-1">
          Review your recent purchases from our curated farms.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16 text-[#42493E] inter text-sm">
          No orders yet.
        </div>
      ) : (
        <div className="flex flex-col gap-4">{ordersDisplay}</div>
      )}
    </div>
  );
};

export default OrderHistory;
