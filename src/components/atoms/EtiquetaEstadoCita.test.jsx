import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import EtiquetaEstadoCita from "./EtiquetaEstadoCita.jsx";

describe("EtiquetaEstadoCita", () => {
    it("muestra el texto del estado con su clase de color", () => {
        render(<EtiquetaEstadoCita estado="confirmada" />);
        expect(screen.getByText("Confirmada")).toHaveClass("etiqueta-confirmada");
    });

    it("usa Pendiente si el estado no se reconoce", () => {
        render(<EtiquetaEstadoCita estado="rara" />);
        expect(screen.getByText("Pendiente")).toBeInTheDocument();
    });
});