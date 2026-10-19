import { describe, it, expect } from "vitest";
import { tuvoConsultaPresencial, validarTeleconsulta } from "./reglasCitas.js";

const teleconsulta = { modalidad: "Online (video)" };
const presencial = { tipo: "Consulta", modalidad: "Presencial", estado: "confirmada" };

describe("tuvoConsultaPresencial", () => {
    it("es true con una consulta presencial confirmada", () => {
        expect(tuvoConsultaPresencial([presencial])).toBe(true);
    });

    it("es false sin citas previas", () => {
        expect(tuvoConsultaPresencial()).toBe(false);
    });

    it("no cuenta una cita pendiente ni una cancelada", () => {
        expect(tuvoConsultaPresencial([{ ...presencial, estado: "pendiente" }])).toBe(false);
        expect(tuvoConsultaPresencial([{ ...presencial, estado: "cancelada" }])).toBe(false);
    });

    it("no cuenta una cita que no es consulta (ej: un taller)", () => {
        expect(tuvoConsultaPresencial([{ ...presencial, tipo: "Taller grupal" }])).toBe(false);
    });
});

describe("validarTeleconsulta", () => {
    it("rechaza la teleconsulta si no hubo una consulta presencial antes", () => {
        expect(validarTeleconsulta(teleconsulta, [])).toBe(
            "La teleconsulta requiere haber tenido antes una consulta presencial."
        );
    });

    it("acepta la teleconsulta si ya hubo una consulta presencial", () => {
        expect(validarTeleconsulta(teleconsulta, [presencial])).toBe("");
    });

    it("no exige nada a los servicios presenciales", () => {
        expect(validarTeleconsulta({ modalidad: "Presencial" }, [])).toBe("");
    });
});