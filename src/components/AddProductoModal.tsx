import { getAllProducts } from "@/services/ProductApi";
import { Transition, Dialog } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useLocation } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import ErrorMessage from "./ErrorMessage";
import { itemT, ProductT } from "../types";
import { useForm } from "react-hook-form";
import { formatNumber } from "../helpers";
import { useOrderStore } from "@/store/orderStore";

type AddProductoModalProps = {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function AddProductoModal({
  setOpenModal,
}: AddProductoModalProps) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const OrderId = +queryParams.get("editOrder")!;

  const { data, isError } = useQuery({
    queryKey: ["products"],
    queryFn: () => getAllProducts(),
  });

  if (isError) {
    return <Navigate to="/404" />;
  }
  const [product, setProduct] = useState<ProductT>();

  const additemToOrder = useOrderStore((state) => state.additemToOrder);

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<itemT>({});

  const productName = watch("product_name") || "";

  useEffect(() => {
    const selected = data?.find((product) => product.name === productName);
    setProduct(selected);
  }, [productName, data]);

  const closeModal = () => {
    setOpenModal(false);
    reset();
  };

  const handleAddProduct = (data: itemT) => {
    if (product) {
      const subtotal = Number(product?.unit_price) * data.quantity;
      const total = subtotal + (subtotal * Number(product?.iva)) / 100;
      const productToAdd = {
        ...data,
        product_id: product?.id,
        order_id: OrderId,
        unit_price: product?.unit_price,
        iva: product?.iva + "",
        subtotal: subtotal + "",
        total: total + "",
      };
      additemToOrder(productToAdd);
      setOpenModal(false);
      reset();
    }
  };

  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-bold text-neutral-600 my-5"
                >
                  Agregar Productos
                </Dialog.Title>

                <p className="text-sm text-neutral-950 font-bold">
                  Llena los campos para Agregar{" "}
                  <span className="text-lime-700">Productos</span> a la orden
                </p>

                <form
                  className="mt-10 space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleSubmit(handleAddProduct)(e);
                  }}
                  noValidate
                >
                  <>
                    <div className="flex flex-col gap-1">
                      <label
                        className="font-normal text-xl text-neutral-900"
                        htmlFor="room_type"
                      >
                        Product
                      </label>
                      <select
                        id="product_name"
                        className="w-full p-3  border-gray-300 border rounded-lg"
                        {...register("product_name", {
                          required: "El Tipo de habitacion es obligatorio",
                        })}
                        defaultValue={""}
                      >
                        <option value="" disabled hidden>
                          Seleccione un producto
                        </option>
                        {data?.map((product) => (
                          <option key={product.id} value={product.name}>
                            {product.name}
                          </option>
                        ))}
                      </select>
                      {errors.product_name && (
                        <ErrorMessage>
                          {errors.product_name.message}
                        </ErrorMessage>
                      )}
                    </div>

                    <div className="flex flex-col gap-1">
                      <label
                        className="font-normal text-xl text-neutral-900"
                        htmlFor="quantity"
                      >
                        Cantidad
                      </label>
                      <input
                        id="quantity"
                        className="w-full p-3  border-gray-300 border rounded-lg"
                        type="number"
                        {...register("quantity", {
                          required: "La cantidad es obligatoria",
                        })}
                      />
                      {errors.quantity && (
                        <ErrorMessage>{errors.quantity.message}</ErrorMessage>
                      )}
                    </div>

                    <div className="flex flex-col gap-1">
                      <label
                        className="font-normal text-xl text-neutral-900"
                        htmlFor="iva"
                      >
                        Valor Unitario
                      </label>
                      <input
                        id="iva"
                        className="w-full p-3  border-gray-300 border rounded-lg"
                        type="text"
                        readOnly
                        value={
                          product
                            ? formatNumber(Number(product?.unit_price))
                            : ""
                        }
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label
                        className="font-normal text-xl text-neutral-900"
                        htmlFor="iva"
                      >
                        Iva
                      </label>
                      <input
                        id="iva"
                        className="w-full p-3  border-gray-300 border rounded-lg"
                        type="number"
                        readOnly
                        value={
                          product ? formatNumber(Number(product?.iva)) : ""
                        }
                      />
                    </div>
                  </>
                  <input
                    onClick={(event) => event.stopPropagation()}
                    type="submit"
                    value="Agregar Producto"
                    className="mx-auto flex rounded-lg  bg-transparent border border-green-500 hover:bg-lime-600 hover:text-white p-3 text-neutral-500 font-bold cursor-pointer transition-colors"
                  />{" "}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
