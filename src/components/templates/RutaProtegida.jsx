import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

// Template: "portero" de las páginas privadas.
// Si no hay sesión iniciada, manda al login y recuerda a qué página quería entrar.
function RutaProtegida({ children }) {
    const { usuario } = useAuth();
    const ubicacion = useLocation();

    if (!usuario) {
        return <Navigate to="/login" replace state={{ desde: ubicacion.pathname }} />;
    }

    return children;
}

export default RutaProtegida;