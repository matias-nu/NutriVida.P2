import { Link } from "react-router-dom";

// Organismo: pie de página.
function Footer() {
    const anio = new Date().getFullYear(); // se actualiza solo cada año

    return (
        <footer>
            <p>&copy; {anio} NutriVida. Todos los derechos reservados.</p>
            <nav>
                <Link to="/contacto">Contacto</Link>
                <a href="#">Instagram</a>
                <a href="#">Facebook</a>
            </nav>
        </footer>
    );
}

export default Footer;