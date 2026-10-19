import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CampoFormulario from "../molecules/CampoFormulario.jsx";
import Boton from "../atoms/Boton.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import {
    validarRequerido,
    validarCorreo,
    validarClave,
    validarCoincidencia,
    sinErrores,
} from "../../utils/validaciones.js";

const formularioVacio = { nombre: "", correo: "", clave: "", repetirClave: "" };

// Organismo: formulario para que un paciente cree su cuenta.
// Usa el id "form-login" para heredar los mismos estilos que el formulario de ingreso.
function FormRegistro() {
    const [formulario, setFormulario] = useState(formularioVacio);
    const [errores, setErrores] = useState({});
    const [mensaje, setMensaje] = useState("");

    const { registrar } = useAuth();
    const navegar = useNavigate();

    function manejarCambio(evento) {
        const { name, value } = evento.target;
        setFormulario({ ...formulario, [name]: value });
    }

    function manejarEnvio(evento) {
        evento.preventDefault();

        const nuevosErrores = {
            nombre: validarRequerido(formulario.nombre, "Ingresa tu nombre completo."),
            correo: validarCorreo(formulario.correo),
            clave: validarClave(formulario.clave),
            repetirClave: validarCoincidencia(
                formulario.clave,
                formulario.repetirClave,
                "Las contraseñas no coinciden."
            ),
        };
        setErrores(nuevosErrores);

        if (!sinErrores(nuevosErrores)) {
            setMensaje("Revisa los campos marcados en rojo.");
            return;
        }

        // registrar devuelve "" si salió bien, o el motivo del error (ej: correo repetido)
        const error = registrar(formulario);
        if (error) {
            setMensaje(error);
            return;
        }
        navegar("/mis-citas", { replace: true });
    }

    return (
        <form id="form-login" onSubmit={manejarEnvio} noValidate>
            <p id="mensaje-login" role="alert">{mensaje}</p>

            <CampoFormulario id="nombre" etiqueta="Nombre completo" autoComplete="name"
                valor={formulario.nombre} error={errores.nombre} onChange={manejarCambio} />

            <CampoFormulario id="correo" etiqueta="Correo electrónico" tipo="email" autoComplete="username"
                valor={formulario.correo} error={errores.correo} onChange={manejarCambio} />

            <CampoFormulario id="clave" etiqueta="Contraseña" tipo="password" autoComplete="new-password"
                valor={formulario.clave} error={errores.clave} onChange={manejarCambio} />

            <CampoFormulario id="repetirClave" etiqueta="Repite la contraseña" tipo="password"
                autoComplete="new-password"
                valor={formulario.repetirClave} error={errores.repetirClave} onChange={manejarCambio} />

            <Boton tipo="submit">Crear cuenta</Boton>
        </form>
    );
}

export default FormRegistro;