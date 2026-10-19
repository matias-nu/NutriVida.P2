import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { AuthProvider, useAuth } from "./AuthContext.jsx";

beforeEach(() => {
    localStorage.clear();
});

function usarAuth() {
    return renderHook(() => useAuth(), { wrapper: AuthProvider });
}

describe("AuthContext", () => {
    it("parte sin sesión iniciada", () => {
        const { result } = usarAuth();
        expect(result.current.usuario).toBeNull();
    });

    it("iniciarSesion con credenciales correctas guarda al usuario sin su contraseña", () => {
        const { result } = usarAuth();
        let correcto;

        act(() => {
            correcto = result.current.iniciarSesion("admin@nutrivida.cl", "admin123");
        });

        expect(correcto).toBe(true);
        expect(result.current.usuario.rol).toBe("admin");
        expect(result.current.usuario.clave).toBeUndefined();
    });

    it("iniciarSesion devuelve false con una clave incorrecta", () => {
        const { result } = usarAuth();
        let correcto;

        act(() => {
            correcto = result.current.iniciarSesion("admin@nutrivida.cl", "mala");
        });

        expect(correcto).toBe(false);
        expect(result.current.usuario).toBeNull();
    });

    it("registrar crea un paciente e inicia su sesión", () => {
        const { result } = usarAuth();
        let error;

        act(() => {
            error = result.current.registrar({ nombre: "Ana", correo: "ana@correo.cl", clave: "abc123" });
        });

        expect(error).toBe("");
        expect(result.current.usuario.rol).toBe("paciente");
    });

    it("registrar devuelve el motivo si el correo ya tiene cuenta", () => {
        const { result } = usarAuth();
        let error;

        act(() => {
            error = result.current.registrar({ nombre: "Otro", correo: "admin@nutrivida.cl", clave: "abc123" });
        });

        expect(error).toBe("Ya existe una cuenta con ese correo.");
        expect(result.current.usuario).toBeNull();
    });

    it("la sesión se mantiene al recargar y cerrarSesion la borra", () => {
        const primera = usarAuth();
        act(() => {
            primera.result.current.iniciarSesion("admin@nutrivida.cl", "admin123");
        });

        
        const recargada = usarAuth();
        expect(recargada.result.current.usuario.correo).toBe("admin@nutrivida.cl");

        act(() => {
            recargada.result.current.cerrarSesion();
        });
        expect(recargada.result.current.usuario).toBeNull();
        expect(localStorage.getItem("nutrivida-usuario")).toBeNull();
    });
});