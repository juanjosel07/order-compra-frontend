import { OrderFormDataT, OrderT } from "../types";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import OrderForm from "./OrderForm";
import { set, useForm } from "react-hook-form";
import { useOrderStore } from "@/store/orderStore";
import { updateOrder } from "@/services/OrderApi";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function EditOrderModal({ orderId }: { orderId: number }) {
  const navigate = useNavigate();

  const order = useOrderStore((state) => state.currentOrder);
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
      products: order?.order_items,
      billingDate: order?.order_date,
      paymentMethod: order?.payment_method,
    },
  });

  const { mutate } = useMutation({
    mutationFn: updateOrder,
    onSuccess: (data) => {
      if (data) toast.success(data.message);
      reset();
      reloadTable();
      navigate(location.pathname, { replace: true });
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

  const handlecloseModal = () => {
    navigate(location.pathname, { replace: true });
    setTotal("0");
  };

  const handleEditOrder = (data: OrderFormDataT) => {
    if (order) {
      const { id, order_items, ...orderSend } = order;

      const orderItems = order_items.map((item) => {
        const { product_name, order_id, ...restOrderItem } = item;
        return restOrderItem;
      });

      const newOrder = {
        ...orderSend,
        orderItems: orderItems,
      };

      const dataSend = {
        formData: {
          ...newOrder,
          total: total,
          order_date: data.billingDate,
          payment_method: data.paymentMethod,
        },
        orderId,
      };

      mutate(dataSend);
    }
  };

  return (
    <>
      <Transition appear show={true} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handlecloseModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-bold text-neutral-600"
                  >
                    Editar Orden de Compra
                  </Dialog.Title>

                  <form
                    className="bg-neutral-400/20 rounded-lg p-5 flex flex-col gap-3"
                    onSubmit={handleSubmit(handleEditOrder)}
                    noValidate
                  >
                    <OrderForm
                      register={register}
                      errors={errors}
                      setValue={setValue}
                    />
                    <input
                      onClick={(e) => e.stopPropagation()}
                      type="submit"
                      value="Editar ODC"
                      className="mx-auto rounded-lg  bg-transparent border border-green-500 hover:bg-lime-600 hover:text-white    p-3 text-neutral-500 font-bold cursor-pointer transition-colors"
                    />{" "}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
