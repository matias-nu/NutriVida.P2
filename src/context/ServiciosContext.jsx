import { createContext, useContext, useState } from "react";
import * as servicioService from "../services/servicioService.js";

// Contexto: una "caja compartida" con el catálogo. Cualquier componente puede abrirla
// y todos ven la misma lista, sin pasar props de uno en uno.
const ServiciosContext = createContext(null);

export function ServiciosProvider({ children }) {
    // La función () => ... hace que el catálogo se lea del service solo la primera vez.
    const [servicios, setServicios] = useState(() => servicioService.listarServicios());

    // Cada función: 1) pide el cambio al service (que lo guarda) y 2) vuelve a leer la lista.
    // Al cambiar el estado, React redibuja y todas las pantallas muestran la lista nueva.
    function recargar() {
        setServicios(servicioService.listarServicios());
    }

    function crear(datos) {
        const nuevo = servicioService.crearServicio(datos);
        recargar();
        return nuevo;
    }

    function actualizar(id, cambios) {
        const actualizado = servicioService.actualizarServicio(id, cambios);
        recargar();
        return actualizado;
    }

    function eliminar(id) {
        servicioService.eliminarServicio(id);
        recargar();
    }

    // Busca un servicio en la lista que ya está en memoria (la usa la página de detalle).
    function obtener(id) {
        return servicios.find((servicio) => servicio.id === id) ?? null;
    }

    return (
        <ServiciosContext.Provider value={{ servicios, crear, actualizar, eliminar, obtener }}>
            {children}
        </ServiciosContext.Provider>
    );
}

// Atajo para usar el contexto: const { servicios, crear } = useServicios();
export function useServicios() {
    const contexto = useContext(ServiciosContext);
    if (!contexto) {
        throw new Error("useServicios debe usarse dentro de un ServiciosProvider");
    }
    return contexto;
}
