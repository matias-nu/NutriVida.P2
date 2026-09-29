import { Link } from "react-router-dom";

// Átomo: botón básico.
// - Si recibe "to", se dibuja como un link de navegación (ej: "Agendar consulta").
// - Si no, es un <button> normal (ej: enviar o limpiar un formulario).
function Boton({ to, tipo = "button", onClick, className = "", children }) {
    if (to) {
        return (
            <Link to={to} className={className}>
                {children}
            </Link>
        );
    }

    return (
        <button type={tipo} onClick={onClick} className={className}>
            {children}
        </button>
    );
}

export default Boton;