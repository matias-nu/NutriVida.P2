// EtiquetaModalidad (átomo): insignia según la modalidad del servicio.
// Prop: modalidad ('Presencial', 'Online (video)' o 'Presencial (grupo)').
function EtiquetaModalidad({ modalidad }) {
  return <span className={`etiqueta etiqueta-${modalidad.includes('Online') ? 'online' : 'presencial'}`}>{modalidad}</span>
}

export default EtiquetaModalidad
