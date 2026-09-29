// Molécula: tarjeta con título y descripción (servicios y planes).
function Tarjeta({ titulo, descripcion }) {
    return (
        <article>
            <h3>{titulo}</h3>
            <p>{descripcion}</p>
        </article>
    );
}

export default Tarjeta;