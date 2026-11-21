import {describe,it,expect,vi,beforeEach} from "vitest";
import {renderHook,act,waitFor} from "@testing-library/react";
import {AuthProvider} from "./AuthContext.jsx";
import {CitasProvider,useCitas} from "./CitasContext.jsx";
import * as api from "../services/citaService.js";
vi.mock("../services/citaService.js",()=>({listarCitas:vi.fn(),crearCita:vi.fn(),actualizarCita:vi.fn(),eliminarCita:vi.fn()}));
const Wrapper=({children})=><AuthProvider><CitasProvider>{children}</CitasProvider></AuthProvider>;
const hook=()=>renderHook(()=>useCitas(),{wrapper:Wrapper});
beforeEach(()=>{localStorage.clear();vi.clearAllMocks();api.listarCitas.mockResolvedValue([]);});
describe("CitasContext integrado",()=>{
 it("requiere provider",()=>{expect(()=>renderHook(()=>useCitas())).toThrow("useCitas debe usarse dentro de CitasProvider");});
 it("sin sesión mantiene lista vacía",async()=>{const {result}=hook();expect(result.current.citas).toEqual([]);expect(api.listarCitas).not.toHaveBeenCalled();});
 it("carga citas para usuario autenticado",async()=>{localStorage.setItem("nutrivida-token","jwt");localStorage.setItem("nutrivida-usuario",JSON.stringify({rol:"paciente"}));api.listarCitas.mockResolvedValue([{id:7,nombre:"Ana"}]);const {result}=hook();await waitFor(()=>expect(result.current.citas).toHaveLength(1));expect(result.current.obtener(7).nombre).toBe("Ana");});
 it("agenda y recarga desde API",async()=>{localStorage.setItem("nutrivida-token","jwt");localStorage.setItem("nutrivida-usuario",JSON.stringify({rol:"paciente"}));api.crearCita.mockResolvedValue({id:9});const {result}=hook();await act(async()=>{expect(await result.current.agendar({servicioId:1})).toEqual({id:9});});expect(api.crearCita).toHaveBeenCalled();expect(api.listarCitas).toHaveBeenCalled();});
 it("actualiza y cancela vía API",async()=>{localStorage.setItem("nutrivida-token","jwt");localStorage.setItem("nutrivida-usuario",JSON.stringify({rol:"paciente"}));api.actualizarCita.mockResolvedValue({});api.eliminarCita.mockResolvedValue({});const {result}=hook();await act(async()=>{await result.current.actualizar(1,{estado:"confirmada"});await result.current.eliminar(1);});expect(api.actualizarCita).toHaveBeenCalledWith(1,{estado:"confirmada"});expect(api.eliminarCita).toHaveBeenCalledWith(1);});
});
