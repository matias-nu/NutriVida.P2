import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ResumenCita from "./ResumenCita.jsx";

const cita = {
    servicio: "Control nutricional",
    nutricionista: "Carolina Fuentes M.",
    fecha: "2030-01-07",
    hora: "09:00",
    nombre: "Ana",
    correo: "ana@correo.cl",
    telefono: "+56 9 1234 5678",
    precio: 25000,
};

describe("ResumenCita", () => {
    it("muestra los datos de la cita con la fecha en formato DD-MM-AAAA", () => {
        render(<ResumenCita cita={cita} />);

        expect(screen.getByText("Control nutricional")).toBeInTheDocument();
        expect(screen.getByText("Carolina Fuentes M.")).toBeInTheDocument();
        expect(screen.getByText("07-01-2030 a las 09:00")).toBeInTheDocument();
        expect(screen.getByText(/25\.000/)).toBeInTheDocument();
    });
});