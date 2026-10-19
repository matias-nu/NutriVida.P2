// Regla de negocio del caso: la teleconsulta exige haber tenido antes una consulta presencial.

export function tuvoConsultaPresencial(citasPrevias = []) {
    return citasPrevias.some(
        (cita) =>
            cita.tipo === "Consulta" &&
            cita.modalidad === "Presencial" &&
            cita.estado === "confirmada"
    );
}

export function validarTeleconsulta(servicio, citasPrevias = []) {
    if (!servicio || !servicio.modalidad.includes("Online")) {
        return "";
    }
    return tuvoConsultaPresencial(citasPrevias)
        ? ""
        : "La teleconsulta requiere haber tenido antes una consulta presencial.";
}