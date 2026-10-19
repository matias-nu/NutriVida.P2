import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext.jsx";
import RutaProtegida from "./RutaProtegida.jsx";

beforeEach(() => {
    localStorage.clear();
});

// Deja una sesión guardada, como si la persona ya hubiera iniciado sesión
function iniciarComo(rol) {
    localStorage.setItem("nutrivida-usuario", JSON.stringify({ nombre: "Prueba", rol }));
}

function dibujar(roles) {
    render(
        <AuthProvider>
            <MemoryRouter initialEntries={["/privada"]}>
                <Routes>
                    <Route path="/login" element={<h1>Pantalla login</h1>} />
                    <Route path="/panel" element={<h1>Pantalla panel</h1>} />
                    <Route path="/mis-citas" element={<h1>Pantalla mis citas</h1>} />
                    <Route
                        path="/privada"
                        element={
                            <RutaProtegida roles={roles}>
                                <h1>Contenido privado</h1>
                            </RutaProtegida>
                        }
                    />
                </Routes>
            </MemoryRouter>
        </AuthProvider>
    );
}

describe("RutaProtegida", () => {
    it("sin sesión manda al login", () => {
        dibujar();
        expect(screen.getByRole("heading", { name: "Pantalla login" })).toBeInTheDocument();
    });

    it("con sesión y sin restricción de rol muestra el contenido", () => {
        iniciarComo("admin");
        dibujar();
        expect(screen.getByRole("heading", { name: "Contenido privado" })).toBeInTheDocument();
    });

    it("un paciente en una ruta del personal vuelve a Mis citas", () => {
        iniciarComo("paciente");
        dibujar(["admin", "secretaria"]);
        expect(screen.getByRole("heading", { name: "Pantalla mis citas" })).toBeInTheDocument();
    });

    it("la secretaría en una ruta solo de admin vuelve al panel", () => {
        iniciarComo("secretaria");
        dibujar(["admin"]);
        expect(screen.getByRole("heading", { name: "Pantalla panel" })).toBeInTheDocument();
    });
});