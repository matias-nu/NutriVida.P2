import ListaServicios from "../components/organisms/ListaServicios.jsx";
import SeccionCta from "../components/organisms/SeccionCta.jsx";
import { useServicios } from "../context/ServiciosContext.jsx";

function Servicios() {
    // El catálogo viene del context (que lo lee del service), no de un archivo escrito aquí.
    const { servicios } = useServicios();

    return (
        <>
            <section>
                <h1>Nuestros servicios</h1>
                <p>
                    Conoce en detalle las consultas y planes que ofrecemos
                    para acompañarte en tu proceso de alimentación saludable.
                </p>
            </section>

            <section id="catalogo">
                <ListaServicios servicios={servicios} />
            </section>

            <SeccionCta
                titulo="¿Tienes dudas sobre qué plan elegir?"
                texto="Agenda una hora y te ayudamos a decidir según tu objetivo."
            />
        </>
    );
}

export default Servicios;
 