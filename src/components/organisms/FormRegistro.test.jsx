import {describe,it,expect,vi,beforeEach} from "vitest";
import {render,screen,waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {MemoryRouter,Routes,Route} from "react-router-dom";
import {AuthProvider} from "../../context/AuthContext.jsx";
import * as api from "../../services/api.js";
import FormRegistro from "./FormRegistro.jsx";
vi.mock("../../services/api.js",()=>({peticion:vi.fn()}));
beforeEach(()=>{localStorage.clear();vi.clearAllMocks();});
function dibujar(){render(<AuthProvider><MemoryRouter initialEntries={["/registro"]}><Routes><Route path="/registro" element={<FormRegistro/>}/><Route path="/mis-citas" element={<h1>Mis citas</h1>}/></Routes></MemoryRouter></AuthProvider>);}
async function llenar(correo="ana@correo.cl"){await userEvent.type(screen.getByLabelText("Nombre completo"),"Ana Pérez");await userEvent.type(screen.getByLabelText("Correo electrónico"),correo);await userEvent.type(screen.getByLabelText("Contraseña"),"abc123");await userEvent.type(screen.getByLabelText("Repite la contraseña"),"abc123");await userEvent.click(screen.getByRole("button",{name:"Crear cuenta"}));}
describe("FormRegistro con API",()=>{
 it("valida campos vacíos",async()=>{dibujar();await userEvent.click(screen.getByRole("button",{name:"Crear cuenta"}));expect(screen.getByText("Ingresa tu nombre completo.")).toBeInTheDocument();expect(api.peticion).not.toHaveBeenCalled();});
 it("valida claves diferentes",async()=>{dibujar();await userEvent.type(screen.getByLabelText("Contraseña"),"abc123");await userEvent.type(screen.getByLabelText("Repite la contraseña"),"abc999");await userEvent.click(screen.getByRole("button",{name:"Crear cuenta"}));expect(screen.getByText("Las contraseñas no coinciden.")).toBeInTheDocument();});
 it("registra y redirige al paciente",async()=>{api.peticion.mockResolvedValueOnce({mensaje:"Creado"}).mockResolvedValueOnce({token:"jwt",usuario:{nombre:"Ana",rol:"Paciente"}});dibujar();await llenar();await waitFor(()=>expect(screen.getByRole("heading",{name:"Mis citas"})).toBeInTheDocument());expect(api.peticion).toHaveBeenCalledTimes(2);});
 it("muestra rechazo del servidor",async()=>{api.peticion.mockRejectedValue(new Error("Ya existe una cuenta con ese correo."));dibujar();await llenar();await waitFor(()=>expect(screen.getByRole("alert")).toHaveTextContent("Ya existe una cuenta con ese correo."));});
});
