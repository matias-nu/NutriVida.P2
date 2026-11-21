import { peticion } from "./api.js";

function adaptarServicio(servicio) {
    return {
        ...servicio,
        id: String(servicio.id),
        titulo: servicio.nombre,
        tipo: "Consulta",
        modalidad: "Presencial",
        profesional: "Nutricionista",
        duracion: servicio.duracion_minutos
            ? `${servicio.duracion_minutos} min`
            : null,
        precio: Number(servicio.precio)
    };
}

export async function listarServicios() {
    const datos = await peticion("/servicios");
    return datos.map(adaptarServicio);
}

export async function obtenerServicio(id) {
    const servicios = await listarServicios();
    return servicios.find(s => s.id === String(id)) ?? null;
}

export async function crearServicio(datos) {
    const respuesta = await peticion("/servicios", {
        method: "POST",
        body: JSON.stringify({
            nombre: datos.titulo,
            descripcion: datos.descripcion,
            precio: Number(datos.precio),
            duracion_minutos: parseInt(datos.duracion, 10) || 60
        })
    });

    return respuesta;
}

export async function actualizarServicio(id, datos) {
    return peticion(`/servicios/${id}`, {
        method: "PUT",
        body: JSON.stringify({
            nombre: datos.titulo,
            descripcion: datos.descripcion,
            precio: Number(datos.precio),
            duracion_minutos: parseInt(datos.duracion, 10) || 60
        })
    });
}

export async function eliminarServicio(id) {
    return peticion(`/servicios/${id}`, {
        method: "DELETE"
    });
}
