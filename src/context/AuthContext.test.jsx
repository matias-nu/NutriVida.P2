import {describe,it,expect,vi,beforeEach} from "vitest";
import {renderHook,act,waitFor} from "@testing-library/react";
import {AuthProvider,useAuth} from "./AuthContext.jsx";
import * as api from "../services/api.js";
vi.mock("../services/api.js",()=>({peticion:vi.fn()}));
beforeEach(()=>{localStorage.clear();vi.clearAllMocks();});
const hook=()=>renderHook(()=>useAuth(),{wrapper:AuthProvider});
describe("AuthContext con JWT",()=>{
 it("comienza sin sesión",()=>{expect(hook().result.current.usuario).toBeNull();});
 it("inicia sesión y normaliza rol",async()=>{api.peticion.mockResolvedValue({token:"jwt-prueba",usuario:{id:1,nombre:"Admin",rol:"Administrador"}});const {result}=hook();await act(async()=>{expect(await result.current.iniciarSesion(" ADMIN@EJEMPLO.CL ","clave")).toBe(true);});expect(result.current.usuario.rol).toBe("admin");expect(localStorage.getItem("nutrivida-token")).toBe("jwt-prueba");expect(api.peticion).toHaveBeenCalledWith("/auth/login",expect.objectContaining({method:"POST"}));});
 it("devuelve false ante login inválido",async()=>{api.peticion.mockRejectedValue(new Error("Credenciales inválidas"));const {result}=hook();await act(async()=>{expect(await result.current.iniciarSesion("a@b.cl","mala")).toBe(false);});expect(result.current.usuario).toBeNull();});
 it("registra y luego inicia sesión",async()=>{api.peticion.mockResolvedValueOnce({mensaje:"Creado"}).mockResolvedValueOnce({token:"jwt",usuario:{nombre:"Ana",rol:"Paciente"}});const {result}=hook();await act(async()=>{expect(await result.current.registrar({nombre:" Ana ",correo:"ANA@MAIL.CL",clave:"123456"})).toBe("");});expect(result.current.usuario.rol).toBe("paciente");expect(api.peticion).toHaveBeenNthCalledWith(1,"/auth/registro",expect.objectContaining({method:"POST"}));});
 it("muestra error de registro",async()=>{api.peticion.mockRejectedValue(new Error("Correo registrado"));const {result}=hook();await act(async()=>{expect(await result.current.registrar({nombre:"Ana",correo:"a@b.cl",clave:"123456"})).toBe("Correo registrado");});});
 it("recupera y cierra sesión",()=>{localStorage.setItem("nutrivida-token","jwt");localStorage.setItem("nutrivida-usuario",JSON.stringify({rol:"paciente"}));const {result}=hook();expect(result.current.usuario.rol).toBe("paciente");act(()=>result.current.cerrarSesion());expect(result.current.usuario).toBeNull();expect(localStorage.getItem("nutrivida-token")).toBeNull();});
});
