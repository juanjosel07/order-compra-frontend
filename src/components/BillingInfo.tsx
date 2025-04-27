export default function BillingInfo() {
  return (
    <div className="flex gap-3 justify-between">
      <div className="flex-1 flex flex-col gap-3 ">
        <label className="">Observaciones</label>
        <textarea
          className=" h-full rounded-lg p-3 text-neutral-500/80 text-sm italic font-medium bg-white"
          placeholder="Agregar Observaciones ..."
        ></textarea>
      </div>
      <div className="flex-1 flex flex-col gap-3">
        <h2>Información de Facturación</h2>
        <div className="flex gap-4 p-5 bg-white justify-between rounded-lg">
          <div className="flex flex-col gap-3 flex-1">
            <label>Fecha de Facturación</label>
            <input
              type="date"
              className="text-center bg-neutral-200 rounded-lg px-2 py-3 font-bold text-neutral-500/80 text-sm"
            />
          </div>
          <div className="flex flex-col gap-3 flex-1">
            <label>Forma de Pago</label>
            <select className="text-center bg-neutral-200 rounded-lg px-2 py-3 font-bold text-neutral-500/80 text-sm">
              <option value="seleccionar"> Seleccionar</option>
              <option value="Efectivo">Efectivo</option>
              <option value="Transferencia">Transferencia</option>
              <option value="Tarjeta de Credito">Tarjeta de Credito</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
