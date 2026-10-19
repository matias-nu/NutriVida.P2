// Fecha de hoy en formato AAAA-MM-DD 
export function fechaHoy() {
    const hoy = new Date();
    const mes = String(hoy.getMonth() + 1).padStart(2, "0");
    const dia = String(hoy.getDate()).padStart(2, "0");
    return `${hoy.getFullYear()}-${mes}-${dia}`;
}


export function formatearFecha(fecha) {
    const [anio, mes, dia] = fecha.split("-");
    return `${dia}-${mes}-${anio}`;
}

export function diaDeSemana(fecha) {
    return new Date(`${fecha}T00:00:00`).getDay();
}