import { Navigate } from "react-router-dom";
import FormLogin from "../components/organisms/FormLogin.jsx";
import { useAuth } from "../context/AuthContext.jsx";

function Login() {
    const { usuario } = useAuth();

    // Si ya inició sesión, no tiene sentido mostrarle el login
    if (usuario) {
        return <Navigate to="/panel" replace />;
    }

    return (
        <>
            <section>
                <h1>Acceso para el equipo</h1>
                <p>
                    Ingresa con tu correo y contraseña para administrar las
                    horas agendadas de NutriVida.
                </p>
            </section>

            <section>
                <FormLogin />
            </section>
        </>
    );
}

export default Login;