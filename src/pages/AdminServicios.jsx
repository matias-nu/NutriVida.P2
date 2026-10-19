import { useState } from "react";
import TablaServicios from "../components/organisms/TablaServicios.jsx";
import FormServicio from "../components/organisms/FormServicio.jsx";
import Boton from "../components/atoms/Boton.jsx";
import { useServicios } from "../context/ServiciosContext.jsx";


function AdminServicios() {
    const { servicios, crear, actualizar, eliminar } = useServicios();

    const [formulario, setFormulario] = useState(null);
    const [aviso, setAviso] = useState("");

    function guardar(datos) {
        if (formulario === "nuevo") {
            crear(datos);
            setAviso(`Servicio "${datos.titulo}" creado.`);
        } else {
            actualizar(formulario.id, datos);
            setAviso(`Servicio "${datos.titulo}" actualizado.`);
        }
        setFormulario(null);
    }

    function borrar(id) {
        eliminar(id);
        setAviso("Servicio eliminado.");
    }

    return (
        <>
            <h1>Servicios</h1>
            <p role="status" className="aviso-admin">{aviso}</p>

            {formulario ? (
                <FormServicio
                    key={formulario === "nuevo" ? "nuevo" : formulario.id}
                    servicio={formulario === "nuevo" ? null : formulario}
                    onGuardar={guardar}
                    onCancelar={() => setFormulario(null)}
                />
            ) : (
                <>
                    <Boton onClick={() => { setAviso(""); setFormulario("nuevo"); }}>Nuevo servicio</Boton>
                    <TablaServicios
                        servicios={servicios}
                        onEditar={(servicio) => { setAviso(""); setFormulario(servicio); }}
                        onEliminar={borrar}
                    />
                </>
            )}
        </>
    );
}

export default AdminServicios;