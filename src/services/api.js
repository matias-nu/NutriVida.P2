const BASE = "/api/v1";

export async function peticion(ruta, opciones = {}) {
    const token = localStorage.getItem("nutrivida-token");

    const respuesta = await fetch(`${BASE}${ruta}`, {
        ...opciones,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...opciones.headers
        }
    });

    const datos = await respuesta.json().catch(() => ({}));

    if (!respuesta.ok) {
        throw new Error(datos.mensaje || datos.error || `Error HTTP ${respuesta.status}`);
    }

    return datos;
}
