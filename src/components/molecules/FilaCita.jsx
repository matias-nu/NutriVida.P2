import EtiquetaEstadoCita from '../atoms/EtiquetaEstadoCita'
import { formatearFecha } from '../../utils/fechas'

function FilaCita({ cita, acciones }) {
  return (
    <li className="fila-cita">
      <div>
        <strong>{cita.servicio}</strong>
        <div className="fila-cita-detalle">{cita.nutricionista} · {formatearFecha(cita.fecha)} a las {cita.hora}</div>
      </div>
      <EtiquetaEstadoCita estado={cita.estado} />
      {acciones && <div className="fila-cita-acciones">{acciones}</div>}
    </li>
  )
}

export default FilaCita