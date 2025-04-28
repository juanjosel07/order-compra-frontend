import { OrderFormDataT, OrderT } from "../types";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import OrderForm from "./OrderForm";
import { useForm } from "react-hook-form";
import { useOrderStore } from "@/store/orderStore";

export default function EditOrderModal({ orderId }: { orderId: number }) {
  const navigate = useNavigate();

  const order = useOrderStore((state) => state.currentOrder);

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

  const handleEditOrder = (data) => {};

  return (
    <>
      <Transition appear show={true} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => navigate(location.pathname, { replace: true })}
        >
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
