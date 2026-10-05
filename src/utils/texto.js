// Pasa a minúsculas y quita las tildes: "Alimentación" -> "alimentacion".
// Sirve para que el buscador encuentre "alimentacion" aunque el texto tenga tilde.
export function normalizarTexto(texto) {
    return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Convierte un título en un id apto para la URL:
// "Plan pérdida de peso" -> "plan-perdida-de-peso".
export function crearSlug(texto) {
    return normalizarTexto(texto)
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}
