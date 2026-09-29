import { useAuth } from "../context/AuthContext.jsx";

// Página privada: solo se ve con sesión iniciada (ver RutaProtegida en App.jsx).
// En la próxima entrega aquí irá la lista de horas agendadas.
function Panel() {
    const { usuario } = useAuth();

    return (
        <>
            <section>
                <h1>Hola, {usuario.nombre}</h1>
                <p>
                    Iniciaste sesión como <strong>{usuario.rol}</strong> ({usuario.correo}).
                </p>
            </section>

            <section>
                <h2>Horas agendadas</h2>
                <p>Todavía no hay horas registradas en el sistema.</p>
            </section>
        </>
    );
}

export default Panel;