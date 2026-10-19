import { describe, it, expect } from "vitest";
import { obtenerTipos, filtrarServicios } from "./filtros.js";

const servicios = [
    { id: "a", tipo: "Consulta", titulo: "Control nutricional", descripcion: "Seguimiento mensual" },
    { id: "b", tipo: "Plan especializado", titulo: "Plan deportivo", descripcion: "Para quienes entrenan" },
    { id: "c", tipo: "Consulta", titulo: "Teleconsulta", descripcion: "Por videollamada" },
];

describe("obtenerTipos", () => {
    it("devuelve cada tipo una sola vez", () => {
        expect(obtenerTipos(servicios)).toEqual(["Consulta", "Plan especializado"]);
    });
});

describe("filtrarServicios", () => {
    it("sin filtros devuelve todos los servicios", () => {
        expect(filtrarServicios(servicios)).toHaveLength(3);
    });

    it("filtra por tipo", () => {
        const resultado = filtrarServicios(servicios, "Consulta");
        expect(resultado.map((s) => s.id)).toEqual(["a", "c"]);
    });

    it("busca en título y descripción sin importar mayúsculas ni tildes", () => {
        expect(filtrarServicios(servicios, "Todos", "TELECONSULTA")).toHaveLength(1);
        expect(filtrarServicios(servicios, "Todos", "videollamada")).toHaveLength(1);
    });

    it("combina tipo y texto", () => {
        expect(filtrarServicios(servicios, "Consulta", "deportivo")).toEqual([]);
    });
});