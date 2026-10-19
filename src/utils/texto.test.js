import { describe, it, expect } from "vitest";
import { normalizarTexto, crearSlug } from "./texto.js";

describe("normalizarTexto", () => {
    it("pasa a minúsculas y quita las tildes", () => {
        expect(normalizarTexto("Alimentación Saludable")).toBe("alimentacion saludable");
    });
});

describe("crearSlug", () => {
    it("convierte un título en un id apto para la URL", () => {
        expect(crearSlug("Plan pérdida de peso")).toBe("plan-perdida-de-peso");
    });

    it("elimina símbolos y guiones sobrantes en los bordes", () => {
        expect(crearSlug("  ¡Taller de yoga! ")).toBe("taller-de-yoga");
    });
});