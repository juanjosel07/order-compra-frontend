import { products } from "../data/db";
import { ProductT } from "../types";
import PlusIcon from "./PlusIcon";
import ProductItem from "./ProductItem";

export default function ProductCard() {
  return (
    <div className="p-5 bg-white flex flex-col gap-3 rounded-lg">
      <div className="grid grid-cols-13  gap-3">
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
      {products.map((product: ProductT) => (
        <ProductItem product={product} />
      ))}

      <div></div>

      <button className="mt-4 cursor-pointer text-neutral-600/60 font-bold text-xs hover:text-neutral-600 transition-colors duration-200 flex items-center gap-3">
        <div className="rounded-full bg-neutral-400/80 flex items-center justify-center text-white w-4 h-4">
          <PlusIcon />
        </div>
        Agregar nuevo producto
      </button>
    </div>
  );
}
