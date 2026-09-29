import { useState } from "react";
import CampoFormulario from "../molecules/CampoFormulario.jsx";
import Boton from "../atoms/Boton.jsx";
import { equipo } from "../../data/equipo.js";
import {
    validarRequerido,
    validarCorreo,
    validarTelefono,
    validarLargoMinimo,
    sinErrores,
} from "../../utils/validaciones.js";

// Valores iniciales del formulario (se usan también para "Limpiar")
const formularioVacio = {
    nombre: "",
    correo: "",
    telefono: "",
    nutricionista: "",
    fecha: "",
    motivo: "",
};

// Fecha de hoy en formato AAAA-MM-DD (para no permitir fechas pasadas)
function fechaHoy() {
    const hoy = new Date();
    const mes = String(hoy.getMonth() + 1).padStart(2, "0");
    const dia = String(hoy.getDate()).padStart(2, "0");
    return `${hoy.getFullYear()}-${mes}-${dia}`;
}

// Organismo: formulario completo para solicitar una hora.
function FormAgenda() {
    const [formulario, setFormulario] = useState(formularioVacio);
    const [errores, setErrores] = useState({});
    const [mensaje, setMensaje] = useState({ texto: "", exito: false });

    // Un solo manejador para todos los campos: usa el "name" del input
    function manejarCambio(evento) {
        const { name, value } = evento.target;
        setFormulario({ ...formulario, [name]: value });
    }

    function validar(datos) {
        let errorFecha = validarRequerido(datos.fecha, "Selecciona una fecha.");
        if (!errorFecha && datos.fecha < fechaHoy()) {
            errorFecha = "La fecha no puede ser anterior a hoy.";
        }

        return {
            nombre: validarRequerido(datos.nombre, "Ingresa tu nombre completo."),
            correo: validarCorreo(datos.correo),
            telefono: validarTelefono(datos.telefono),
            nutricionista: validarRequerido(datos.nutricionista, "Selecciona un profesional."),
            fecha: errorFecha,
            motivo: validarLargoMinimo(datos.motivo, 10, "Cuéntanos un poco más (mínimo 10 caracteres)."),
        };
    }

    function manejarEnvio(evento) {
        evento.preventDefault();
        const nuevosErrores = validar(formulario);
        setErrores(nuevosErrores);

        if (sinErrores(nuevosErrores)) {
            setMensaje({ texto: "¡Solicitud enviada! Te contactaremos para confirmar tu hora.", exito: true });
            setFormulario(formularioVacio);
        } else {
            setMensaje({ texto: "Revisa los campos marcados en rojo.", exito: false });
        }
    }

    function manejarLimpiar() {
        setFormulario(formularioVacio);
        setErrores({});
        setMensaje({ texto: "", exito: false });
    }

    // Opciones del select generadas desde los datos del equipo
    const opcionesNutricionista = [
        { valor: "", texto: "Selecciona un profesional" },
        ...equipo.map((persona) => ({ valor: persona.id, texto: persona.nombre })),
    ];

    return (
        <form id="form-agenda" onSubmit={manejarEnvio} noValidate>
            <p id="confirmacion-agenda" role="status" className={mensaje.exito ? "exito" : "fallo"}>
                {mensaje.texto}
            </p>

            <CampoFormulario id="nombre" etiqueta="Nombre completo"
                valor={formulario.nombre} error={errores.nombre} onChange={manejarCambio} />

            <CampoFormulario id="correo" etiqueta="Correo electrónico" tipo="email"
                valor={formulario.correo} error={errores.correo} onChange={manejarCambio} />

            <CampoFormulario id="telefono" etiqueta="Teléfono de contacto" tipo="tel"
                valor={formulario.telefono} error={errores.telefono} onChange={manejarCambio} />

            <CampoFormulario id="nutricionista" etiqueta="Nutricionista preferido" tipo="select"
                opciones={opcionesNutricionista}
                valor={formulario.nutricionista} error={errores.nutricionista} onChange={manejarCambio} />

            <CampoFormulario id="fecha" etiqueta="Fecha preferida" tipo="date" min={fechaHoy()}
                valor={formulario.fecha} error={errores.fecha} onChange={manejarCambio} />

            <CampoFormulario id="motivo" etiqueta="Motivo de la consulta" tipo="textarea"
                valor={formulario.motivo} error={errores.motivo} onChange={manejarCambio} />

            <Boton tipo="submit">Solicitar hora</Boton>
            <Boton className="btn-limpiar" onClick={manejarLimpiar}>Limpiar formulario</Boton>
        </form>
    );
}

export default FormAgenda;