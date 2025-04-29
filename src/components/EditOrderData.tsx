import { getOrderById } from "@/services/OrderApi";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useLocation } from "react-router-dom";
import EditOrderModal from "./EditOrderModal";
import { useOrderStore } from "@/store/orderStore";
import { useEffect, useState } from "react";

export default function EditOrderData() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const OrderId = +queryParams.get("editOrder")!;

  const setCurrentOrder = useOrderStore((state) => state.setCurrentOrder);

  const [load, setLoad] = useState(false);

  const { data, isError, error } = useQuery({
    queryKey: ["order", OrderId],
    queryFn: () => getOrderById(OrderId),
    enabled: !!OrderId,
  });

  useEffect(() => {
    if (data) {
      setCurrentOrder(data);
      setLoad(true);
    }
  }, [data]);

  if (isError) {
    console.log(error);
    return <Navigate to="/404" />;
  }

  if (!data) return;
  return load && <EditOrderModal orderId={OrderId} />;
}
