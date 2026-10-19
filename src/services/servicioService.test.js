import { describe, it, expect, beforeEach } from "vitest";
import {
    listarServicios,
    obtenerServicio,
    crearServicio,
    actualizarServicio,
    eliminarServicio,
} from "./servicioService.js";

beforeEach(() => {
    localStorage.clear();
});

describe("servicioService", () => {
    it("lista el catálogo de partida cuando no hay nada guardado", () => {
        expect(listarServicios().length).toBeGreaterThanOrEqual(8);
    });

    it("obtiene un servicio por id y devuelve null si no existe", () => {
        expect(obtenerServicio("control").titulo).toBe("Control nutricional");
        expect(obtenerServicio("no-existe")).toBeNull();
    });

    it("crea un servicio con id sacado del título y lo deja guardado", () => {
        const nuevo = crearServicio({ titulo: "Taller de yoga", precio: 9000 });

        expect(nuevo.id).toBe("taller-de-yoga");
        expect(obtenerServicio("taller-de-yoga").precio).toBe(9000);
    });

    it("no repite ids: agrega un número si el título ya existe", () => {
        crearServicio({ titulo: "Taller de yoga", precio: 1 });
        const segundo = crearServicio({ titulo: "Taller de yoga", precio: 2 });

        expect(segundo.id).toBe("taller-de-yoga-2");
    });

    it("actualiza solo los campos indicados y nunca cambia el id", () => {
        const actualizado = actualizarServicio("control", { precio: 30000, id: "otro" });

        expect(actualizado.precio).toBe(30000);
        expect(actualizado.id).toBe("control");
        expect(actualizado.titulo).toBe("Control nutricional");
    });

    it("elimina un servicio", () => {
        eliminarServicio("control");
        expect(obtenerServicio("control")).toBeNull();
    });

    it("conserva los cambios entre lecturas (persistencia)", () => {
        crearServicio({ titulo: "Servicio persistente", precio: 1 });
        expect(listarServicios().some((s) => s.id === "servicio-persistente")).toBe(true);
    });
});