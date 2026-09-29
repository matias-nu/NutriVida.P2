import Selector from '../atoms/Selector'

// SelectorHorario (molécula): lista de horas disponibles. Props: horarios (lista de textos), valor, alCambiar.
function SelectorHorario({ horarios, valor, alCambiar }) {
  const opciones = horarios.map((hora) => ({ valor: hora, texto: hora }))
  return (
    <Selector
      id="horario"
      valor={valor}
      alCambiar={alCambiar}
      opciones={opciones}
      textoVacio={horarios.length === 0 ? 'Primero elige un nutricionista' : 'Elige un horario'}
    />
  )
}

export default SelectorHorario
