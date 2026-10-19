import { Routes, Route } from "react-router-dom";
import LayoutPrincipal from "./components/templates/LayoutPrincipal.jsx";
import PlantillaAdmin from "./components/templates/PlantillaAdmin.jsx";
import RutaProtegida from "./components/templates/RutaProtegida.jsx";
import Inicio from "./pages/Inicio.jsx";
import Nosotros from "./pages/Nosotros.jsx";
import Servicios from "./pages/Servicios.jsx";
import DetalleServicio from "./pages/DetalleServicio.jsx";
import Agenda from "./pages/Agenda.jsx";
import CitaConfirmada from "./pages/CitaConfirmada.jsx";
import CitaNoAgendada from "./pages/CitaNoAgendada.jsx";
import Contacto from "./pages/Contacto.jsx";
import Login from "./pages/Login.jsx";
import Registro from "./pages/Registro.jsx";
import MisCitas from "./pages/MisCitas.jsx";
import Panel from "./pages/Panel.jsx";
import AdminServicios from "./pages/AdminServicios.jsx";
import AdminCitas from "./pages/AdminCitas.jsx";
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
                <Route path="/agenda/confirmada/:id" element={<CitaConfirmada />} />
                <Route path="/agenda/error" element={<CitaNoAgendada />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Registro />} />

                {/* Solo pacientes: RutaProtegida revisa la sesión y el rol */}
                <Route
                    path="/mis-citas"
                    element={
                        <RutaProtegida roles={["paciente"]}>
                            <MisCitas />
                        </RutaProtegida>
                    }
                />

                {/* Panel de administración: solo personal de la clínica.
                    Las rutas hijas se dibujan dentro de PlantillaAdmin (por el <Outlet />). */}
                <Route
                    path="/panel"
                    element={
                        <RutaProtegida roles={["admin", "secretaria"]}>
                            <PlantillaAdmin />
                        </RutaProtegida>
                    }
                >
                    <Route index element={<Panel />} />
                    <Route path="citas" element={<AdminCitas />} />
                    <Route
                        path="servicios"
                        element={
                            <RutaProtegida roles={["admin"]}>
                                <AdminServicios />
                            </RutaProtegida>
                        }
                    />
                </Route>

                <Route path="*" element={<NoEncontrada />} />
            </Route>
        </Routes>
    );
}

export default App;