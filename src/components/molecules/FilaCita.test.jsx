import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import FilaCita from "./FilaCita.jsx";

const cita = {
    servicio: "Control nutricional",
    nutricionista: "Carolina Fuentes M.",
    fecha: "2030-01-07",
    hora: "09:00",
    estado: "pendiente",
};

describe("FilaCita", () => {
    it("muestra servicio, profesional, fecha formateada y estado", () => {
        render(<ul><FilaCita cita={cita} /></ul>);

        expect(screen.getByText("Control nutricional")).toBeInTheDocument();
        expect(screen.getByText("Carolina Fuentes M. · 07-01-2030 a las 09:00")).toBeInTheDocument();
        expect(screen.getByText("Pendiente")).toBeInTheDocument();
    });

    it("muestra las acciones solo cuando se entregan", () => {
        const { rerender } = render(<ul><FilaCita cita={cita} /></ul>);
        expect(screen.queryByRole("button")).not.toBeInTheDocument();

        rerender(<ul><FilaCita cita={cita} acciones={<button>Cancelar</button>} /></ul>);
        expect(screen.getByRole("button", { name: "Cancelar" })).toBeInTheDocument();
    });
});