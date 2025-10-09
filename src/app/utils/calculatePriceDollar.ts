export function returnDollarForBs(
  tikes: number,
  monto: number,
  precio_dolar: number
) {
  // const tasa = parseFloat(precio_dolar.replace(',', '.'));
  if (!tikes || !monto || isNaN(precio_dolar) || precio_dolar <= 0) return 0;
  return tikes * monto * precio_dolar;
}
