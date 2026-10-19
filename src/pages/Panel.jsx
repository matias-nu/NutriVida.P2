import { useAuth } from "../context/AuthContext.jsx";
import { useCitas } from "../context/CitasContext.jsx";
import { useServicios } from "../context/ServiciosContext.jsx";

// Inicio del panel (/panel): saludo y resumen de números.
function Panel() {
    const { usuario } = useAuth();
    const { citas } = useCitas();
    const { servicios } = useServicios();

    const pendientes = citas.filter((cita) => cita.estado === "pendiente").length;

    return (
        <>
            <h1>Hola, {usuario.nombre}</h1>
            <p>
                Iniciaste sesión como <strong>{usuario.rol}</strong> ({usuario.correo}).
            </p>

            <ul className="resumen-panel">
                <li><strong>{citas.length}</strong> citas en total</li>
                <li><strong>{pendientes}</strong> citas pendientes de confirmar</li>
                <li><strong>{servicios.length}</strong> servicios en el catálogo</li>
            </ul>
        </>
    );
}

export default Panel;