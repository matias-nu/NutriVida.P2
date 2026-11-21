import { useAuth } from "../context/AuthContext.jsx";
import { useCitas } from "../context/CitasContext.jsx";
import { useServicios } from "../context/ServiciosContext.jsx";

function Panel() {
    const { usuario } = useAuth();
    const { citas, cargando, error } = useCitas();
    const { servicios } = useServicios();

    const esAdmin = usuario.rol === "admin";

    const pendientes = citas.filter(
        cita => cita.estado === "pendiente"
    ).length;

    const confirmadas = citas.filter(
        cita => cita.estado === "confirmada"
    ).length;

    const completadas = citas.filter(
        cita => cita.estado === "completada"
    ).length;

    return (
        <>
            <h1>Hola, {usuario.nombre}</h1>

            <p>
                {esAdmin
                    ? "Bienvenido al panel de administración de NutriVida."
                    : "Bienvenido a tu panel de atención nutricional."}
            </p>

            {cargando && <p>Cargando información...</p>}

            {error && (
                <p role="alert">
                    No se pudieron cargar las citas: {error}
                </p>
            )}

            {!cargando && !error && (
                <ul className="resumen-panel">
                    <li>
                        <strong>{citas.length}</strong>
                        {esAdmin ? " citas registradas" : " citas asignadas"}
                    </li>

                    <li>
                        <strong>{pendientes}</strong>
                        citas pendientes
                    </li>

                    <li>
                        <strong>{confirmadas}</strong>
                        citas confirmadas
                    </li>

                    <li>
                        <strong>{completadas}</strong>
                        citas completadas
                    </li>

                    {esAdmin && (
                        <li>
                            <strong>{servicios.length}</strong>
                            servicios en el catálogo
                        </li>
                    )}
                </ul>
            )}
        </>
    );
}

export default Panel;
