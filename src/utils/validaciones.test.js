import { describe, it, expect } from "vitest";
import {
    validarRequerido,
    validarCorreo,
    validarTelefono,
    validarLargoMinimo,
    validarClave,
    validarCoincidencia,
    validarPrecio,
    sinErrores,
} from "./validaciones.js";

describe("validaciones", () => {
    it("validarRequerido marca un texto vacío o con solo espacios", () => {
        expect(validarRequerido("   ", "Falta")).toBe("Falta");
        expect(validarRequerido("Ana", "Falta")).toBe("");
    });

    it("validarCorreo acepta un correo válido y rechaza uno sin dominio", () => {
        expect(validarCorreo("ana@correo.cl")).toBe("");
        expect(validarCorreo("ana@correo")).toBe("Ingresa un correo válido.");
    });

    it("validarTelefono acepta el formato chileno y rechaza letras", () => {
        expect(validarTelefono("+56 9 1234 5678")).toBe("");
        expect(validarTelefono("abc")).toBe("Ingresa un teléfono válido.");
    });

    it("validarLargoMinimo rechaza un texto más corto que el mínimo", () => {
        expect(validarLargoMinimo("hola", 10, "Corto")).toBe("Corto");
        expect(validarLargoMinimo("hola que tal", 10, "Corto")).toBe("");
    });

    it("validarClave exige 6 caracteres y un número", () => {
        expect(validarClave("ab1")).toMatch(/al menos 6/);
        expect(validarClave("abcdefg")).toMatch(/un número/);
        expect(validarClave("abcde1")).toBe("");
    });

    it("validarCoincidencia compara dos valores", () => {
        expect(validarCoincidencia("a1", "a2", "No coinciden")).toBe("No coinciden");
        expect(validarCoincidencia("a1", "a1", "No coinciden")).toBe("");
    });

    it("validarPrecio acepta enteros positivos y rechaza 0, decimales y texto", () => {
        expect(validarPrecio("25000")).toBe("");
        expect(validarPrecio("0")).not.toBe("");
        expect(validarPrecio("10.5")).not.toBe("");
        expect(validarPrecio("")).not.toBe("");
    });

    it("sinErrores es true solo si todos los mensajes están vacíos", () => {
        expect(sinErrores({ a: "", b: "" })).toBe(true);
        expect(sinErrores({ a: "", b: "Error" })).toBe(false);
    });
});