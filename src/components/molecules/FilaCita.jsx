import EtiquetaEstadoCita from '../atoms/EtiquetaEstadoCita'

// FilaCita (molécula): una fila con los datos de una cita agendada.
// Prop: cita = { servicio, nutricionista, fecha, hora, estado }
function FilaCita({ cita }) {
  return (
    <li className="fila-cita">
      <div>
        <strong>{cita.servicio}</strong>
        <div className="fila-cita-detalle">{cita.nutricionista} · {cita.fecha} a las {cita.hora}</div>
      </div>
      <EtiquetaEstadoCita estado={cita.estado} />
    </li>
  )
}

export default FilaCita
