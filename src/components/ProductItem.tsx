import { ProductT } from "../types";
import MinusIcon from "./MinusIcon";

type ProductItemT = {
  product: ProductT;
};
export default function ProductItem({ product }: ProductItemT) {
  return (
    <div className="grid grid-cols-13 gap-3">
      <input
        type="text"
        value={product.name}
        className="col-span-4 bg-neutral-200 rounded-lg px-2 py-3 font-bold text-neutral-500/80 text-sm"
        readOnly
      ></input>
      <input
        type="text"
        value={product.quantity}
        className="col-span-1 text-center bg-neutral-200 rounded-lg px-2 py-3 font-bold text-neutral-500/80 text-sm"
        readOnly
      />
      <input
        type="text"
        value={product.iva}
        className="col-span-1 text-center bg-neutral-200 rounded-lg px-2 py-3 font-bold text-neutral-500/80 text-sm"
        readOnly
      />
      <input
        type="text"
        value={product.price}
        className="col-span-2 text-center bg-neutral-200 rounded-lg px-2 py-3 font-bold text-neutral-500/80 text-sm"
        readOnly
      />
      <input
        type="text"
        value={product.price + product.price * (product.iva / 100)}
        className="col-span-2 text-center bg-neutral-200 rounded-lg px-2 py-3 font-bold text-neutral-500/80 text-sm"
        readOnly
      />
      <input
        type="text"
        value={
          (product.price + product.price * (product.iva / 100)) *
          product.quantity
        }
        className="col-span-2 focus:outline-none focus:ring-0 focus:border-transparenttext-center bg-neutral-200 rounded-lg px-2 py-3 font-bold text-neutral-500/80 text-sm"
        readOnly
      />
      <div className="flex items-center">
        <button className="cursor-pointer w-5 h-5 bg-neutral-400/80 transition-colors duration-200 hover:bg-red-400 rounded-full flex items-center justify-center text-white font-medium ">
          <MinusIcon />
        </button>
      </div>
    </div>
  );
}
