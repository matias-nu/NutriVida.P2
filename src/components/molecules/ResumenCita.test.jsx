import Precio from "../atoms/Precio.jsx";
import { formatearFecha } from "../../utils/fechas.js";

// Molécula: resumen de una cita (se usa al confirmar y en la pantalla de éxito).
// Prop: cita = { servicio, nutricionista, fecha, hora, nombre, correo, telefono, precio }
function ResumenCita({ cita }) {
    return (
        <dl className="resumen-cita">
            <dt>Servicio</dt>
            <dd>{cita.servicio}</dd>

            <dt>Nutricionista</dt>
            <dd>{cita.nutricionista}</dd>

            <dt>Fecha y hora</dt>
            <dd>{formatearFecha(cita.fecha)} a las {cita.hora}</dd>

            <dt>Paciente</dt>
            <dd>{cita.nombre} ({cita.correo})</dd>

            <dt>Teléfono</dt>
            <dd>{cita.telefono}</dd>

            <dt>Valor</dt>
            <dd><Precio valor={cita.precio} /></dd>
        </dl>
    );
}

export default ResumenCita;