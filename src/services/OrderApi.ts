import { deleteMessage } from "@/helpers/Alerts";
import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { OrderFormSendDataT, OrderSchema } from "../types";

type OrderReponseType = {
  message: string;
};

type Order = {
  id: number;
};

export async function getOrderById(OrderId: Order["id"]) {
  try {
    const {
      data: { order: data },
    } = await api(`/orders/${OrderId}`);

    const response = OrderSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const responseError =
        error.response.data.errors || error.response.data.error;
      throw responseError;
    }
  }
}

export async function createOrder(formData: OrderFormSendDataT) {
  try {
    const { data } = await api.post<OrderReponseType>("/orders", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const responseError =
        error.response.data.errors || error.response.data.error;
      throw responseError;
    }
  }
}

export async function updateOrder({
  formData,
  orderId,
}: {
  formData: OrderFormSendDataT;
  orderId: Order["id"];
}) {
  try {
    const { data } = await api.put<OrderReponseType>(
      `/orders/${orderId}`,
      formData
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const responseError =
        error.response.data.errors || error.response.data.error;
      throw responseError;
    }
  }
  return;
}

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
