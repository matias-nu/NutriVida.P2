// EtiquetaEstadoCita (átomo): estado de una cita. Prop: estado ('pendiente' | 'confirmada' | 'cancelada').
const textos = { pendiente: 'Pendiente', confirmada: 'Confirmada', cancelada: 'Cancelada' }

function EtiquetaEstadoCita({ estado }) {
  return <span className={`etiqueta etiqueta-${estado}`}>{textos[estado] ?? 'Pendiente'}</span>
}

export default EtiquetaEstadoCita
