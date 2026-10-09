import { useParams } from "react-router-dom";
import Boton from "../components/atoms/Boton.jsx";
import Precio from "../components/atoms/Precio.jsx";
import EtiquetaModalidad from "../components/atoms/EtiquetaModalidad.jsx";
import SeccionCta from "../components/organisms/SeccionCta.jsx";
import { useServicios } from "../context/ServiciosContext.jsx";

// Página de detalle: la dirección es /servicios/:id y useParams lee ese id de la URL.
function DetalleServicio() {
    const { id } = useParams();
    const { obtener } = useServicios();
    const servicio = obtener(id);

    // Si el id de la URL no existe en el catálogo, avisamos en vez de mostrar una página rota
    if (!servicio) {
        return (
            <section>
                <h1>Servicio no encontrado</h1>
                <p>El servicio que buscas no existe o fue eliminado del catálogo.</p>
                <Boton to="/servicios">Volver a servicios</Boton>
            </section>
        );
    }

    return (
        <>
            <section>
                <h1>{servicio.titulo}</h1>
                <p>{servicio.descripcion}</p>
            </section>

            <section id="detalle-servicio">
                <h2>Detalles del servicio</h2>
                <dl>
                    <dt>Tipo</dt>
                    <dd>{servicio.tipo}</dd>

                    <dt>Modalidad</dt>
                    <dd>
                        <EtiquetaModalidad modalidad={servicio.modalidad} />
                    </dd>

                    {/* Los planes no tienen duración fija: solo se muestra si existe */}
                    {servicio.duracion && (
                        <>
                            <dt>Duración</dt>
                            <dd>{servicio.duracion}</dd>
                        </>
                    )}

                    <dt>Profesional</dt>
                    <dd>{servicio.profesional}</dd>

                    <dt>Precio</dt>
                    <dd>
                        <Precio valor={servicio.precio} />
                    </dd>
                </dl>
                <Boton to="/servicios">Volver a servicios</Boton>
            </section>

            <SeccionCta
                titulo="¿Te interesa este servicio?"
                texto="Agenda una hora y te ayudamos a elegir el mejor momento."
            />
        </>
    );
}

export default DetalleServicio;
 