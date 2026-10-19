import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TablaServicios from "./TablaServicios.jsx";

const servicios = [
    { id: "control", titulo: "Control nutricional", tipo: "Consulta", precio: 25000 },
    { id: "teleconsulta", titulo: "Teleconsulta", tipo: "Consulta", precio: 20000 },
];

describe("TablaServicios", () => {
    it("muestra una fila por servicio", () => {
        render(<TablaServicios servicios={servicios} onEditar={() => {}} onEliminar={() => {}} />);

        expect(screen.getByText("Control nutricional")).toBeInTheDocument();
        expect(screen.getByText("Teleconsulta")).toBeInTheDocument();
    });

    it("Editar avisa con el servicio de esa fila", async () => {
        const onEditar = vi.fn();
        render(<TablaServicios servicios={servicios} onEditar={onEditar} onEliminar={() => {}} />);

        await userEvent.click(screen.getAllByRole("button", { name: "Editar" })[0]);

        expect(onEditar).toHaveBeenCalledWith(servicios[0]);
    });

    it("Eliminar pide confirmación antes de avisar", async () => {
        const onEliminar = vi.fn();
        render(<TablaServicios servicios={servicios} onEditar={() => {}} onEliminar={onEliminar} />);

        await userEvent.click(screen.getAllByRole("button", { name: "Eliminar" })[1]);
        expect(onEliminar).not.toHaveBeenCalled();

        await userEvent.click(screen.getByRole("button", { name: "Sí" }));
        expect(onEliminar).toHaveBeenCalledWith("teleconsulta");
    });

    it("responder No cancela la eliminación", async () => {
        const onEliminar = vi.fn();
        render(<TablaServicios servicios={servicios} onEditar={() => {}} onEliminar={onEliminar} />);

        await userEvent.click(screen.getAllByRole("button", { name: "Eliminar" })[0]);
        await userEvent.click(screen.getByRole("button", { name: "No" }));

        expect(onEliminar).not.toHaveBeenCalled();
        expect(screen.getAllByRole("button", { name: "Eliminar" })).toHaveLength(2);
    });
});