export function formatNumber(quantity: number): string {
  return new Intl.NumberFormat("es-CO", {
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(quantity);
}
