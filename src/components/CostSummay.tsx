import { useOrderStore } from "@/store/orderStore";
import { useEffect, useState } from "react";

export default function CostSummay() {
  const order = useOrderStore((state) => state.currentOrder);

  const setCurrentOrder = useOrderStore((state) => state.setCurrentOrder);
  const [discount, setDiscount] = useState(order?.discount);
  const [subtSinIVA, setSubtSinIVA] = useState(0);
  const [totalGconIva, setTotalGconIva] = useState(0);
  const [totalGsinIva, setTotalGsinIva] = useState(0);
  const [ivaTotal, setIvaTtotal] = useState(0);
  const [totalODC, setTotalODC] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? "" : e.target.value;
    setDiscount(value);

    if (order) {
      const updatedOrder = { ...order, discount: value + "" };
      setCurrentOrder(updatedOrder);
    }
  };

  useEffect(() => {
    if (!order) return;
    const orderItems = order?.order_items || [];

    let subtotal = 0;
    let gravadoIVA = 0;
    let noGravado = 0;
    let ivaTotal = 0;
    let totalOrden = 0;

    orderItems.forEach((item) => {
      const itemSubtotal = Number(item.subtotal);
      const itemTotal = Number(item.total);
      const itemIVA = Number(item.iva);
      const total = Number(item.total);

      subtotal += itemSubtotal;

      if (itemIVA > 0) {
        gravadoIVA += itemSubtotal;
      } else {
        noGravado += itemSubtotal;
      }

      ivaTotal += itemTotal - itemSubtotal;
      totalOrden += total;
    });

    setSubtSinIVA(subtotal);
    setTotalGconIva(gravadoIVA);
    setTotalGsinIva(noGravado);
    setIvaTtotal(ivaTotal);

    const descuentoValue = Number(order.discount) || 0;
    const valorODC = (totalOrden || 0) - descuentoValue;
    setTotalODC(valorODC);
  }, [order]);

  return (
    <>
      <div className="grid grid-cols-7  gap-3 mt-5">
        <span className="col-span-1 text-left text-neutral-600/60 font-bold text-xs">
          Subtotal sin IVA
        </span>
        <span className="col-span-1 text-left text-neutral-600/60 font-bold text-xs">
          Total Gravado con IVA
        </span>
        <span className="col-span-1 text-left text-neutral-600/60 font-bold text-xs">
          Total no gravado con IVA
        </span>
        <span className="col-span-1 text-left text-neutral-600/60 font-bold text-xs">
          Total IVA
        </span>
        <span className="col-span-1 text-left text-neutral-600/60 font-bold text-xs">
          Descuento
        </span>
        <span className="col-span-2 text-left text-neutral-600/60 font-bold text-xs">
          Valor total ODC
        </span>
      </div>

      <div className="grid grid-cols-7 gap-3">
        <input
          type="text"
          className="col-span-1 text-center bg-white rounded-lg px-2 py-3 font-bold text-neutral-500/80 text-sm"
          readOnly
          value={subtSinIVA}
        />
        <input
          type="text"
          className="col-span-1 text-center bg-white rounded-lg px-2 py-3 font-bold text-neutral-500/80 text-sm"
          readOnly
          value={totalGconIva}
        />
        <input
          type="text"
          className="col-span-1 text-center bg-white rounded-lg px-2 py-3 font-bold text-neutral-500/80 text-sm"
          readOnly
          value={totalGsinIva}
        />
        <input
          type="text"
          className="col-span-1 text-center bg-white rounded-lg px-2 py-3 font-bold text-neutral-500/80 text-sm"
          readOnly
          value={ivaTotal}
        />
        <input
          type="text"
          className="col-span-1 text-center bg-white rounded-lg px-2 py-3 italic font-medium text-neutral-500/80 text-sm"
          value={discount}
          onChange={handleChange}
          placeholder="Ingresar ..."
          min="0"
          step="1"
        />
        <input
          type="text"
          className="col-span-2 text-center border-purple-500 border-2 bg-white rounded-lg px-2 py-3 font-bold text-neutral-500/80 text-sm"
          readOnly
          value={totalODC}
        />
      </div>
    </>
  );
}
