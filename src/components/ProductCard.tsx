import {
  FieldErrors,
  set,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { products } from "../data/db";
import { OrderFormDataT, OrderT, itemT } from "../types";
import PlusIcon from "./PlusIcon";
import ProductItem from "./ProductItem";
import ErrorMessage from "./ErrorMessage";
import { useOrderStore } from "@/store/orderStore";
import AddProductoModal from "./AddProductoModal";
import { useState } from "react";

type ProductCardT = {
  errors: FieldErrors<OrderFormDataT>;
  register: UseFormRegister<OrderFormDataT>;
  setValue: UseFormSetValue<OrderFormDataT>;
};

export default function ProductCard({
  register,
  errors,
  setValue,
}: ProductCardT) {
  const order = useOrderStore((state) => state.currentOrder);
  const additemToOrder = useOrderStore((state) => state.additemToOrder);

  const [openModal, setOpenModal] = useState(false);

  const handleAddProduct = () => {
    setOpenModal(true);
  };

  return (
    <>
      <div className="p-5 bg-white flex flex-col gap-3 rounded-lg ">
        <div className="grid grid-cols-13  gap-3 ">
          <span className="col-span-4 text-left text-neutral-600/60 font-bold text-xs">
            Producto
          </span>
          <span className="col-span-1 text-left text-neutral-600/60 font-bold text-xs">
            Cantidad
          </span>
          <span className="col-span-1 text-left text-neutral-600/60 font-bold text-xs">
            % IVA
          </span>
          <span className="col-span-2 text-left text-neutral-600/60 font-bold text-xs">
            Valor unitario sin IVA
          </span>
          <span className="col-span-2 text-left text-neutral-600/60 font-bold text-xs">
            Valor unitario con IVA
          </span>
          <span className="col-span-2 text-left text-neutral-600/60 font-bold text-xs">
            Valor total con IVA
          </span>
        </div>
        <div className="max-h-55 overflow-y-auto">
          {order?.order_items.map((product: itemT) => (
            <ProductItem product={product} key={product.product_id} />
          ))}
        </div>

        {errors.products && (
          <ErrorMessage>{errors.products.message}</ErrorMessage>
        )}

        <button
          onClick={handleAddProduct}
          className="mt-4 cursor-pointer text-neutral-600/60 font-bold text-xs hover:text-neutral-600 transition-colors duration-200 flex items-center gap-3"
        >
          <div className="rounded-full bg-neutral-400/80 flex items-center justify-center text-white w-4 h-4">
            <PlusIcon />
          </div>
          Agregar nuevo producto
        </button>
      </div>

      {openModal && <AddProductoModal setOpenModal={setOpenModal} />}
    </>
  );
}
