import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Tarjeta from "./Tarjeta.jsx";

function dibujar(props) {
    return render(
        <MemoryRouter>
            <Tarjeta {...props} />
        </MemoryRouter>
    );
}

describe("Tarjeta", () => {
    it("muestra título, descripción, precio y modalidad", () => {
        dibujar({ id: "control", titulo: "Control", descripcion: "Seguimiento", precio: 25000, modalidad: "Presencial" });

        expect(screen.getByRole("heading", { name: "Control" })).toBeInTheDocument();
        expect(screen.getByText("Seguimiento")).toBeInTheDocument();
        expect(screen.getByText(/25\.000/)).toBeInTheDocument();
        expect(screen.getByText("Presencial")).toBeInTheDocument();
    });

    it("el botón lleva a la página de detalle del servicio", () => {
        dibujar({ id: "control", titulo: "Control", descripcion: "Seguimiento", precio: 25000 });

        expect(screen.getByRole("link", { name: "Ver detalle" })).toHaveAttribute("href", "/servicios/control");
    });

    it("sin id, precio ni modalidad solo muestra título y descripción", () => {
        dibujar({ titulo: "Consulta nutricional", descripcion: "Evaluación inicial" });

        expect(screen.queryByRole("link")).not.toBeInTheDocument();
        expect(screen.queryByText(/\$/)).not.toBeInTheDocument();
        expect(screen.queryByText("Presencial")).not.toBeInTheDocument();
    });
});