import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Boton from "./Boton.jsx";

describe("Boton", () => {
    it("sin 'to' es un botón que avisa al hacer clic", async () => {
        const alClic = vi.fn(); // mock: función falsa que registra sus llamadas
        render(<Boton onClick={alClic}>Guardar</Boton>);

        await userEvent.click(screen.getByRole("button", { name: "Guardar" }));

        expect(alClic).toHaveBeenCalledTimes(1);
    });

    it("con 'to' es un enlace hacia esa ruta", () => {
        render(
            <MemoryRouter>
                <Boton to="/agenda">Agendar</Boton>
            </MemoryRouter>
        );

        expect(screen.getByRole("link", { name: "Agendar" })).toHaveAttribute("href", "/agenda");
    });
});