import { itemT } from "../types";
import MinusIcon from "./MinusIcon";
import { formatNumber } from "../helpers";
import { useOrderStore } from "@/store/orderStore";

type ProductItemProps = {
  product: itemT;
};

export default function ProductItem({ product }: ProductItemProps) {
  const order = useOrderStore((state) => state.currentOrder);

  const removeProductFromOrder = useOrderStore(
    (state) => state.removeProductFromOrder
  );

  const unitPriceWithIva =
    Number(product.unit_price) +
    Number(product.unit_price) * (Number(product.iva) / 100);

  const inputBaseClass =
    "bg-neutral-200 rounded-lg px-2 py-3 font-bold text-neutral-500/80 text-sm";
  const centerTextClass = "text-center";

  const handleRemove = () => {
    removeProductFromOrder(product.product_id);
  };

  return (
    <div className="grid grid-cols-13 gap-3 items-center my-2">
      <input
        type="text"
        value={product.product_name}
        className={`col-span-4 ${inputBaseClass}`}
        readOnly
      />
      <input
        type="text"
        value={product.quantity}
        className={`col-span-1 ${inputBaseClass} ${centerTextClass}`}
        readOnly
      />
      <input
        type="text"
        value={product.iva}
        className={`col-span-1 ${inputBaseClass} ${centerTextClass}`}
        readOnly
      />
      <input
        type="text"
        value={formatNumber(Number(product.unit_price))}
        className={`col-span-2 ${inputBaseClass} ${centerTextClass}`}
        readOnly
      />
      <input
        type="text"
        value={formatNumber(unitPriceWithIva)}
        className={`col-span-2 ${inputBaseClass} ${centerTextClass}`}
        readOnly
      />
      <input
        type="text"
        value={formatNumber(Number(product.total))}
        className={`col-span-2 ${inputBaseClass} ${centerTextClass}`}
        readOnly
      />
      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleRemove}
          aria-label={`Eliminar producto ${product.product_name}`}
          className="w-5 h-5 cursor-pointer bg-neutral-400/80 hover:bg-red-400 transition-colors duration-200 rounded-full flex items-center justify-center text-white font-medium"
        >
          <MinusIcon />
        </button>
      </div>
    </div>
  );
}
