import { useParams } from "react-router-dom";
import Boton from "../components/atoms/Boton.jsx";
import ResumenCita from "../components/molecules/ResumenCita.jsx";
import { useCitas } from "../context/CitasContext.jsx";

function CitaConfirmada() {
    const { id } = useParams();
    const { obtener, cargando, error } = useCitas();

    const cita = obtener(Number(id));

    if (cargando) {
        return (
            <section>
                <h1>Consultando tu reserva...</h1>
                <p>Estamos verificando los datos de tu cita.</p>
            </section>
        );
    }

    if (error) {
        return (
            <section>
                <h1>No pudimos consultar tu reserva</h1>
                <p role="alert">{error}</p>
                <Boton to="/mis-citas">Ver mis citas</Boton>
            </section>
        );
    }

    if (!cita) {
        return (
            <section>
                <h1>No encontramos esa cita</h1>
                <p>Revisa tus reservas para confirmar su estado.</p>
                <Boton to="/mis-citas">Ver mis citas</Boton>
            </section>
        );
    }

    return (
        <>
            <section>
                <h1>¡Tu hora quedó agendada!</h1>
                <p>
                    Tu solicitud fue registrada correctamente.
                    Puedes consultar su estado en Mis citas.
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
