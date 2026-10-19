import ListaCitasPaciente from "../components/organisms/ListaCitasPaciente.jsx";
import Boton from "../components/atoms/Boton.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useCitas } from "../context/CitasContext.jsx";

// Página privada del paciente: /mis-citas
function MisCitas() {
    const { usuario } = useAuth();
    const { citasDe, actualizar } = useCitas();

    return (
        <>
            <section>
                <h1>Mis citas</h1>
                <p>Hola, {usuario.nombre}. Aquí ves el estado de tus horas agendadas.</p>
            </section>

            <section>
                <ListaCitasPaciente
                    citas={citasDe(usuario.correo)}
                    onCancelar={(id) => actualizar(id, { estado: "cancelada" })}
                />
                <Boton to="/agenda">Agendar otra hora</Boton>
            </section>
        </>
    );
}

export default MisCitas;