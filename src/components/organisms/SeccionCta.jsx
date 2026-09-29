import Boton from "../atoms/Boton.jsx";

// Organismo: sección final de "llamado a la acción" que se repite en varias páginas.
function SeccionCta({ titulo, texto, textoBoton = "Agendar consulta", destino = "/agenda" }) {
    return (
        <section>
            <h2>{titulo}</h2>
            <p>{texto}</p>
            <Boton to={destino}>{textoBoton}</Boton>
        </section>
    );
}

export default SeccionCta;