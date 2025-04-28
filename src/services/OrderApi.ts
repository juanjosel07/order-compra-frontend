import { deleteMessage } from "@/helpers/Alerts";
import api from "@/lib/axios";
import { isAxiosError } from "axios";

type OrderReponseType = {
  message: string;
};

type Order = {
  id: number;
};

export async function deleteOrder(orderId: Order["id"]) {
  try {
    if (!(await deleteMessage())) return;
    const { data } = await api.delete<OrderReponseType>(`/orders/${orderId}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const responseError =
        error.response.data.errors || error.response.data.error;
      throw responseError;
    }
  }
}
