import Boton from "../components/atoms/Boton.jsx";
import Tarjeta from "../components/molecules/Tarjeta.jsx";
import SeccionCta from "../components/organisms/SeccionCta.jsx";
import { serviciosDestacados } from "../data/servicios.js";

function Inicio() {
    return (
        <>
            {/* Presentación principal */}
            <section id="hero">
                <div id="hero-texto">
                    <h1>Transforma tu alimentación, transforma tu vida</h1>
                    <p>
                        En NutriVida te ayudamos a mejorar tus hábitos alimenticios
                        mediante una orientación nutricional personalizada.
                    </p>
                    <Boton to="/agenda">Agendar consulta</Boton>
                </div>

                <img src="/img/img1.webp" alt="Plato de comida saludable" />
            </section>

            <section>
                <h2>Bienvenido a NutriVida</h2>
                <p>
                    Somos un espacio dedicado a promover una alimentación
                    equilibrada y un estilo de vida saludable.
                </p>
                <p>
                    Nuestro objetivo es acompañarte en el proceso de alcanzar
                    tus metas de manera saludable y sostenible.
                </p>
            </section>

            {/* Servicios destacados: se generan recorriendo el arreglo con map() */}
            <section>
                <h2>Nuestros servicios</h2>
                {serviciosDestacados.map((servicio) => (
                    <Tarjeta
                        key={servicio.id}
                        titulo={servicio.titulo}
                        descripcion={servicio.descripcion}
                    />
                ))}
            </section>

            <SeccionCta
                titulo="¿Listo para comenzar?"
                texto="Da el primer paso hacia un estilo de vida más saludable."
                textoBoton="Agenda tu consulta"
            />
        </>
    );
}

export default Inicio;