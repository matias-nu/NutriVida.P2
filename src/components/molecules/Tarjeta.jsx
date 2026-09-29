import Precio from "../atoms/Precio.jsx";
import EtiquetaModalidad from "../atoms/EtiquetaModalidad.jsx";

// Molécula: tarjeta con título y descripción (servicios y planes).
// precio y modalidad son opcionales, para no romper los usos que no los traen (Inicio.jsx).
function Tarjeta({ titulo, descripcion, precio, modalidad }) {
    return (
        <article className="tarjeta">
            {modalidad && <EtiquetaModalidad modalidad={modalidad} />}
            <h3>{titulo}</h3>
            <p>{descripcion}</p>
            {precio != null && <Precio valor={precio} />}
        </article>
    );
}

export default Tarjeta;