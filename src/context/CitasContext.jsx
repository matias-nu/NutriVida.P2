import {
    createContext,
    useContext,
    useCallback,
    useEffect,
    useState
} from "react";

import * as citaService from "../services/citaService.js";
import { useAuth } from "./AuthContext.jsx";

const CitasContext = createContext(null);

export function CitasProvider({ children }) {
    const { usuario } = useAuth();

    const [citas, setCitas] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");

    const recargar = useCallback(async () => {
        if (!usuario) {
            setCitas([]);
            setError("");
            return;
        }

        setCargando(true);

        try {
            const datos = await citaService.listarCitas();
            setCitas(datos);
            setError("");
        } catch (error) {
            setError(error.message);
            setCitas([]);
        } finally {
            setCargando(false);
        }
    }, [usuario]);

    useEffect(() => {
        recargar();
    }, [recargar]);

    async function agendar(datos) {
        const nueva = await citaService.crearCita(datos);
        await recargar();
        return nueva;
    }

    async function actualizar(id, cambios) {
        const respuesta = await citaService.actualizarCita(id, cambios);
        await recargar();
        return respuesta;
    }

    async function eliminar(id) {
        const respuesta = await citaService.eliminarCita(id);
        await recargar();
        return respuesta;
    }

    function obtener(id) {
        return citas.find(cita => cita.id === Number(id)) ?? null;
    }

    function citasDe() {
        return citas;
    }

    return (
        <CitasContext.Provider
            value={{
                citas,
                cargando,
                error,
                recargar,
                agendar,
                actualizar,
                eliminar,
                obtener,
                citasDe
            }}
        >
            {children}
        </CitasContext.Provider>
    );
}

export function useCitas() {
    const contexto = useContext(CitasContext);

    if (!contexto) {
        throw new Error("useCitas debe usarse dentro de CitasProvider");
    }

    return contexto;
}
