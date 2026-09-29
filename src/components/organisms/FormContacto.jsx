import { useState } from "react";
import CampoFormulario from "../molecules/CampoFormulario.jsx";
import Boton from "../atoms/Boton.jsx";
import {
    validarRequerido,
    validarCorreo,
    validarLargoMinimo,
    sinErrores,
} from "../../utils/validaciones.js";

const formularioVacio = { nombre: "", correo: "", mensaje: "" };

// Organismo: formulario de contacto.
function FormContacto() {
    const [formulario, setFormulario] = useState(formularioVacio);
    const [errores, setErrores] = useState({});
    const [aviso, setAviso] = useState({ texto: "", exito: false });

    function manejarCambio(evento) {
        const { name, value } = evento.target;
        setFormulario({ ...formulario, [name]: value });
    }

    function manejarEnvio(evento) {
        evento.preventDefault();

        const nuevosErrores = {
            nombre: validarRequerido(formulario.nombre, "Ingresa tu nombre."),
            correo: validarCorreo(formulario.correo),
            mensaje: validarLargoMinimo(
                formulario.mensaje, 10,
                "Escribe un mensaje un poco más detallado (mínimo 10 caracteres)."
            ),
        };
        setErrores(nuevosErrores);

        if (sinErrores(nuevosErrores)) {
            setAviso({ texto: "¡Mensaje enviado! Te responderemos a la brevedad.", exito: true });
            setFormulario(formularioVacio);
        } else {
            setAviso({ texto: "Revisa los campos marcados en rojo.", exito: false });
        }
    }

    function manejarLimpiar() {
        setFormulario(formularioVacio);
        setErrores({});
        setAviso({ texto: "", exito: false });
    }

    return (
        <form id="form-contacto" onSubmit={manejarEnvio} noValidate>
            <p id="confirmacion-contacto" role="status" className={aviso.exito ? "exito" : "fallo"}>
                {aviso.texto}
            </p>

            <CampoFormulario id="nombre" etiqueta="Nombre"
                valor={formulario.nombre} error={errores.nombre} onChange={manejarCambio} />

            <CampoFormulario id="correo" etiqueta="Correo electrónico" tipo="email"
                valor={formulario.correo} error={errores.correo} onChange={manejarCambio} />

            <CampoFormulario id="mensaje" etiqueta="Mensaje" tipo="textarea"
                valor={formulario.mensaje} error={errores.mensaje} onChange={manejarCambio} />

            <Boton tipo="submit">Enviar mensaje</Boton>
            <Boton className="btn-limpiar" onClick={manejarLimpiar}>Limpiar</Boton>
        </form>
    );
}

export default FormContacto;