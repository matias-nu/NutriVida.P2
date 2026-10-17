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
            <section style={{ textAlign: 'center', padding: '40px' }}>
                <h1>Servicio no encontrado</h1>
                <p>El servicio que buscas no existe o fue eliminado del catálogo.</p>
                <Boton to="/servicios">Volver a servicios</Boton>
            </section>
        );
    }

    return (
        <>
            <section style={{ textAlign: 'center', padding: '20px' }}>
                <h1>{servicio.titulo}</h1>
                <p style={{ maxWidth: '600px', margin: '0 auto' }}>{servicio.descripcion}</p>
            </section>

            <section id="detalle-servicio" style={{ maxWidth: '600px', margin: '20px auto', padding: '20px', background: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Detalles del servicio</h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                        <strong>Tipo</strong>
                        <span>{servicio.tipo}</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '10px', alignItems: 'center' }}>
                        <strong>Modalidad</strong>
                        <span><EtiquetaModalidad modalidad={servicio.modalidad} /></span>
                    </div>

                    {servicio.duracion && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                            <strong>Duración</strong>
                            <span>{servicio.duracion}</span>
                        </div>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                        <strong>Profesional</strong>
                        <span>{servicio.profesional}</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '5px', alignItems: 'center' }}>
                        <strong>Precio</strong>
                        <span><Precio valor={servicio.precio} /></span>
                    </div>
                </div>

                <div style={{ textAlign: 'center', marginTop: '25px' }}>
                    <Boton to="/servicios">Volver a servicios</Boton>
                </div>
            </section>

            <SeccionCta
                titulo="¿Te interesa este servicio?"
                texto="Agenda una hora y te ayudamos a elegir el mejor momento."
            />
        </>
    );
}

export default DetalleServicio;  