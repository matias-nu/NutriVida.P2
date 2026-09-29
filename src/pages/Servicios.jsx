import Tarjeta from "../components/molecules/Tarjeta.jsx";
import SeccionCta from "../components/organisms/SeccionCta.jsx";
import { consultas, planes } from "../data/servicios.js";

function Servicios() {
    return (
        <>
            <section>
                <h1>Nuestros servicios</h1>
                <p>
                    Conoce en detalle las consultas y planes que ofrecemos
                    para acompañarte en tu proceso de alimentación saludable.
                </p>
            </section>

            <section>
                <h2>Consultas</h2>
                {consultas.map((item) => (
                    <Tarjeta key={item.id} titulo={item.titulo} descripcion={item.descripcion} />
                ))}
            </section>

            <section>
                <h2>Planes personalizados</h2>
                {planes.map((item) => (
                    <Tarjeta key={item.id} titulo={item.titulo} descripcion={item.descripcion} />
                ))}
            </section>

            <SeccionCta
                titulo="¿Tienes dudas sobre qué plan elegir?"
                texto="Agenda una hora y te ayudamos a decidir según tu objetivo."
            />
        </>
    );
}

export default Servicios;