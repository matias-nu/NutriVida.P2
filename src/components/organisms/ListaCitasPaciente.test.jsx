import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ListaCitasPaciente from "./ListaCitasPaciente.jsx";

const base = { servicio: "Control nutricional", nutricionista: "Carolina", fecha: "2030-01-07", hora: "09:00" };

describe("ListaCitasPaciente", () => {
    it("avisa cuando el paciente no tiene citas", () => {
        render(<ListaCitasPaciente citas={[]} onCancelar={() => {}} />);
        expect(screen.getByText("Todavía no tienes citas agendadas.")).toBeInTheDocument();
    });

    it("permite cancelar una cita vigente", async () => {
        const onCancelar = vi.fn();
        render(<ListaCitasPaciente citas={[{ ...base, id: 7, estado: "pendiente" }]} onCancelar={onCancelar} />);

        await userEvent.click(screen.getByRole("button", { name: "Cancelar" }));

        expect(onCancelar).toHaveBeenCalledWith(7);
    });

    it("no ofrece cancelar una cita que ya está cancelada", () => {
        render(<ListaCitasPaciente citas={[{ ...base, id: 7, estado: "cancelada" }]} onCancelar={() => {}} />);
        expect(screen.queryByRole("button", { name: "Cancelar" })).not.toBeInTheDocument();
    });
});