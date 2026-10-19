import TablaCitas from "../components/organisms/TablaCitas.jsx";
import { useCitas } from "../context/CitasContext.jsx";

function AdminCitas() {
    const { citas, actualizar, eliminar } = useCitas();

    return (
        <>
            <h1>Citas agendadas</h1>
            <p>Confirma las solicitudes nuevas o cambia su estado.</p>
            <TablaCitas
                citas={citas}
                onCambiarEstado={(id, estado) => actualizar(id, { estado })}
                onEliminar={eliminar}
            />
        </>
    );
}

export default AdminCitas;