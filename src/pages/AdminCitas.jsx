import { useState } from "react";
import TablaCitas from "../components/organisms/TablaCitas.jsx";
import { useCitas } from "../context/CitasContext.jsx";

function AdminCitas() {
    const { citas, cargando, error, actualizar, eliminar } = useCitas();
    const [aviso, setAviso] = useState("");
    const [procesando, setProcesando] = useState(false);

    async function cambiarEstado(id, estado) {
        if (procesando) return;

        setProcesando(true);
        setAviso("");

        try {
            await actualizar(id, { estado });
            setAviso("Estado de la cita actualizado correctamente.");
        } catch (error) {
            setAviso(`Error: ${error.message}`);
        } finally {
            setProcesando(false);
        }
    }

    async function cancelar(id) {
        if (procesando) return;

        setProcesando(true);
        setAviso("");

        try {
            await eliminar(id);
            setAviso("Cita cancelada correctamente.");
        } catch (error) {
            setAviso(`Error: ${error.message}`);
        } finally {
            setProcesando(false);
        }
    }

    return (
        <>
            <h1>Citas agendadas</h1>
            <p>Confirma las solicitudes nuevas o cambia su estado.</p>

            {cargando && <p>Cargando citas...</p>}
            {error && <p role="alert">Error: {error}</p>}
            {aviso && <p role="status">{aviso}</p>}
            {procesando && <p>Guardando cambios...</p>}

            {!cargando && !error && (
                <TablaCitas
                    citas={citas}
                    onCambiarEstado={cambiarEstado}
                    onEliminar={cancelar}
                />
            )}
        </>
    );
}

export default AdminCitas;
