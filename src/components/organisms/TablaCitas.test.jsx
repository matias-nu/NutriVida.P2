import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TablaCitas from "./TablaCitas.jsx";

const citas = [
    {
        id: 1, servicio: "Control nutricional", nutricionista: "Carolina Fuentes M.", fecha: "2030-01-07",
        hora: "09:00", nombre: "Ana", correo: "ana@correo.cl", estado: "pendiente",
    },
];

describe("TablaCitas", () => {
    it("avisa cuando no hay citas", () => {
        render(<TablaCitas citas={[]} onCambiarEstado={() => {}} onEliminar={() => {}} />);
        expect(screen.getByText("Todavía no hay citas registradas.")).toBeInTheDocument();
    });

    it("cambiar el estado avisa con el id y el estado nuevo", async () => {
        const onCambiarEstado = vi.fn();
        render(<TablaCitas citas={citas} onCambiarEstado={onCambiarEstado} onEliminar={() => {}} />);

        await userEvent.selectOptions(screen.getByLabelText("Estado de la cita de Ana"), "confirmada");

        expect(onCambiarEstado).toHaveBeenCalledWith(1, "confirmada");
    });

    it("eliminar pide confirmación", async () => {
        const onEliminar = vi.fn();
        render(<TablaCitas citas={citas} onCambiarEstado={() => {}} onEliminar={onEliminar} />);

        await userEvent.click(screen.getByRole("button", { name: "Eliminar" }));
        await userEvent.click(screen.getByRole("button", { name: "Sí" }));

        expect(onEliminar).toHaveBeenCalledWith(1);
    });
});