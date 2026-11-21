import { peticion } from "./api.js";

export async function listarNutricionistas() {
    return peticion("/nutricionistas");
}

export async function consultarHorarios(nutricionistaId, fecha) {
    const datos = await peticion(
        `/nutricionistas/${nutricionistaId}/horarios?fecha=${encodeURIComponent(fecha)}`
    );

    return datos.horarios;
}
