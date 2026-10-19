import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext.jsx";
import FormRegistro from "./FormRegistro.jsx";

beforeEach(() => {
    localStorage.clear();
});

function dibujar() {
    render(
        <AuthProvider>
            <MemoryRouter initialEntries={["/registro"]}>
                <Routes>
                    <Route path="/registro" element={<FormRegistro />} />
                    <Route path="/mis-citas" element={<h1>Pantalla Mis citas</h1>} />
                </Routes>
            </MemoryRouter>
        </AuthProvider>
    );
}

async function llenar({ nombre = "Ana Pérez", correo = "ana@correo.cl", clave = "abc123", repetir = "abc123" }) {
    await userEvent.type(screen.getByLabelText("Nombre completo"), nombre);
    await userEvent.type(screen.getByLabelText("Correo electrónico"), correo);
    await userEvent.type(screen.getByLabelText("Contraseña"), clave);
    await userEvent.type(screen.getByLabelText("Repite la contraseña"), repetir);
    await userEvent.click(screen.getByRole("button", { name: "Crear cuenta" }));
}

describe("FormRegistro", () => {
    it("muestra un mensaje por cada campo vacío, sin usar alert", async () => {
        dibujar();

        await userEvent.click(screen.getByRole("button", { name: "Crear cuenta" }));

        expect(screen.getByText("Ingresa tu nombre completo.")).toBeInTheDocument();
        expect(screen.getByText("Ingresa un correo válido.")).toBeInTheDocument();
        expect(screen.getByRole("alert")).toHaveTextContent("Revisa los campos marcados en rojo.");
    });

    it("avisa si las contraseñas no coinciden", async () => {
        dibujar();

        await llenar({ repetir: "abc999" });

        expect(screen.getByText("Las contraseñas no coinciden.")).toBeInTheDocument();
    });

    it("con datos válidos crea la cuenta y lleva a Mis citas", async () => {
        dibujar();

        await llenar({});

        expect(screen.getByRole("heading", { name: "Pantalla Mis citas" })).toBeInTheDocument();
        expect(JSON.parse(localStorage.getItem("nutrivida-usuario")).rol).toBe("paciente");
    });

    it("avisa si el correo ya tiene una cuenta", async () => {
        dibujar();

        await llenar({ correo: "admin@nutrivida.cl" });

        expect(screen.getByRole("alert")).toHaveTextContent("Ya existe una cuenta con ese correo.");
    });
});