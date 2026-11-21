import {describe,it,expect,beforeEach} from "vitest";
import {render,screen} from "@testing-library/react";
import {MemoryRouter,Routes,Route} from "react-router-dom";
import {AuthProvider} from "../../context/AuthContext.jsx";
import RutaProtegida from "./RutaProtegida.jsx";
beforeEach(()=>localStorage.clear());
function sesion(rol){localStorage.setItem("nutrivida-token","jwt-prueba");localStorage.setItem("nutrivida-usuario",JSON.stringify({nombre:"Prueba",rol}));}
function dibujar(roles){render(<AuthProvider><MemoryRouter initialEntries={["/privada"]}><Routes><Route path="/login" element={<h1>Login</h1>}/><Route path="/panel" element={<h1>Panel</h1>}/><Route path="/mis-citas" element={<h1>Mis citas</h1>}/><Route path="/privada" element={<RutaProtegida roles={roles}><h1>Privado</h1></RutaProtegida>}/></Routes></MemoryRouter></AuthProvider>);}
describe("RutaProtegida JWT",()=>{
 it("redirige al login sin token",()=>{dibujar();expect(screen.getByRole("heading",{name:"Login"})).toBeInTheDocument();});
 it("permite ruta con sesión",()=>{sesion("admin");dibujar();expect(screen.getByRole("heading",{name:"Privado"})).toBeInTheDocument();});
 it("paciente no entra al panel",()=>{sesion("paciente");dibujar(["admin","nutricionista"]);expect(screen.getByRole("heading",{name:"Mis citas"})).toBeInTheDocument();});
 it("nutricionista no entra a rutas admin",()=>{sesion("nutricionista");dibujar(["admin"]);expect(screen.getByRole("heading",{name:"Panel"})).toBeInTheDocument();});
});
