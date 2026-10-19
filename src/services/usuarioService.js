
import { usuarios as usuariosBase } from "../data/usuarios.js";

const CLAVE = "nutrivida-usuarios-registrados";

function leerRegistrados() {
    const guardado = localStorage.getItem(CLAVE);
    return guardado === null ? [] : JSON.parse(guardado);
}

export function listarUsuarios() {
    return [...usuariosBase, ...leerRegistrados()];
}

// Devuelve el usuario si el correo y la clave coinciden, o null.
export function buscarPorCredenciales(correo, clave) {
    const correoLimpio = correo.trim().toLowerCase();
    return listarUsuarios().find((u) => u.correo === correoLimpio && u.clave === clave) ?? null;
}

// Registra un paciente nuevo. Lanza un Error si el correo ya tiene cuenta.
export function registrarUsuario({ nombre, correo, clave }) {
    const correoLimpio = correo.trim().toLowerCase();

    if (listarUsuarios().some((u) => u.correo === correoLimpio)) {
        throw new Error("Ya existe una cuenta con ese correo.");
    }

    const nuevo = {
        id: Math.max(0, ...listarUsuarios().map((u) => u.id)) + 1,
        nombre: nombre.trim(),
        correo: correoLimpio,
        clave,
        rol: "paciente",
    };
    localStorage.setItem(CLAVE, JSON.stringify([...leerRegistrados(), nuevo]));
    return nuevo;
}