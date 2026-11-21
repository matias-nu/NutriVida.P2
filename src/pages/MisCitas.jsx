import { useState } from "react";
import ListaCitasPaciente from "../components/organisms/ListaCitasPaciente.jsx";
import Boton from "../components/atoms/Boton.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useCitas } from "../context/CitasContext.jsx";

function MisCitas() {
    const { usuario } = useAuth();
    const { citas, cargando, error, actualizar } = useCitas();
    const [aviso, setAviso] = useState("");
    const [procesando, setProcesando] = useState(false);

    async function cancelar(id) {
        if (procesando) return;
        if (!window.confirm("¿Seguro que deseas cancelar esta cita?")) return;

        setProcesando(true);
        setAviso("");

        try {
            await actualizar(id, { estado: "cancelada" });
            setAviso("Tu cita fue cancelada correctamente.");
        } catch (error) {
            setAviso(`Error: ${error.message}`);
        } finally {
            setProcesando(false);
        }
    }

    return (
        <>
            <section>
                <h1>Mis citas</h1>
                <p>Hola, {usuario.nombre}. Aquí puedes revisar tus reservas.</p>
            </section>

            <section>
                {cargando && <p>Cargando tus citas...</p>}
                {error && <p role="alert">Error: {error}</p>}
                {aviso && <p role="status">{aviso}</p>}
                {procesando && <p>Procesando cancelación...</p>}

                {!cargando && !error && (
                    <ListaCitasPaciente
                        citas={citas}
                        onCancelar={cancelar}
                    />
                )}

                <Boton to="/agenda">Agendar otra hora</Boton>
            </section>
        </>
    );
}

export default MisCitas;
