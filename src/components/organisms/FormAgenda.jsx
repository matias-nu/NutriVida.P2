import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CampoFormulario from "../molecules/CampoFormulario.jsx";
import SelectorHorario from "../molecules/SelectorHorario.jsx";
import ResumenCita from "../molecules/ResumenCita.jsx";
import MensajeError from "../atoms/MensajeError.jsx";
import Boton from "../atoms/Boton.jsx";
import { equipo } from "../../data/equipo.js";
import { useServicios } from "../../context/ServiciosContext.jsx";
import { useCitas } from "../../context/CitasContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { fechaHoy } from "../../utils/fechas.js";
import { atiendeEseDia, horasDisponibles } from "../../utils/horarios.js";
import {
    validarRequerido,
    validarCorreo,
    validarTelefono,
    validarLargoMinimo,
    sinErrores,
} from "../../utils/validaciones.js";

const formularioVacio = {
    servicioId: "",
    nutricionistaId: "",
    fecha: "",
    horario: "", // se llama "horario" porque así se llama el campo de SelectorHorario
    nombre: "",
    correo: "",
    telefono: "",
    motivo: "",
};

// Organismo: flujo para agendar una cita en dos pasos:
//   1) formulario  ->  2) resumen para confirmar  ->  pantalla de éxito o de error.
function FormAgenda() {
    const { servicios } = useServicios();
    const { citas, agendar } = useCitas();
    const { usuario } = useAuth();
    const navegar = useNavigate();

    // Si es un paciente con sesión iniciada, se parte con sus datos ya escritos
    const paciente = usuario?.rol === "paciente" ? usuario : null;
    const [formulario, setFormulario] = useState({
        ...formularioVacio,
        nombre: paciente?.nombre ?? "",
        correo: paciente?.correo ?? "",
    });
    const [errores, setErrores] = useState({});
    const [paso, setPaso] = useState("formulario");

    function manejarCambio(evento) {
        const { name, value } = evento.target;
        // Si cambia el nutricionista o la fecha, la hora elegida ya no sirve
        const reiniciaHora = name === "nutricionistaId" || name === "fecha";
        setFormulario({ ...formulario, [name]: value, ...(reiniciaHora ? { horario: "" } : {}) });
    }

    function validar(datos) {
        let errorFecha = validarRequerido(datos.fecha, "Selecciona una fecha.");
        if (!errorFecha && datos.fecha < fechaHoy()) {
            errorFecha = "La fecha no puede ser anterior a hoy.";
        }
        if (!errorFecha && datos.nutricionistaId && !atiendeEseDia(datos.nutricionistaId, datos.fecha)) {
            errorFecha = "Ese profesional no atiende el día elegido. Prueba con otra fecha.";
        }

        return {
            servicioId: validarRequerido(datos.servicioId, "Selecciona un servicio."),
            nutricionistaId: validarRequerido(datos.nutricionistaId, "Selecciona un profesional."),
            fecha: errorFecha,
            horario: validarRequerido(datos.horario, "Selecciona un horario."),
            nombre: validarRequerido(datos.nombre, "Ingresa tu nombre completo."),
            correo: validarCorreo(datos.correo),
            telefono: validarTelefono(datos.telefono),
            motivo: validarLargoMinimo(datos.motivo, 10, "Cuéntanos un poco más (mínimo 10 caracteres)."),
        };
    }

    // Paso 1 -> 2: si todo está bien, se muestra el resumen
    function manejarEnvio(evento) {
        evento.preventDefault();
        const nuevosErrores = validar(formulario);
        setErrores(nuevosErrores);

        if (sinErrores(nuevosErrores)) {
            setPaso("resumen");
        }
    }

    // Junta los datos del formulario con los del servicio y el nutricionista elegidos
    function armarCita() {
        const servicio = servicios.find((s) => s.id === formulario.servicioId);
        const nutricionista = equipo.find((p) => p.id === formulario.nutricionistaId);

        return {
            servicioId: servicio.id,
            servicio: servicio.titulo,
            tipo: servicio.tipo,
            modalidad: servicio.modalidad,
            precio: servicio.precio,
            nutricionistaId: nutricionista.id,
            nutricionista: nutricionista.nombre,
            fecha: formulario.fecha,
            hora: formulario.horario,
            nombre: formulario.nombre.trim(),
            correo: formulario.correo,
            telefono: formulario.telefono,
            motivo: formulario.motivo.trim(),
        };
    }

    // Paso 2: confirmar. Si el service rechaza la cita (hora tomada, regla de la
    // teleconsulta), se muestra la pantalla de error con el motivo.
    function manejarConfirmacion(evento) {
        evento.preventDefault();

        try {
            const nueva = agendar(armarCita());
            navegar(`/agenda/confirmada/${nueva.id}`);
        } catch (error) {
            navegar("/agenda/error", { state: { motivo: error.message } });
        }
    }

    function manejarLimpiar() {
        setFormulario(formularioVacio);
        setErrores({});
    }

    if (paso === "resumen") {
        return (
            <form id="form-agenda" onSubmit={manejarConfirmacion}>
                <h2>Revisa tu cita</h2>
                <ResumenCita cita={armarCita()} />
                <Boton tipo="submit">Confirmar cita</Boton>
                <Boton className="btn-limpiar" onClick={() => setPaso("formulario")}>Volver a editar</Boton>
            </form>
        );
    }

    const opcionesServicio = [
        { valor: "", texto: "Selecciona un servicio" },
        ...servicios.map((servicio) => ({ valor: servicio.id, texto: servicio.titulo })),
    ];

    const opcionesNutricionista = [
        { valor: "", texto: "Selecciona un profesional" },
        ...equipo.map((persona) => ({ valor: persona.id, texto: persona.nombre })),
    ];

    const horas = horasDisponibles(formulario.nutricionistaId, formulario.fecha, citas);

    return (
        <form id="form-agenda" onSubmit={manejarEnvio} noValidate>
            <CampoFormulario id="servicioId" etiqueta="Servicio" tipo="select" opciones={opcionesServicio}
                valor={formulario.servicioId} error={errores.servicioId} onChange={manejarCambio} />

            <CampoFormulario id="nutricionistaId" etiqueta="Nutricionista preferido" tipo="select"
                opciones={opcionesNutricionista}
                valor={formulario.nutricionistaId} error={errores.nutricionistaId} onChange={manejarCambio} />

            <CampoFormulario id="fecha" etiqueta="Fecha preferida" tipo="date" min={fechaHoy()}
                valor={formulario.fecha} error={errores.fecha} onChange={manejarCambio} />

            <div>
                <label htmlFor="horario">Horario disponible</label>
                <SelectorHorario horarios={horas} valor={formulario.horario} alCambiar={manejarCambio} />
                <MensajeError id="error-horario" texto={errores.horario} />
            </div>

            <CampoFormulario id="nombre" etiqueta="Nombre completo"
                valor={formulario.nombre} error={errores.nombre} onChange={manejarCambio} />

            <CampoFormulario id="correo" etiqueta="Correo electrónico" tipo="email"
                valor={formulario.correo} error={errores.correo} onChange={manejarCambio} />

            <CampoFormulario id="telefono" etiqueta="Teléfono de contacto" tipo="tel"
                valor={formulario.telefono} error={errores.telefono} onChange={manejarCambio} />

            <CampoFormulario id="motivo" etiqueta="Motivo de la consulta" tipo="textarea"
                valor={formulario.motivo} error={errores.motivo} onChange={manejarCambio} />

            <Boton tipo="submit">Revisar mi cita</Boton>
            <Boton className="btn-limpiar" onClick={manejarLimpiar}>Limpiar formulario</Boton>
        </form>
    );
}

export default FormAgenda;