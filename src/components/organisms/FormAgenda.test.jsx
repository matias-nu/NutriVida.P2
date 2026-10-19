import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext.jsx";
import { ServiciosProvider } from "../../context/ServiciosContext.jsx";
import { CitasProvider } from "../../context/CitasContext.jsx";
import { crearCita, listarCitas } from "../../services/citaService.js";
import CitaConfirmada from "../../pages/CitaConfirmada.jsx";
import CitaNoAgendada from "../../pages/CitaNoAgendada.jsx";
import FormAgenda from "./FormAgenda.jsx";

const LUNES = "2030-01-07"; 
const MARTES = "2030-01-08";

beforeEach(() => {
    localStorage.clear();
});


function dibujar() {
    render(
        <AuthProvider>
            <ServiciosProvider>
                <CitasProvider>
                    <MemoryRouter initialEntries={["/agenda"]}>
                        <Routes>
                            <Route path="/agenda" element={<FormAgenda />} />
                            <Route path="/agenda/confirmada/:id" element={<CitaConfirmada />} />
                            <Route path="/agenda/error" element={<CitaNoAgendada />} />
                        </Routes>
                    </MemoryRouter>
                </CitasProvider>
            </ServiciosProvider>
        </AuthProvider>
    );
}

async function llenarFormulario({ servicio, fecha = LUNES, hora = "09:00" }) {
    await userEvent.selectOptions(screen.getByLabelText("Servicio"), servicio);
    await userEvent.selectOptions(screen.getByLabelText("Nutricionista preferido"), "carolina");
    fireEvent.change(screen.getByLabelText("Fecha preferida"), { target: { value: fecha } });
    if (hora) {
        await userEvent.selectOptions(screen.getByLabelText("Horario disponible"), hora);
    }
    await userEvent.type(screen.getByLabelText("Nombre completo"), "Ana Pérez");
    await userEvent.type(screen.getByLabelText("Correo electrónico"), "ana@correo.cl");
    await userEvent.type(screen.getByLabelText("Teléfono de contacto"), "+56 9 1234 5678");
    await userEvent.type(screen.getByLabelText("Motivo de la consulta"), "Quiero bajar de peso");
}

describe("FormAgenda", () => {
    it("muestra un mensaje en cada campo obligatorio si se envía vacío", async () => {
        dibujar();

        await userEvent.click(screen.getByRole("button", { name: "Revisar mi cita" }));

        expect(screen.getByText("Selecciona un servicio.")).toBeInTheDocument();
        expect(screen.getByText("Selecciona un profesional.")).toBeInTheDocument();
        expect(screen.getByText("Selecciona un horario.")).toBeInTheDocument();
        expect(screen.getByText("Ingresa tu nombre completo.")).toBeInTheDocument();
    });

    it("solo ofrece las horas del profesional el día que atiende", async () => {
        dibujar();
        await userEvent.selectOptions(screen.getByLabelText("Nutricionista preferido"), "carolina");

        fireEvent.change(screen.getByLabelText("Fecha preferida"), { target: { value: LUNES } });
        expect(screen.getByRole("option", { name: "09:00" })).toBeInTheDocument();

        fireEvent.change(screen.getByLabelText("Fecha preferida"), { target: { value: MARTES } });
        expect(screen.queryByRole("option", { name: "09:00" })).not.toBeInTheDocument();
    });

    it("no ofrece una hora que ya está reservada", async () => {
        crearCita({
            servicio: "Control", tipo: "Consulta", modalidad: "Presencial", nutricionistaId: "carolina",
            fecha: LUNES, hora: "09:00", nombre: "Otro", correo: "otro@correo.cl",
        });
        dibujar();
        await userEvent.selectOptions(screen.getByLabelText("Nutricionista preferido"), "carolina");
        fireEvent.change(screen.getByLabelText("Fecha preferida"), { target: { value: LUNES } });

        expect(screen.queryByRole("option", { name: "09:00" })).not.toBeInTheDocument();
        expect(screen.getByRole("option", { name: "10:00" })).toBeInTheDocument();
    });

    it("rechaza una fecha en que el profesional no atiende", async () => {
        dibujar();

        await llenarFormulario({ servicio: "control", fecha: MARTES, hora: "" });
        await userEvent.click(screen.getByRole("button", { name: "Revisar mi cita" }));

        expect(screen.getByText(/no atiende el día elegido/)).toBeInTheDocument();
    });

    it("flujo completo: formulario, resumen y pantalla de éxito, con la cita guardada", async () => {
        dibujar();

        await llenarFormulario({ servicio: "control" });
        await userEvent.click(screen.getByRole("button", { name: "Revisar mi cita" }));

        // Paso 2: resumen para confirmar
        expect(screen.getByRole("heading", { name: "Revisa tu cita" })).toBeInTheDocument();
        expect(screen.getByText("07-01-2030 a las 09:00")).toBeInTheDocument();

        await userEvent.click(screen.getByRole("button", { name: "Confirmar cita" }));

        expect(screen.getByRole("heading", { name: "¡Tu hora quedó agendada!" })).toBeInTheDocument();
        expect(listarCitas()).toHaveLength(1);
        expect(listarCitas()[0].estado).toBe("pendiente");
    });

    it("Volver a editar regresa al formulario con lo escrito", async () => {
        dibujar();
        await llenarFormulario({ servicio: "control" });
        await userEvent.click(screen.getByRole("button", { name: "Revisar mi cita" }));

        await userEvent.click(screen.getByRole("button", { name: "Volver a editar" }));

        expect(screen.getByLabelText("Nombre completo")).toHaveValue("Ana Pérez");
    });

    it("una teleconsulta sin consulta presencial previa termina en la pantalla de error", async () => {
        dibujar();

        await llenarFormulario({ servicio: "teleconsulta" });
        await userEvent.click(screen.getByRole("button", { name: "Revisar mi cita" }));
        await userEvent.click(screen.getByRole("button", { name: "Confirmar cita" }));

        expect(screen.getByRole("heading", { name: "No pudimos agendar tu hora" })).toBeInTheDocument();
        expect(screen.getByRole("alert")).toHaveTextContent("requiere haber tenido antes una consulta presencial");
        expect(listarCitas()).toHaveLength(0);
    });
});