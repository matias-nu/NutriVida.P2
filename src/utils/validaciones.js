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


export function sinErrores(errores) {
    return Object.values(errores).every((error) => error === "");
}


export function validarClave(valor) {
    if (valor.length < 6) {
        return "La contraseña debe tener al menos 6 caracteres.";
    }
    return /\d/.test(valor) ? "" : "La contraseña debe incluir al menos un número.";
}


export function validarCoincidencia(valor, otroValor, mensaje) {
    return valor === otroValor ? "" : mensaje;
}

export function validarPrecio(valor) {
    const numero = Number(valor);
    return Number.isInteger(numero) && numero > 0 ? "" : "Ingresa un precio entero mayor a 0.";
}