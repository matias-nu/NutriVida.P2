import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ServiciosProvider } from "../context/ServiciosContext.jsx";
import { obtenerServicio } from "../services/servicioService.js";
import AdminServicios from "./AdminServicios.jsx";

beforeEach(() => {
    localStorage.clear();
});

function dibujar() {
    render(
        <ServiciosProvider>
            <AdminServicios />
        </ServiciosProvider>
    );
}

describe("AdminServicios (CRUD del panel)", () => {
    it("crea un servicio nuevo: aparece en la tabla y queda guardado", async () => {
        dibujar();

        await userEvent.click(screen.getByRole("button", { name: "Nuevo servicio" }));
        await userEvent.type(screen.getByLabelText("Nombre"), "Taller de yoga");
        await userEvent.type(screen.getByLabelText("Descripción"), "Sesión grupal de yoga y respiración");
        await userEvent.type(screen.getByLabelText("Precio (CLP)"), "9000");
        await userEvent.click(screen.getByRole("button", { name: "Guardar" }));

        expect(screen.getByText("Taller de yoga")).toBeInTheDocument();
        expect(screen.getByRole("status")).toHaveTextContent('Servicio "Taller de yoga" creado.');
        expect(obtenerServicio("taller-de-yoga").precio).toBe(9000);
    });

    it("no guarda si faltan datos y muestra los mensajes de error", async () => {
        dibujar();

        await userEvent.click(screen.getByRole("button", { name: "Nuevo servicio" }));
        await userEvent.click(screen.getByRole("button", { name: "Guardar" }));

        expect(screen.getByText("Ingresa el nombre del servicio.")).toBeInTheDocument();
        expect(screen.getByText("Ingresa un precio entero mayor a 0.")).toBeInTheDocument();
    });

    it("edita el precio de un servicio existente", async () => {
        dibujar();

        // La fila de "Control nutricional" es la segunda del catálogo de partida
        await userEvent.click(screen.getAllByRole("button", { name: "Editar" })[1]);
        const precio = screen.getByLabelText("Precio (CLP)");
        await userEvent.clear(precio);
        await userEvent.type(precio, "27000");
        await userEvent.click(screen.getByRole("button", { name: "Guardar" }));

        expect(obtenerServicio("control").precio).toBe(27000);
        expect(screen.getByRole("status")).toHaveTextContent("actualizado");
    });

    it("elimina un servicio tras confirmar", async () => {
        dibujar();

        await userEvent.click(screen.getAllByRole("button", { name: "Eliminar" })[1]);
        await userEvent.click(screen.getByRole("button", { name: "Sí" }));

        expect(obtenerServicio("control")).toBeNull();
        expect(screen.getByRole("status")).toHaveTextContent("Servicio eliminado.");
    });
});