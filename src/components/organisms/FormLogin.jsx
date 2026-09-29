import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CampoFormulario from "../molecules/CampoFormulario.jsx";
import Boton from "../atoms/Boton.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { validarCorreo, validarRequerido, sinErrores } from "../../utils/validaciones.js";

const formularioVacio = { correo: "", clave: "" };

// Organismo: formulario de inicio de sesión.
function FormLogin() {
    const [formulario, setFormulario] = useState(formularioVacio);
    const [errores, setErrores] = useState({});
    const [mensaje, setMensaje] = useState("");

    const { iniciarSesion } = useAuth();
    const navegar = useNavigate();
    const ubicacion = useLocation();

    // Si llegó aquí porque intentó entrar a una página protegida, lo devolvemos allá
    const destino = ubicacion.state?.desde || "/panel";

    function manejarCambio(evento) {
        const { name, value } = evento.target;
        setFormulario({ ...formulario, [name]: value });
    }

    function manejarEnvio(evento) {
        evento.preventDefault();

        const nuevosErrores = {
            correo: validarCorreo(formulario.correo),
            clave: validarRequerido(formulario.clave, "Ingresa tu contraseña."),
        };
        setErrores(nuevosErrores);

        if (!sinErrores(nuevosErrores)) {
            setMensaje("Revisa los campos marcados en rojo.");
            return;
        }

        const correcto = iniciarSesion(formulario.correo, formulario.clave);

        if (correcto) {
            navegar(destino, { replace: true });
        } else {
            setMensaje("Correo o contraseña incorrectos.");
            setFormulario({ ...formulario, clave: "" });
        }
    }

    return (
        <form id="form-login" onSubmit={manejarEnvio} noValidate>
            <p id="mensaje-login" role="alert">{mensaje}</p>

            <CampoFormulario id="correo" etiqueta="Correo electrónico" tipo="email"
                autoComplete="username"
                valor={formulario.correo} error={errores.correo} onChange={manejarCambio} />

            <CampoFormulario id="clave" etiqueta="Contraseña" tipo="password"
                autoComplete="current-password"
                valor={formulario.clave} error={errores.clave} onChange={manejarCambio} />

            <Boton tipo="submit">Iniciar sesión</Boton>
        </form>
    );
}

export default FormLogin;