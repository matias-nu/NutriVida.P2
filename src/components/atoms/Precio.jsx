const formatoCLP = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
})

// Precio (átomo): muestra un número como pesos chilenos. Prop: valor (número).
function Precio({ valor }) {
  return <span className="precio">{formatoCLP.format(valor)}</span>
}

export default Precio
