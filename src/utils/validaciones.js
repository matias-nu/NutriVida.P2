const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const formatoTelefono = /^[0-9+\s]{8,15}$/;

export function validarRequerido(valor, mensaje) {
    return valor.trim() === "" ? mensaje : "";
}

export function validarCorreo(valor) {
    return formatoCorreo.test(valor.trim()) ? "" : "Ingresa un correo válido.";
}

export function validarTelefono(valor) {
    return formatoTelefono.test(valor.trim()) ? "" : "Ingresa un teléfono válido.";
}

export function validarLargoMinimo(valor, minimo, mensaje) {
    return valor.trim().length < minimo ? mensaje : "";
}

// Devuelve true si el objeto de errores no tiene ningún mensaje
export function sinErrores(errores) {
    return Object.values(errores).every((error) => error === "");
}