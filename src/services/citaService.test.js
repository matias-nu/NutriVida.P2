import { describe, it, expect, beforeEach } from "vitest";
import {
    listarCitas,
    listarCitasDe,
    obtenerCita,
    crearCita,
    actualizarCita,
    eliminarCita,
} from "./citaService.js";

const citaBase = {
    servicio: "Control nutricional",
    tipo: "Consulta",
    modalidad: "Presencial",
    nutricionistaId: "carolina",
    fecha: "2030-01-07",
    hora: "09:00",
    nombre: "Ana",
    correo: "Ana@Correo.cl",
};

beforeEach(() => {
    localStorage.clear();
});

describe("citaService", () => {
    it("parte sin citas", () => {
        expect(listarCitas()).toEqual([]);
    });

    it("crea una cita pendiente con id y correo en minúsculas", () => {
        const cita = crearCita(citaBase);

        expect(cita.id).toBe(1);
        expect(cita.estado).toBe("pendiente");
        expect(cita.correo).toBe("ana@correo.cl");
        expect(obtenerCita(1).nombre).toBe("Ana");
    });

    it("da ids distintos a cada cita", () => {
        crearCita(citaBase);
        const segunda = crearCita({ ...citaBase, hora: "10:00" });

        expect(segunda.id).toBe(2);
    });

    it("rechaza una hora que otro paciente ya reservó", () => {
        crearCita(citaBase);

        expect(() => crearCita({ ...citaBase, correo: "otro@correo.cl" })).toThrow("ya fue reservado");
    });

    it("permite reservar de nuevo una hora cuya cita fue cancelada", () => {
        const primera = crearCita(citaBase);
        actualizarCita(primera.id, { estado: "cancelada" });

        expect(() => crearCita({ ...citaBase, correo: "otro@correo.cl" })).not.toThrow();
    });

    it("rechaza una teleconsulta si el paciente no tuvo una consulta presencial confirmada", () => {
        const tele = { ...citaBase, servicio: "Teleconsulta", modalidad: "Online (video)", hora: "11:00" };

        expect(() => crearCita(tele)).toThrow("requiere haber tenido antes una consulta presencial");
    });

    it("acepta la teleconsulta cuando la consulta presencial ya fue confirmada", () => {
        const presencial = crearCita(citaBase);
        actualizarCita(presencial.id, { estado: "confirmada" });
        const tele = { ...citaBase, servicio: "Teleconsulta", modalidad: "Online (video)", hora: "11:00" };

        expect(crearCita(tele).modalidad).toBe("Online (video)");
    });

    it("lista las citas de un paciente por su correo", () => {
        crearCita(citaBase);
        crearCita({ ...citaBase, correo: "otro@correo.cl", hora: "10:00" });

        expect(listarCitasDe("  ANA@correo.cl ")).toHaveLength(1);
    });

    it("actualiza el estado sin cambiar el id y elimina la cita", () => {
        const cita = crearCita(citaBase);

        expect(actualizarCita(cita.id, { estado: "confirmada", id: 99 }).id).toBe(cita.id);
        eliminarCita(cita.id);
        expect(obtenerCita(cita.id)).toBeNull();
    });
});