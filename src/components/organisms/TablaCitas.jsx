import { useState } from "react";
import Boton from "../atoms/Boton.jsx";
import EtiquetaEstadoCita from "../atoms/EtiquetaEstadoCita.jsx";
import { formatearFecha } from "../../utils/fechas.js";

const estados = ["pendiente", "confirmada", "cancelada"];

// Organismo: tabla del panel con todas las citas. Se puede cambiar el estado y eliminar.
// Props: citas, onCambiarEstado (recibe id y estado nuevo) y onEliminar (recibe el id).
function TablaCitas({ citas, onCambiarEstado, onEliminar }) {
    const [pendiente, setPendiente] = useState(null);

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
                {citas.map((cita) => (
                    <tr key={cita.id}>
                        <td>{cita.nombre}<br /><small>{cita.correo}</small></td>
                        <td>{cita.servicio}</td>
                        <td>{cita.nutricionista}</td>
                        <td>{formatearFecha(cita.fecha)} {cita.hora}</td>
                        <td>
                            <EtiquetaEstadoCita estado={cita.estado} />
                            <select
                                aria-label={`Estado de la cita de ${cita.nombre}`}
                                value={cita.estado}
                                onChange={(evento) => onCambiarEstado(cita.id, evento.target.value)}
                            >
                                {estados.map((estado) => (
                                    <option key={estado} value={estado}>{estado}</option>
                                ))}
                            </select>
                        </td>
                        <td>
                            {pendiente === cita.id ? (
                                <>
                                    <span>¿Eliminar?</span>
                                    <Boton onClick={() => { onEliminar(cita.id); setPendiente(null); }}>Sí</Boton>
                                    <Boton onClick={() => setPendiente(null)}>No</Boton>
                                </>
                            ) : (
                                <Boton onClick={() => setPendiente(cita.id)}>Eliminar</Boton>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default TablaCitas;