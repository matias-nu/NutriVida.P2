import { useState } from "react";
import CampoFormulario from "../molecules/CampoFormulario.jsx";
import Boton from "../atoms/Boton.jsx";
import { validarRequerido, validarLargoMinimo, validarPrecio, sinErrores } from "../../utils/validaciones.js";

const tipos = ["Consulta", "Plan especializado", "Evaluación", "Taller grupal"];
const modalidades = ["Presencial", "Online (video)", "Presencial (grupo)"];

const opcionesTipo = tipos.map((t) => ({ valor: t, texto: t }));
const opcionesModalidad = modalidades.map((m) => ({ valor: m, texto: m }));

const formularioVacio = {
    titulo: "",
    tipo: "Consulta",
    descripcion: "",
    modalidad: "Presencial",
    duracion: "",
    profesional: "Nutricionista",
    precio: "",
};

function FormServicio({ servicio, onGuardar, onCancelar }) {
    const [formulario, setFormulario] = useState(
        servicio ? { ...formularioVacio, ...servicio, precio: String(servicio.precio) } : formularioVacio
    );
    const [errores, setErrores] = useState({});

    function manejarCambio(evento) {
        const { name, value } = evento.target;
        setFormulario({ ...formulario, [name]: value });
    }

    function manejarEnvio(evento) {
        evento.preventDefault();

        const nuevosErrores = {
            titulo: validarRequerido(formulario.titulo, "Ingresa el nombre del servicio."),
            descripcion: validarLargoMinimo(formulario.descripcion, 10, "La descripción necesita al menos 10 caracteres."),
            profesional: validarRequerido(formulario.profesional, "Ingresa el profesional a cargo."),
            precio: validarPrecio(formulario.precio),
        };
        setErrores(nuevosErrores);

        if (sinErrores(nuevosErrores)) {
            onGuardar({
                ...formulario,
                titulo: formulario.titulo.trim(),
                descripcion: formulario.descripcion.trim(),
                precio: Number(formulario.precio),
                duracion: formulario.duracion.trim() === "" ? null : formulario.duracion.trim(),
            });
        }
    }

    return (
        <form className="form-admin" onSubmit={manejarEnvio} noValidate>
            <h2>{servicio ? "Editar servicio" : "Nuevo servicio"}</h2>

            <CampoFormulario id="titulo" etiqueta="Nombre" valor={formulario.titulo}
                error={errores.titulo} onChange={manejarCambio} />

            <CampoFormulario id="tipo" etiqueta="Tipo" tipo="select" opciones={opcionesTipo}
                valor={formulario.tipo} onChange={manejarCambio} />

            <CampoFormulario id="descripcion" etiqueta="Descripción" tipo="textarea"
                valor={formulario.descripcion} error={errores.descripcion} onChange={manejarCambio} />

            <CampoFormulario id="modalidad" etiqueta="Modalidad" tipo="select" opciones={opcionesModalidad}
                valor={formulario.modalidad} onChange={manejarCambio} />

            <CampoFormulario id="duracion" etiqueta="Duración (opcional, ej: 30 min)"
                valor={formulario.duracion ?? ""} onChange={manejarCambio} />

            <CampoFormulario id="profesional" etiqueta="Profesional" valor={formulario.profesional}
                error={errores.profesional} onChange={manejarCambio} />

            <CampoFormulario id="precio" etiqueta="Precio (CLP)" tipo="number" min="1"
                valor={formulario.precio} error={errores.precio} onChange={manejarCambio} />

            <Boton tipo="submit">Guardar</Boton>
            <Boton onClick={onCancelar}>Cancelar</Boton>
        </form>
    );
}

export default FormServicio;