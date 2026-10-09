import { Routes, Route } from "react-router-dom";
import LayoutPrincipal from "./components/templates/LayoutPrincipal.jsx";
import RutaProtegida from "./components/templates/RutaProtegida.jsx";
import Inicio from "./pages/Inicio.jsx";
import Nosotros from "./pages/Nosotros.jsx";
import Servicios from "./pages/Servicios.jsx";
import DetalleServicio from "./pages/DetalleServicio.jsx";
import Agenda from "./pages/Agenda.jsx";
import Contacto from "./pages/Contacto.jsx";
import Login from "./pages/Login.jsx";
import Panel from "./pages/Panel.jsx";
import NoEncontrada from "./pages/NoEncontrada.jsx";

// Todas las rutas van "dentro" de LayoutPrincipal,
// así Navbar y Footer aparecen en todas las páginas.
function App() {
    return (
        <Routes>
            <Route element={<LayoutPrincipal />}>
                <Route path="/" element={<Inicio />} />
                <Route path="/nosotros" element={<Nosotros />} />
                <Route path="/servicios" element={<Servicios />} />
                <Route path="/servicios/:id" element={<DetalleServicio />} />
                <Route path="/agenda" element={<Agenda />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/login" element={<Login />} />

                {/* Página privada: RutaProtegida revisa que haya sesión iniciada */}
                <Route
                    path="/panel"
                    element={
                        <RutaProtegida>
                            <Panel />
                        </RutaProtegida>
                    }
                />

                <Route path="*" element={<NoEncontrada />} />
            </Route>
        </Routes>
    );
}

export default App;
 