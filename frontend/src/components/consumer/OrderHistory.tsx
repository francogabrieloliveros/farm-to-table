import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { orderService } from "@/services/order.service";
import OrderCard from "./OrderCard";

const OrderHistory = () => {
  const queryClient = useQueryClient();

  // fetch orders for the logged-in customer
  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["my-orders"],
    queryFn: orderService.getMyOrders,
  });

  // cancel a pending order and refresh the order list
  const cancelMutation = useMutation({
    mutationFn: orderService.cancelOrder,
    onSuccess: () => {
      toast.success("Order canceled successfully.");
      queryClient.invalidateQueries({ queryKey: ["my-orders"] });
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to cancel order.";
      toast.error(message);
    },
  });

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
          {orders.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
              onCancel={(id) => cancelMutation.mutate(id)}
              isCanceling={cancelMutation.isPending}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;