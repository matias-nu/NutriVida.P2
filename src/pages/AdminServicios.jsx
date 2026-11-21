import { useState } from "react";
import TablaServicios from "../components/organisms/TablaServicios.jsx";
import FormServicio from "../components/organisms/FormServicio.jsx";
import Boton from "../components/atoms/Boton.jsx";
import { useServicios } from "../context/ServiciosContext.jsx";

function AdminServicios() {
    const {
        servicios,
        cargando,
        error,
        crear,
        actualizar,
        eliminar
    } = useServicios();

    const [formulario, setFormulario] = useState(null);
    const [aviso, setAviso] = useState("");
    const [procesando, setProcesando] = useState(false);

    async function guardar(datos) {
        if (procesando) return;

        setProcesando(true);
        setAviso("");

        try {
            if (formulario === "nuevo") {
                await crear(datos);
                setAviso(`Servicio "${datos.titulo}" creado correctamente.`);
            } else {
                await actualizar(formulario.id, datos);
                setAviso(`Servicio "${datos.titulo}" actualizado correctamente.`);
            }

            setFormulario(null);
        } catch (error) {
            setAviso(`Error: ${error.message}`);
        } finally {
            setProcesando(false);
        }
    }

    async function borrar(id) {
        if (procesando) return;

        if (!window.confirm("¿Seguro que deseas desactivar este servicio?")) {
            return;
        }

        setProcesando(true);
        setAviso("");

        try {
            await eliminar(id);
            setAviso("Servicio desactivado correctamente.");
        } catch (error) {
            setAviso(`Error: ${error.message}`);
        } finally {
            setProcesando(false);
        }
    }

    return (
        <>
            <h1>Administración de servicios</h1>

            {cargando && <p>Cargando servicios...</p>}
            {error && <p role="alert">Error al cargar: {error}</p>}
            {aviso && <p role="status" className="aviso-admin">{aviso}</p>}
            {procesando && <p>Guardando cambios...</p>}

            {formulario ? (
                <FormServicio
                    key={formulario === "nuevo" ? "nuevo" : formulario.id}
                    servicio={formulario === "nuevo" ? null : formulario}
                    onGuardar={guardar}
                    onCancelar={() => setFormulario(null)}
                />
            ) : (
                <>
                    <Boton
                        onClick={() => {
                            setAviso("");
                            setFormulario("nuevo");
                        }}
                    >
                        Nuevo servicio
                    </Boton>

                    <TablaServicios
                        servicios={servicios}
                        onEditar={(servicio) => {
                            setAviso("");
                            setFormulario(servicio);
                        }}
                        onEliminar={borrar}
                    />
                </>
            )}
        </>
    );
}

export default AdminServicios;
