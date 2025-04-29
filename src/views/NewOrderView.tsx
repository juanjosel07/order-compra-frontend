import OrderForm from "@/components/OrderForm";
import { useForm } from "react-hook-form";
import { OrderFormDataT } from "../types";
import { useMutation } from "@tanstack/react-query";
import { createOrder } from "@/services/OrderApi";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useOrderStore } from "@/store/orderStore";
import ErrorMessage from "@/components/ErrorMessage";
import { useEffect } from "react";

export default function CreateODCView() {
  const order = useOrderStore((state) => state.currentOrder);
  const setCurrentorder = useOrderStore((state) => state.setCurrentOrder);
  const total = useOrderStore((state) => state.total);
  const setTotal = useOrderStore((state) => state.setTotal);
  const reloadTable = useOrderStore((state) => state.reloadTable);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<OrderFormDataT>({
    defaultValues: {
      products: [],
      billingDate: "",
      paymentMethod: "",
      clientName: "",
    },
  });

  useEffect(() => {
    if (order) {
      setCurrentorder({
        id: 0,
        client_name: "",
        order_date: "",
        payment_method: "",
        discount: "",
        total: "",
        observations: "",
        order_items: [],
      });
    }
  }, []);

  const { mutate } = useMutation({
    mutationFn: createOrder,
    onSuccess: (data) => {
      if (data) toast.success(data.message);
      reset();
      const resetOrder = {
        id: 0,
        client_name: "",
        order_date: "",
        payment_method: "",
        discount: "0",
        total: "0",
        observations: "",
        order_items: [],
      };
      setCurrentorder(resetOrder);
      reloadTable();
    },

    onError: (error) => {
      if (typeof error === "object") {
        Object.values(error).forEach((errorMessages) => {
          errorMessages.forEach((message: string) => {
            toast.error(message);
          });
        });
      } else {
        toast.error(error);
      }
    },
  });
  const handleCreateOrder = (data: OrderFormDataT) => {
    if (order) {
      const { id, order_items, ...orderSend } = order;
      if (order.discount === "") orderSend.discount = "0.00";

      const orderItems = order_items.map((item) => {
        const { product_name, order_id, ...restOrderItem } = item;
        return restOrderItem;
      });

      const newOrder = {
        ...orderSend,
        orderItems: orderItems,
      };

      const dataSend = {
        ...newOrder,
        total: total,
        client_name: data.clientName!,
        order_date: data.billingDate,
        payment_method: data.paymentMethod,
      };

      mutate(dataSend);
    }
  };

  return (
    <>
      <div className="bg-neutral-400/20 rounded-lg p-5 flex flex-col gap-9">
        <div className="flex gap-2 items-center">
          <nav className="self-end text-neutral-500 bg-white p-2 rounded-full">
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="icon icon-tabler icons-tabler-filled icon-tabler-circle-chevron-left"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M17 3.34a10 10 0 0 1 5 8.66c0 5.523 -4.477 10 -10 10s-10 -4.477 -10 -10a10 10 0 0 1 15 -8.66m-3.293 4.953a1 1 0 0 0 -1.414 0l-3 3a1 1 0 0 0 0 1.414l3 3a1 1 0 0 0 1.414 0l.083 -.094a1 1 0 0 0 -.083 -1.32l-2.292 -2.293l2.292 -2.293a1 1 0 0 0 0 -1.414" />
              </svg>
            </Link>
          </nav>
          <h2 className="text-2xl font-bold text-neutral-600">
            Crear Orden de Compra
          </h2>
        </div>
        <form
          className=" flex flex-col gap-5"
          onSubmit={handleSubmit(handleCreateOrder)}
          noValidate
        >
          <div>
            <label
              className="text-neutral-600 font-semibold"
              htmlFor="client_name"
            >
              Nombre del Cliente : {""}
            </label>
            <input
              type="text"
              id="client_name"
              className="col-span-1 text-center bg-white rounded-lg px-2 py-3 italic font-medium text-neutral-500/80 text-sm"
              {...register("clientName", {
                required: "El nombre del cliente es requerido",
              })}
            />
          </div>
          {errors.clientName && (
            <ErrorMessage>{errors.clientName.message}</ErrorMessage>
          )}
          <OrderForm register={register} errors={errors} setValue={setValue} />
          <input
            onClick={(e) => e.stopPropagation()}
            type="submit"
            value="Crear ODC"
            className="mx-auto rounded-lg  bg-transparent border border-green-500 hover:bg-lime-600 hover:text-white    p-3 text-neutral-500 font-bold cursor-pointer transition-colors"
          />{" "}
        </form>
      </div>
    </>
  );
}
