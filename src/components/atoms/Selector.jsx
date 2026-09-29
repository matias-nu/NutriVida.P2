// Selector (átomo): un <select> controlado. Props: id, valor, alCambiar, opciones ({valor, texto}), textoVacio.
function Selector({ id, valor, alCambiar, opciones, textoVacio = 'Selecciona una opción' }) {
  return (
    <select id={id} name={id} className="selector" value={valor} onChange={alCambiar}>
      <option value="">{textoVacio}</option>
      {opciones.map((op) => (
        <option key={op.valor} value={op.valor}>{op.texto}</option>
      ))}
    </select>
  )
}

export default Selector
