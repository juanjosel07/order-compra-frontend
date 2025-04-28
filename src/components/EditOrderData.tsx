import { getOrderById } from "@/services/OrderApi";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useLocation } from "react-router-dom";
import EditOrderModal from "./EditOrderModal";
import { useOrderStore } from "@/store/orderStore";

export default function EditOrderData() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const OrderId = +queryParams.get("editOrder")!;

  const setCurrentOrder = useOrderStore((state) => state.setCurrentOrder);

  const { data, isError } = useQuery({
    queryKey: ["order", OrderId],
    queryFn: () => getOrderById(OrderId),
    enabled: !!OrderId,
  });

  if (isError) {
    return <Navigate to="/404" />;
  }

  if (!data) return;

  setCurrentOrder(data);
  return <EditOrderModal orderId={OrderId} />;
}
