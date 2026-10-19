import { useState } from "react";
import Boton from "../atoms/Boton.jsx";
import Precio from "../atoms/Precio.jsx";

// Organismo: tabla del panel con los servicios y los botones Editar / Eliminar.
// Props: servicios, onEditar (recibe el servicio) y onEliminar (recibe el id).
// Eliminar pide confirmación en la propia fila (sin alert ni confirm).
function TablaServicios({ servicios, onEditar, onEliminar }) {
    const [pendiente, setPendiente] = useState(null);

    return (
        <table className="tabla-admin">
            <thead>
                <tr>
                    <th>Servicio</th>
                    <th>Tipo</th>
                    <th>Precio</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {servicios.map((servicio) => (
                    <tr key={servicio.id}>
                        <td>{servicio.titulo}</td>
                        <td>{servicio.tipo}</td>
                        <td><Precio valor={servicio.precio} /></td>
                        <td>
                            {pendiente === servicio.id ? (
                                <>
                                    <span>¿Eliminar?</span>
                                    <Boton onClick={() => { onEliminar(servicio.id); setPendiente(null); }}>Sí</Boton>
                                    <Boton onClick={() => setPendiente(null)}>No</Boton>
                                </>
                            ) : (
                                <>
                                    <Boton onClick={() => onEditar(servicio)}>Editar</Boton>
                                    <Boton onClick={() => setPendiente(servicio.id)}>Eliminar</Boton>
                                </>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default TablaServicios;