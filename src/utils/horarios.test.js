import { describe, it, expect } from "vitest";
import { atiendeEseDia, horasDisponibles } from "./horarios.js";

const LUNES = "2030-01-07";
const MARTES = "2030-01-08";

describe("atiendeEseDia", () => {
    it("Carolina atiende los lunes pero no los martes", () => {
        expect(atiendeEseDia("carolina", LUNES)).toBe(true);
        expect(atiendeEseDia("carolina", MARTES)).toBe(false);
    });

    it("un nutricionista que no existe nunca atiende", () => {
        expect(atiendeEseDia("fantasma", LUNES)).toBe(false);
    });
});

describe("horasDisponibles", () => {
    it("devuelve todas las horas del profesional un día que atiende", () => {
        expect(horasDisponibles("carolina", LUNES)).toHaveLength(7);
    });

    it("devuelve lista vacía si no atiende ese día o falta la fecha", () => {
        expect(horasDisponibles("carolina", MARTES)).toEqual([]);
        expect(horasDisponibles("carolina", "")).toEqual([]);
    });

    it("quita las horas con una cita vigente", () => {
        const citas = [{ nutricionistaId: "carolina", fecha: LUNES, hora: "09:00", estado: "pendiente" }];
        expect(horasDisponibles("carolina", LUNES, citas)).not.toContain("09:00");
    });

    it("una cita cancelada libera la hora", () => {
        const citas = [{ nutricionistaId: "carolina", fecha: LUNES, hora: "09:00", estado: "cancelada" }];
        expect(horasDisponibles("carolina", LUNES, citas)).toContain("09:00");
    });
});