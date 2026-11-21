import { describe, it, expect, vi, beforeEach } from "vitest";
import * as api from "./api.js";
import { listarCitas, crearCita, actualizarCita, eliminarCita } from "./citaService.js";
vi.mock("./api.js", () => ({ peticion: vi.fn() }));
beforeEach(() => vi.clearAllMocks());
describe("citaService (API REST)", () => {
 it("lista y adapta las citas de PostgreSQL", async () => {
  api.peticion.mockResolvedValue([{id:3, servicio_id:1,nutricionista_id:2,fecha_hora:"2030-01-07T09:00:00",estado:"Pendiente",paciente:"Ana",observaciones:"Control"}]);
  const [c] = await listarCitas();
  expect(c).toMatchObject({id:3, servicioId:"1", nutricionistaId:"2", fecha:"2030-01-07",hora:"09:00",estado:"pendiente",nombre:"Ana"});
  expect(api.peticion).toHaveBeenCalledWith("/citas");
 });
 it("crea cita usando ids y fecha_hora", async () => {
  api.peticion.mockResolvedValue({cita:{id:8}});
  await expect(crearCita({servicioId:"1",nutricionistaId:"2",fecha:"2030-01-07",hora:"09:00",motivo:"Consulta"})).resolves.toEqual({id:8});
  expect(api.peticion).toHaveBeenCalledWith("/citas",{method:"POST",body:JSON.stringify({servicio_id:1,nutricionista_id:2,fecha_hora:"2030-01-07T09:00:00",observaciones:"Consulta"})});
 });
 it("cambia estado con PATCH", async () => {
  api.peticion.mockResolvedValue({mensaje:"OK"});
  await actualizarCita(8,{estado:"confirmada"});
  expect(api.peticion).toHaveBeenCalledWith("/citas/8/estado",{method:"PATCH",body:JSON.stringify({estado:"Confirmada"})});
 });
 it("cancelar cita usa PATCH, no DELETE", async () => {
  api.peticion.mockResolvedValue({});
  await eliminarCita(8);
  expect(api.peticion).toHaveBeenCalledWith("/citas/8/estado",{method:"PATCH",body:JSON.stringify({estado:"Cancelada"})});
 });
 it("rechaza estado inválido", async () => {
  await expect(actualizarCita(8,{estado:"pendiente"})).rejects.toThrow("Estado de cita no permitido");
  expect(api.peticion).not.toHaveBeenCalled();
 });
 it("propaga conflictos de horario del servidor", async () => {
  api.peticion.mockRejectedValue(new Error("Horario ocupado"));
  await expect(crearCita({servicioId:1,nutricionistaId:2,fecha:"2030-01-07",hora:"09:00"})).rejects.toThrow("Horario ocupado");
 });
});
