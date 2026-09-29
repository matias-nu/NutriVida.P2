import { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

// Organismo: encabezado con logo y menú hamburguesa.
// El estado "menuAbierto" reemplaza el menu.style.display del antiguo Script.js.
function Navbar() {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const ubicacion = useLocation();
    const navegar = useNavigate();
    const { usuario, cerrarSesion } = useAuth();

    // Al cambiar de página se cierra el menú
    useEffect(() => {
        setMenuAbierto(false);
    }, [ubicacion.pathname]);

    // Al cerrar sesión volvemos a la pantalla de login (como en la mayoría de los sistemas)
    function manejarCerrarSesion() {
        cerrarSesion();
        navegar("/login");
    }

    return (
        <header>
            <nav>
                <Link to="/">NutriVida</Link>

                <button
                    id="menu-btn"
                    onClick={() => setMenuAbierto(!menuAbierto)}
                    aria-expanded={menuAbierto}
                    aria-controls="menu"
                    aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
                >
                    {menuAbierto ? "✕" : "☰"}
                </button>

                <ul id="menu" className={menuAbierto ? "abierto" : ""}>
                    <li><NavLink to="/" end>Inicio</NavLink></li>
                    <li><NavLink to="/nosotros">Nosotros</NavLink></li>
                    <li><NavLink to="/servicios">Servicios</NavLink></li>
                    <li><NavLink to="/agenda">Agenda</NavLink></li>
                    <li><NavLink to="/contacto">Contacto</NavLink></li>

                    {/* Lo que se muestra depende de si hay sesión iniciada */}
                    {usuario ? (
                        <>
                            <li className="separador"><NavLink to="/panel">Panel</NavLink></li>
                            <li>
                                <button className="btn-salir" onClick={manejarCerrarSesion}>
                                    Cerrar sesión
                                </button>
                            </li>
                        </>
                    ) : (
                        <li className="separador"><NavLink to="/login">Ingresar</NavLink></li>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Navbar;