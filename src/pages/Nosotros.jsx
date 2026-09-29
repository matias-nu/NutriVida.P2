import TarjetaEquipo from "../components/molecules/TarjetaEquipo.jsx";
import SeccionCta from "../components/organisms/SeccionCta.jsx";
import { equipo } from "../data/equipo.js";

function Nosotros() {
    return (
        <>
            <section>
                <h1>Sobre NutriVida</h1>
                <p>
                    Somos una clínica nutricional de Temuco, dedicada desde 2016
                    a acompañar a nuestros pacientes en un cambio de hábitos
                    real y sostenible, sin dietas genéricas.
                </p>
            </section>

            <section>
                <h2>Nuestra misión</h2>
                <p>
                    Entregar orientación nutricional personalizada, basada en
                    evidencia, que se adapte a la vida real de cada paciente
                    y no al revés.
                </p>
            </section>

            <section id="equipo">
                <h2>Nuestro equipo</h2>
                {equipo.map((persona) => (
                    <TarjetaEquipo
                        key={persona.id}
                        nombre={persona.nombre}
                        especialidad={persona.especialidad}
                        foto={persona.foto}
                    />
                ))}
            </section>

            <SeccionCta
                titulo="¿Quieres conocernos en persona?"
                texto="Agenda tu primera consulta y cuéntanos tu objetivo."
            />
        </>
    );
}

export default Nosotros;