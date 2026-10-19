import { createContext, useContext, useState } from "react";
import * as citaService from "../services/citaService.js";

// Contexto de citas: el agendamiento, "Mis citas" y el panel de administración
// leen la misma lista, así siempre muestran lo mismo.
const CitasContext = createContext(null);

export function CitasProvider({ children }) {
    const [citas, setCitas] = useState(() => citaService.listarCitas());

    function recargar() {
        setCitas(citaService.listarCitas());
    }

    // Si la cita no se puede agendar, el service lanza un Error y el que llamó lo atrapa.
    function agendar(datos) {
        const nueva = citaService.crearCita(datos);
        recargar();
        return nueva;
    }

    function actualizar(id, cambios) {
        citaService.actualizarCita(id, cambios);
        recargar();
    }

    function eliminar(id) {
        citaService.eliminarCita(id);
        recargar();
    }

    function obtener(id) {
        return citas.find((cita) => cita.id === id) ?? null;
    }

    function citasDe(correo) {
        return citas.filter((cita) => cita.correo === correo.trim().toLowerCase());
    }

    return (
        <CitasContext.Provider value={{ citas, agendar, actualizar, eliminar, obtener, citasDe }}>
            {children}
        </CitasContext.Provider>
    );
}

// Atajo: const { citas, agendar } = useCitas();
export function useCitas() {
    const contexto = useContext(CitasContext);
    if (!contexto) {
        throw new Error("useCitas debe usarse dentro de un CitasProvider");
    }
    return contexto;
}