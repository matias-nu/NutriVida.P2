import Precio from "../atoms/Precio.jsx";
import { formatearFecha } from "../../utils/fechas.js";

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
            <dd>
                {cita.nombre}
                {cita.correo ? ` (${cita.correo})` : ""}
            </dd>

            {cita.telefono && (
                <>
                    <dt>Teléfono</dt>
                    <dd>{cita.telefono}</dd>
                </>
            )}

            {cita.precio != null && (
                <>
                    <dt>Valor</dt>
                    <dd><Precio valor={cita.precio} /></dd>
                </>
            )}

            {cita.estado && (
                <>
                    <dt>Estado</dt>
                    <dd>{cita.estado}</dd>
                </>
            )}
        </dl>
    );
}

export default ResumenCita;
