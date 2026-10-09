import { normalizarTexto } from "./texto.js";


export function obtenerTipos(servicios) {
    return [...new Set(servicios.map((servicio) => servicio.tipo))];
}

// Deja solo los servicios que cumplen el tipo elegido Y el texto buscado.
// tipo "Todos" o texto vacío significa sin ese filtro
export function filtrarServicios(servicios, tipo = "Todos", texto = "") {
    const busqueda = normalizarTexto(texto.trim());

    return servicios.filter((servicio) => {
        const coincideTipo = tipo === "Todos" || servicio.tipo === tipo;
        const coincideTexto =
            busqueda === "" ||
            normalizarTexto(servicio.titulo).includes(busqueda) ||
            normalizarTexto(servicio.descripcion).includes(busqueda);

        return coincideTipo && coincideTexto;
    });
}
 