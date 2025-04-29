import { FieldErrors, UseFormRegister } from "react-hook-form";
import { OrderFormDataT } from "../types";
import ErrorMessage from "./ErrorMessage";
import { useOrderStore } from "@/store/orderStore";
import { use, useEffect, useState } from "react";

type BillingInfoT = {
  errors: FieldErrors<OrderFormDataT>;
  register: UseFormRegister<OrderFormDataT>;
};

export default function BillingInfo({ register, errors }: BillingInfoT) {
  const order = useOrderStore((state) => state.currentOrder);
  const setCurrentOrder = useOrderStore((state) => state.setCurrentOrder);

  const [observations, setObservations] = useState(order?.observations);

  useEffect(() => {
    if (order) {
      setObservations(order.observations);
    }
  }, [order]);

  const handleChangeObservations = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setObservations(value);
    if (order) {
      const updatedOrder = { ...order, observations: value };
      setCurrentOrder(updatedOrder);
    }
  };

  return (
    <div className="flex gap-3 justify-between">
      <div className="flex-1 flex flex-col gap-3 ">
        <label className="">Observaciones</label>
        <textarea
          className=" h-full rounded-lg p-3 text-neutral-500/80 text-sm italic font-medium bg-white"
          placeholder="Agregar Observaciones ..."
          value={observations ?? ""}
          onChange={handleChangeObservations}
        ></textarea>
      </div>
      <div className="flex-1 flex flex-col gap-3">
        <h2>Información de Facturación</h2>
        <div className="flex gap-4 p-5 bg-white justify-between rounded-lg">
          <div className="flex flex-col gap-3 flex-1">
            <label>Fecha de Facturación</label>
            <input
              id="fecha_facturacion"
              type="date"
              className="text-center bg-neutral-200 rounded-lg px-2 py-3 font-bold text-neutral-500/80 text-sm"
              {...register("billingDate", {
                required: "La fecha es obligatoria",
              })}
            />
            {errors.billingDate && (
              <div className="text-xs">
                <ErrorMessage>{errors.billingDate.message}</ErrorMessage>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-3 flex-1">
            <label>Forma de Pago</label>
            <select
              id="forma_pago"
              className="text-center bg-neutral-200 rounded-lg px-2 py-3 font-bold text-neutral-500/80 text-sm"
              {...register("paymentMethod", {
                required: "La forma de pago es obligatoria",
              })}
            >
              <option value="seleccionar"> Seleccionar</option>
              <option value="Efectivo">Efectivo</option>
              <option value="Transferencia">Transferencia</option>
              <option value="Tarjeta de Credito">Tarjeta de Credito</option>
            </select>
            <div className="text-xs">
              {errors.paymentMethod && (
                <ErrorMessage>{errors.paymentMethod.message}</ErrorMessage>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
