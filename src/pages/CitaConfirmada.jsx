import { useParams } from "react-router-dom";
import Boton from "../components/atoms/Boton.jsx";
import ResumenCita from "../components/molecules/ResumenCita.jsx";
import { useCitas } from "../context/CitasContext.jsx";

// Pantalla de éxito: /agenda/confirmada/:id
function CitaConfirmada() {
    const { id } = useParams();
    const { obtener } = useCitas();
    const cita = obtener(Number(id));

    if (!cita) {
        return (
            <>
                <section>
                    <h1>No encontramos esa cita</h1>
                    <p>Puede que haya sido eliminada o que el enlace esté incorrecto.</p>
                </section>
                <section>
                    <Boton to="/agenda">Agendar una hora</Boton>
                </section>
            </>
        );
    }

    return (
        <>
            <section>
                <h1>¡Tu hora quedó agendada!</h1>
                <p>
                    Recibimos tu solicitud, {cita.nombre}. La secretaría confirmará tu cita
                    y te avisará al correo {cita.correo}.
                </p>
            </section>

            <section>
                <ResumenCita cita={cita} />
                <Boton to="/mis-citas">Ver mis citas</Boton>
                {" "}
                <Boton to="/">Volver al inicio</Boton>
            </section>
        </>
    );
}

export default CitaConfirmada;