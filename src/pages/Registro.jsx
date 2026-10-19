import { Navigate } from "react-router-dom";
import FormRegistro from "../components/organisms/FormRegistro.jsx";
import Boton from "../components/atoms/Boton.jsx";
import { useAuth } from "../context/AuthContext.jsx";

function Registro() {
    const { usuario } = useAuth();

    // Si ya tiene sesión, no tiene sentido mostrarle el registro
    if (usuario) {
        return <Navigate to="/panel" replace />;
    }

    return (
        <>
            <section>
                <h1>Crea tu cuenta</h1>
                <p>
                    Con tu cuenta de paciente puedes ver tus citas, revisar su estado
                    y cancelarlas cuando lo necesites.
                </p>
            </section>

            <section>
                <FormRegistro />
                <p>¿Ya tienes cuenta?</p>
                <Boton to="/login">Iniciar sesión</Boton>
            </section>
        </>
    );
}

export default Registro;