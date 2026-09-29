import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../organisms/Navbar.jsx";
import Footer from "../organisms/Footer.jsx";

// Template: esqueleto común de todas las páginas.
// <Outlet /> es el "hueco" donde React Router dibuja la página actual.
function LayoutPrincipal() {
    const { pathname } = useLocation();

    // Al cambiar de página, volver al inicio del scroll
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <>
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

export default LayoutPrincipal;