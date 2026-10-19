import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { CitasProvider, useCitas } from "./CitasContext.jsx";

const datos = {
    servicio: "Control nutricional",
    tipo: "Consulta",
    modalidad: "Presencial",
    nutricionistaId: "carolina",
    fecha: "2030-01-07",
    hora: "09:00",
    nombre: "Ana",
    correo: "ana@correo.cl",
};

beforeEach(() => {
    localStorage.clear();
});

describe("CitasContext", () => {
    it("lanza un error si useCitas se usa fuera del Provider", () => {
        expect(() => renderHook(() => useCitas())).toThrow("useCitas debe usarse dentro de un CitasProvider");
    });

    it("agendar suma la cita a la lista que ven todas las pantallas", () => {
        const { result } = renderHook(() => useCitas(), { wrapper: CitasProvider });

        act(() => {
            result.current.agendar(datos);
        });

        expect(result.current.citas).toHaveLength(1);
        expect(result.current.obtener(1).nombre).toBe("Ana");
        expect(result.current.citasDe("ANA@correo.cl")).toHaveLength(1);
    });

    it("actualizar cambia el estado y eliminar quita la cita", () => {
        const { result } = renderHook(() => useCitas(), { wrapper: CitasProvider });
        act(() => {
            result.current.agendar(datos);
        });

        act(() => {
            result.current.actualizar(1, { estado: "confirmada" });
        });
        expect(result.current.obtener(1).estado).toBe("confirmada");

        act(() => {
            result.current.eliminar(1);
        });
        expect(result.current.citas).toEqual([]);
    });

    it("agendar propaga el error del service cuando la hora está ocupada", () => {
        const { result } = renderHook(() => useCitas(), { wrapper: CitasProvider });
        act(() => {
            result.current.agendar(datos);
        });

        expect(() => result.current.agendar({ ...datos, correo: "otro@correo.cl" })).toThrow("ya fue reservado");
    });
});