import { atencion } from "../data/horarios.js";
import { diaDeSemana } from "./fechas.js";

// ¿Ese nutricionista atiende en esa fecha? (por su día de la semana)
export function atiendeEseDia(nutricionistaId, fecha) {
    const datos = atencion[nutricionistaId];
    return Boolean(datos) && datos.dias.includes(diaDeSemana(fecha));
}

// Horas libres de un nutricionista en una fecha: sus horas de atención
// menos las que ya tienen una cita no cancelada. Si no atiende ese día, devuelve [].
export function horasDisponibles(nutricionistaId, fecha, citas = []) {
    if (!fecha || !atiendeEseDia(nutricionistaId, fecha)) {
        return [];
    }

    const ocupadas = citas
        .filter((c) => c.nutricionistaId === nutricionistaId && c.fecha === fecha && c.estado !== "cancelada")
        .map((c) => c.hora);

    return atencion[nutricionistaId].horas.filter((hora) => !ocupadas.includes(hora));
}