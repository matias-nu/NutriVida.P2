import { Navigate } from "react-router-dom";
import FormLogin from "../components/organisms/FormLogin.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import Boton from "../components/atoms/Boton.jsx";

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
                    Ingresa con tus credenciales autorizadas para administrar agendas, 
                    supervisar planes alimenticios y coordinar la atención de tus pacientes de manera eficiente
                </p> 
            </section>

            <section>
                <FormLogin />
                <p>¿Eres paciente y aún no tienes cuenta?</p>
                <Boton to="/registro">Crear cuenta</Boton>
            </section>
        </>
    );
}

export default Login;