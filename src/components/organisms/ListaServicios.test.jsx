import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import ListaServicios from "./ListaServicios.jsx";

const servicios = [
    { id: "a", tipo: "Consulta", titulo: "Control nutricional", descripcion: "Seguimiento", precio: 25000, modalidad: "Presencial" },
    { id: "b", tipo: "Plan especializado", titulo: "Plan deportivo", descripcion: "Para entrenar", precio: 70000, modalidad: "Presencial" },
    { id: "c", tipo: "Consulta", titulo: "Teleconsulta", descripcion: "Videollamada", precio: 20000, modalidad: "Online (video)" },
];

function dibujar() {
    render(
        <MemoryRouter>
            <ListaServicios servicios={servicios} />
        </MemoryRouter>
    );
}

describe("ListaServicios", () => {
    it("muestra todos los servicios y el contador", () => {
        dibujar();
        expect(screen.getAllByRole("article")).toHaveLength(3);
        expect(screen.getByRole("status")).toHaveTextContent("Mostrando 3 de 3 servicios");
    });

    it("filtra por tipo al hacer clic en un botón", async () => {
        dibujar();

        await userEvent.click(screen.getByRole("button", { name: "Plan especializado" }));

        expect(screen.getAllByRole("article")).toHaveLength(1);
        expect(screen.getByRole("status")).toHaveTextContent("Mostrando 1 de 3 servicios");
    });

    it("el buscador encuentra servicios sin importar tildes ni mayúsculas", async () => {
        dibujar();

        await userEvent.type(screen.getByRole("searchbox"), "TELECONSULTA");

        expect(screen.getAllByRole("article")).toHaveLength(1);
        expect(screen.getByRole("heading", { name: "Teleconsulta" })).toBeInTheDocument();
    });

    it("avisa cuando ningún servicio coincide", async () => {
        dibujar();

        await userEvent.type(screen.getByRole("searchbox"), "zzzz");

        expect(screen.queryByRole("article")).not.toBeInTheDocument();
        expect(screen.getByText(/No encontramos servicios/)).toBeInTheDocument();
    });
});