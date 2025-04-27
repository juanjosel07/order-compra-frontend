export default function CostSummay() {
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
          value={"2000000"}
        />
        <input
          type="text"
          className="col-span-1 text-center bg-white rounded-lg px-2 py-3 font-bold text-neutral-500/80 text-sm"
          readOnly
          value={"2000000"}
        />
        <input
          type="text"
          className="col-span-1 text-center bg-white rounded-lg px-2 py-3 font-bold text-neutral-500/80 text-sm"
          readOnly
          value={"2000000"}
        />
        <input
          type="text"
          className="col-span-1 text-center bg-white rounded-lg px-2 py-3 font-bold text-neutral-500/80 text-sm"
          readOnly
          value={"2000000"}
        />
        <input
          type="number"
          className="col-span-1 text-center bg-white rounded-lg px-2 py-3 italic font-medium text-neutral-500/80 text-sm"
          //   value=""
          placeholder="Ingresar ..."
        />
        <input
          type="text"
          className="col-span-2 text-center border-purple-500 border-2 bg-white rounded-lg px-2 py-3 font-bold text-neutral-500/80 text-sm"
          readOnly
          value={"17708000"}
        />
      </div>
    </>
  );
}
