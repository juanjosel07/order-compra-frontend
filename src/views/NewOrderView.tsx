import BillingInfo from "@/components/BillingInfo";
import CostSummay from "@/components/CostSummay";
import ProductCard from "@/components/ProductCard";

export default function CreateODCView() {
  return (
    <>
      <div className="bg-neutral-400/20 rounded-lg p-5 flex flex-col gap-3">
        <h2 className="text-2xl font-bold text-neutral-600">
          Crear Orden de Compra
        </h2>
        <ProductCard />
        <CostSummay />
        <BillingInfo />
      </div>
    </>
  );
}
