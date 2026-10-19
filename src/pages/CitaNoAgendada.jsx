import { useLocation } from "react-router-dom";
import Boton from "../components/atoms/Boton.jsx";

function CitaNoAgendada() {
    const ubicacion = useLocation();
    const motivo = ubicacion.state?.motivo ?? "No pudimos agendar tu hora.";

    return (
        <>
            <section>
                <h1>No pudimos agendar tu hora</h1>
                <p role="alert">{motivo}</p>
            </section>

            <section>
                <Boton to="/agenda">Volver a intentar</Boton>
                {" "}
                <Boton to="/servicios">Ver servicios</Boton>
            </section>
        </>
    );
}

export default CitaNoAgendada;