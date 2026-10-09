import Boton from "../atoms/Boton.jsx";
import Precio from "../atoms/Precio.jsx";
import EtiquetaModalidad from "../atoms/EtiquetaModalidad.jsx";

// Molécula: tarjeta con título y descripción (servicios y planes).
// precio, modalidad e id son opcionales, para no romper los usos que no los traen (Inicio.jsx).
// Si recibe "id", agrega un botón que lleva a la página de detalle del servicio.
function Tarjeta({ id, titulo, descripcion, precio, modalidad }) {
    return (
        <article className="tarjeta">
            {modalidad && <EtiquetaModalidad modalidad={modalidad} />}
            <h3>{titulo}</h3>
            <p>{descripcion}</p>
            {(precio != null || id) && (
                <div className="tarjeta-pie">
                    {precio != null && <Precio valor={precio} />}
                    {id && <Boton to={`/servicios/${id}`}>Ver detalle</Boton>}
                </div>
            )}
        </article>
    );
}

export default Tarjeta;
 