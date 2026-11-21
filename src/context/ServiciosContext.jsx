import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import * as servicioService from "../services/servicioService.js";

const ServiciosContext = createContext(null);

export function ServiciosProvider({ children }) {
    const [servicios, setServicios] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    async function recargar() {
        try {
            setError("");
            const datos = await servicioService.listarServicios();
            setServicios(datos);
        } catch (error) {
            setError(error.message);
        } finally {
            setCargando(false);
        }
    }

    useEffect(() => {
        recargar();
    }, []);

    async function crear(datos) {
        const nuevo = await servicioService.crearServicio(datos);
        await recargar();
        return nuevo;
    }

    async function actualizar(id, cambios) {
        const actualizado = await servicioService.actualizarServicio(id, cambios);
        await recargar();
        return actualizado;
    }

    async function eliminar(id) {
        await servicioService.eliminarServicio(id);
        await recargar();
    }

    function obtener(id) {
        return servicios.find(s => s.id === String(id)) ?? null;
    }

    return (
        <ServiciosContext.Provider
            value={{
                servicios,
                cargando,
                error,
                crear,
                actualizar,
                eliminar,
                obtener,
                recargar
            }}
        >
            {children}
        </ServiciosContext.Provider>
    );
}

export function useServicios() {
    const contexto = useContext(ServiciosContext);

    if (!contexto) {
        throw new Error("useServicios debe usarse dentro de ServiciosProvider");
    }

    return contexto;
}
