import { describe, it, expect, beforeEach } from "vitest";
import { listarUsuarios, buscarPorCredenciales, registrarUsuario } from "./usuarioService.js";

beforeEach(() => {
    localStorage.clear();
});

describe("usuarioService", () => {
    it("encuentra a un usuario de partida con su correo y clave", () => {
        expect(buscarPorCredenciales("admin@nutrivida.cl", "admin123").rol).toBe("admin");
    });

    it("devuelve null si la clave es incorrecta", () => {
        expect(buscarPorCredenciales("admin@nutrivida.cl", "mala")).toBeNull();
    });

    it("registra un paciente que luego puede iniciar sesión", () => {
        registrarUsuario({ nombre: " Ana ", correo: "Ana@Correo.cl", clave: "abc123" });

        const usuario = buscarPorCredenciales("ana@correo.cl", "abc123");
        expect(usuario.rol).toBe("paciente");
        expect(usuario.nombre).toBe("Ana");
    });

    it("no permite registrar dos veces el mismo correo", () => {
        registrarUsuario({ nombre: "Ana", correo: "ana@correo.cl", clave: "abc123" });

        expect(() => registrarUsuario({ nombre: "Otra", correo: "ANA@correo.cl", clave: "xyz789" })).toThrow(
            "Ya existe una cuenta"
        );
        expect(listarUsuarios().filter((u) => u.correo === "ana@correo.cl")).toHaveLength(1);
    });
});