import Avatar from "../atoms/Avatar.jsx";

// Molécula: tarjeta de un nutricionista = Avatar (átomo) + nombre + especialidad.
function TarjetaEquipo({ nombre, especialidad, foto }) {
    return (
        <article>
            <Avatar src={foto} alt={nombre} />
            <h3>{nombre}</h3>
            <p>Nutricionista — {especialidad}</p>
        </article>
    );
}

export default TarjetaEquipo;