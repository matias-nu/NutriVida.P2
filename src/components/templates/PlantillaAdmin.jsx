import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

// Template: esqueleto del panel de administración (menú lateral + contenido).
// Solo el administrador ve "Servicios"; la secretaría maneja las citas.
function PlantillaAdmin() {
    const { usuario } = useAuth();

    return (
        <div className="admin">
            <nav className="admin-menu" aria-label="Panel de administración">
                <NavLink to="/panel" end>Resumen</NavLink>
                {usuario.rol === "admin" && <NavLink to="/panel/servicios">Servicios</NavLink>}
                <NavLink to="/panel/citas">Citas</NavLink>
            </nav>

            <div className="admin-contenido">
                <Outlet />
            </div>
        </div>
    );
}

export default PlantillaAdmin;