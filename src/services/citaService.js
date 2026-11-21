import { peticion } from "./api.js";

const estados = {
    Pendiente: "pendiente",
    Confirmada: "confirmada",
    Cancelada: "cancelada",
    Completada: "completada"
};

function adaptarCita(cita) {
    const fechaHora = String(cita.fecha_hora || "");
    const fecha = fechaHora.slice(0, 10);
    const hora = fechaHora.slice(11, 16);

    return {
        ...cita,
        id: Number(cita.id),
        servicioId: String(cita.servicio_id),
        nutricionistaId: String(cita.nutricionista_id),
        servicio: cita.servicio || cita.servicio_nombre || "",
        nutricionista: cita.nutricionista || cita.nutricionista_nombre || "",
        nombre: cita.paciente || cita.paciente_nombre || "",
        correo: cita.correo || "",
        fecha,
        hora,
        motivo: cita.observaciones || "",
        estado: estados[cita.estado] || "pendiente"
    };
}

export async function listarCitas() {
    const datos = await peticion("/citas");
    return datos.map(adaptarCita);
}

export async function crearCita(datos) {
    const respuesta = await peticion("/citas", {
        method: "POST",
        body: JSON.stringify({
            servicio_id: Number(datos.servicioId),
            nutricionista_id: Number(datos.nutricionistaId),
            fecha_hora: `${datos.fecha}T${datos.hora}:00`,
            observaciones: datos.motivo || ""
        })
    });

    return adaptarCita(respuesta.cita || respuesta);
}

export async function actualizarCita(id, cambios) {
    const nombres = {
        confirmada: "Confirmada",
        cancelada: "Cancelada",
        completada: "Completada"
    };

    const estado = nombres[cambios.estado];

    if (!estado) {
        throw new Error("Estado de cita no permitido");
    }

    return peticion(`/citas/${id}/estado`, {
        method: "PATCH",
        body: JSON.stringify({ estado })
    });
}

export async function eliminarCita(id) {
    return actualizarCita(id, { estado: "cancelada" });
}
