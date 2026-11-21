import Boton from "../atoms/Boton.jsx";
import EtiquetaEstadoCita from "../atoms/EtiquetaEstadoCita.jsx";
import { formatearFecha } from "../../utils/fechas.js";

const estados = ["confirmada", "cancelada", "completada"];

function TablaCitas({ citas, onCambiarEstado, onEliminar }) {
    if (citas.length === 0) {
        return <p className="sin-resultados">Todavía no hay citas registradas.</p>;
    }

    return (
        <table className="tabla-admin">
            <thead>
                <tr>
                    <th>Paciente</th>
                    <th>Servicio</th>
                    <th>Nutricionista</th>
                    <th>Fecha</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {citas.map(cita => {
                    const finalizada = ["cancelada", "completada"].includes(cita.estado);

                    return (
                        <tr key={cita.id}>
                            <td>
                                {cita.nombre}
                                <br />
                                <small>{cita.correo}</small>
                            </td>
                            <td>{cita.servicio}</td>
                            <td>{cita.nutricionista}</td>
                            <td>{formatearFecha(cita.fecha)} {cita.hora}</td>
                            <td>
                                <EtiquetaEstadoCita estado={cita.estado} />
                            </td>
                            <td>
                                {finalizada ? (
                                    <span>Sin acciones disponibles</span>
                                ) : (
                                    <>
                                        <select
                                            aria-label={`Cambiar estado de la cita ${cita.id}`}
                                            defaultValue=""
                                            onChange={evento => {
                                                const estado = evento.target.value;
                                                if (estado) onCambiarEstado(cita.id, estado);
                                                evento.target.value = "";
                                            }}
                                        >
                                            <option value="">Cambiar estado</option>
                                            {estados
                                                .filter(estado => estado !== cita.estado)
                                                .map(estado => (
                                                    <option key={estado} value={estado}>
                                                        {estado}
                                                    </option>
                                                ))}
                                        </select>
                                        <Boton onClick={() => {
                                            if (window.confirm("¿Cancelar esta cita?")) {
                                                onEliminar(cita.id);
                                            }
                                        }}>
                                            Cancelar
                                        </Boton>
                                    </>
                                )}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default TablaCitas;
