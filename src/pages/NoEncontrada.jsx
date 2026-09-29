import Boton from "../components/atoms/Boton.jsx";

// Se muestra cuando la URL no coincide con ninguna ruta
function NoEncontrada() {
    return (
        <section>
            <h1>Esta página no existe</h1>
            <p>Revisa la dirección o vuelve al inicio para seguir navegando.</p>
            <Boton to="/">Volver al inicio</Boton>
        </section>
    );
}

export default NoEncontrada;