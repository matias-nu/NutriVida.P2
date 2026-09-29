// CampoTexto (átomo): un <input> controlado. Props: id, tipo, valor, alCambiar, placeholder, invalido.
function CampoTexto({ id, tipo = 'text', valor, alCambiar, placeholder = '', invalido = false }) {
  return (
    <input
      id={id}
      name={id}
      type={tipo}
      className={`campo-texto${invalido ? ' invalido' : ''}`}
      value={valor}
      onChange={alCambiar}
      placeholder={placeholder}
    />
  )
}

export default CampoTexto
