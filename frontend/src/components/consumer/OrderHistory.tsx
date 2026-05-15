import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { orderService } from "@/services/order.service";
import { type Order, type OrdersResponse } from "@/types/Order";
import OrderCard from "./OrderCard";

const OrderHistory = () => {
  const [data, setData] = useState<OrdersResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isCanceling, setIsCanceling] = useState(false);

  const fetchOrders = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await orderService.getMyOrders();
      setData(result);
      setIsError(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleCancelOrder = async (id: string) => {
    try {
      setIsCanceling(true);
      await orderService.cancelOrder(id);
      toast.success("Order canceled successfully.");
      await fetchOrders();
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Failed to cancel order.";
      toast.error(message);
    } finally {
      setIsCanceling(false);
    }
  };

  const orders = data?.data ?? [];

  return (
    <div className="w-full">
      <div className="mb-6 max-sm:px-5">
        <h2 className="manrope font-bold text-2xl text-[#1C4419]">My Orders</h2>
        <p className="inter text-sm text-[#42493E] mt-1">
          Review your recent purchases from our curated farms.
        </p>
      </div>

      {isLoading && (
        <div className="text-center py-16 text-[#42493E] inter text-sm">
          Loading orders...
        </div>
      )}

      {isError && (
        <div className="text-center py-16 text-[#7E2700] inter text-sm">
          Failed to load your orders.
        </div>
      )}

      {!isLoading && !isError && orders.length === 0 ? (
        <div className="text-center py-16 text-[#42493E] inter text-sm">
          No orders yet.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order: Order) => (
            <OrderCard
              key={order._id}
              order={order}
              onCancel={handleCancelOrder}
              isCanceling={isCanceling}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;