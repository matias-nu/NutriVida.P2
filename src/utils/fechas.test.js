import { describe, it, expect } from "vitest";
import { fechaHoy, formatearFecha, diaDeSemana } from "./fechas.js";

describe("fechas", () => {
    it("fechaHoy devuelve el formato AAAA-MM-DD", () => {
        expect(fechaHoy()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    it("formatearFecha pasa de AAAA-MM-DD a DD-MM-AAAA", () => {
        expect(formatearFecha("2030-01-07")).toBe("07-01-2030");
    });

    it("diaDeSemana entrega 1 para un lunes y 2 para un martes", () => {
        expect(diaDeSemana("2030-01-07")).toBe(1);
        expect(diaDeSemana("2030-01-08")).toBe(2);
    });
});