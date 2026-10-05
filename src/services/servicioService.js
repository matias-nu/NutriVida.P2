// servicioService: aquí vive el CRUD (Crear, Leer, Actualizar, Eliminar) del catálogo de servicios.
// Son funciones de JavaScript puro: no usan React, así se pueden probar solas.
import { consultas, planes, evaluaciones, talleresGrupales } from "../data/servicios.js";
import { crearSlug } from "../utils/texto.js";

// Clave del "cajón" de localStorage donde se guarda el catálogo.
const CLAVE = "nutrivida-servicios";

// Catálogo de partida: junta las 4 categorías de data/servicios.js en una sola lista.
const serviciosIniciales = [...consultas, ...planes, ...evaluaciones, ...talleresGrupales];

// Lee el catálogo guardado. La primera vez (no hay nada guardado) guarda el de partida.
function leer() {
    const guardado = localStorage.getItem(CLAVE);

    if (guardado === null) {
        localStorage.setItem(CLAVE, JSON.stringify(serviciosIniciales));
        return [...serviciosIniciales];
    }
    return JSON.parse(guardado);
}

function guardar(lista) {
    localStorage.setItem(CLAVE, JSON.stringify(lista));
}

// Crea un id con el título ("Taller de yoga" -> "taller-de-yoga").
// Si ya existe, le agrega un número al final ("taller-de-yoga-2").
function generarId(titulo, lista) {
    const base = crearSlug(titulo) || "servicio";
    let id = base;
    let numero = 2;

    while (lista.some((servicio) => servicio.id === id)) {
        id = `${base}-${numero}`;
        numero++;
    }
    return id;
}

// READ: todos los servicios.
export function listarServicios() {
    return leer();
}

// READ: un servicio por su id (o null si no existe).
export function obtenerServicio(id) {
    return leer().find((servicio) => servicio.id === id) ?? null;
}

// CREATE: agrega un servicio nuevo. "datos" trae titulo, precio, etc.
export function crearServicio(datos) {
    const lista = leer();
    const nuevo = { ...datos, id: generarId(datos.titulo, lista) };

    guardar([...lista, nuevo]);
    return nuevo;
}

// UPDATE: cambia solo los campos indicados. El id nunca se modifica.
export function actualizarServicio(id, cambios) {
    const lista = leer().map((servicio) =>
        servicio.id === id ? { ...servicio, ...cambios, id } : servicio
    );

    guardar(lista);
    return lista.find((servicio) => servicio.id === id) ?? null;
}

// DELETE: quita el servicio con ese id.
export function eliminarServicio(id) {
    guardar(leer().filter((servicio) => servicio.id !== id));
}
