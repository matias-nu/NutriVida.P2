// citaService: CRUD de las citas agendadas. JavaScript puro, guarda en localStorage.
import { validarTeleconsulta } from "../utils/reglasCitas.js";

const CLAVE = "nutrivida-citas";

function leer() {
    const guardado = localStorage.getItem(CLAVE);
    return guardado === null ? [] : JSON.parse(guardado);
}

function guardar(lista) {
    localStorage.setItem(CLAVE, JSON.stringify(lista));
}

// READ: todas las citas.
export function listarCitas() {
    return leer();
}

// READ: las citas de un paciente (se identifica por su correo).
export function listarCitasDe(correo) {
    const buscado = correo.trim().toLowerCase();
    return leer().filter((cita) => cita.correo === buscado);
}

// READ: una cita por su id (o null).
export function obtenerCita(id) {
    return leer().find((cita) => cita.id === id) ?? null;
}


export function crearCita(datos) {
    const lista = leer();
    const correo = datos.correo.trim().toLowerCase();

    const horaOcupada = lista.some(
        (cita) =>
            cita.nutricionistaId === datos.nutricionistaId &&
            cita.fecha === datos.fecha &&
            cita.hora === datos.hora &&
            cita.estado !== "cancelada"
    );
    if (horaOcupada) {
        throw new Error("Ese horario ya fue reservado por otro paciente.");
    }

    const errorRegla = validarTeleconsulta(datos, listarCitasDe(correo));
    if (errorRegla) {
        throw new Error(errorRegla);
    }

    const nueva = {
        ...datos,
        correo,
        id: Math.max(0, ...lista.map((cita) => cita.id)) + 1,
        estado: "pendiente",
    };
    guardar([...lista, nueva]);
    return nueva;
}

// UPDATE: cambia solo los campos indicados (ej: el estado). El id no cambia.
export function actualizarCita(id, cambios) {
    const lista = leer().map((cita) => (cita.id === id ? { ...cita, ...cambios, id } : cita));
    guardar(lista);
    return lista.find((cita) => cita.id === id) ?? null;
}

// DELETE: quita la cita con ese id.
export function eliminarCita(id) {
    guardar(leer().filter((cita) => cita.id !== id));
}