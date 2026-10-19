import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

function RutaProtegida({ roles, children }) {
    const { usuario } = useAuth();
    const ubicacion = useLocation();

    if (!usuario) {
        return <Navigate to="/login" replace state={{ desde: ubicacion.pathname }} />;
    }

    if (roles && !roles.includes(usuario.rol)) {
        return <Navigate to={usuario.rol === "paciente" ? "/mis-citas" : "/panel"} replace />;
    }

    return children;
}

export default RutaProtegida;