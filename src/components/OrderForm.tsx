import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import BillingInfo from "./BillingInfo";
import CostSummay from "./CostSummay";
import ProductCard from "./ProductCard";
import { OrderFormDataT, OrderT } from "../types";
import { useEffect } from "react";

type OrderFormT = {
  errors: FieldErrors<OrderFormDataT>;
  register: UseFormRegister<OrderFormDataT>;
  setValue: UseFormSetValue<OrderFormDataT>;
};

export default function OrderForm({ register, errors, setValue }: OrderFormT) {
  useEffect(() => {
    register("products", {
      validate: (value) =>
        (value && value.length > 0) || "Debes agregar al menos un producto",
    });
  }, [register]);
  return (
    <>
      <ProductCard register={register} errors={errors} setValue={setValue} />
      <CostSummay />
      <BillingInfo register={register} errors={errors} />
    </>
  );
}
