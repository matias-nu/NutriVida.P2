import {describe,it,expect,vi,beforeEach} from "vitest";
import {render,screen,waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AdminServicios from "./AdminServicios.jsx";
import * as ctx from "../context/ServiciosContext.jsx";
vi.mock("../context/ServiciosContext.jsx",()=>({useServicios:vi.fn()}));
const servicio={id:"1",titulo:"Control nutricional",tipo:"Consulta",precio:25000,duracion:"60 min",descripcion:"Primera consulta"};
const crear=vi.fn(),actualizar=vi.fn(),eliminar=vi.fn();
beforeEach(()=>{vi.clearAllMocks();crear.mockResolvedValue({});actualizar.mockResolvedValue({});eliminar.mockResolvedValue({});ctx.useServicios.mockReturnValue({servicios:[servicio],cargando:false,error:"",crear,actualizar,eliminar});});
describe("AdminServicios API",()=>{
 it("muestra servicios del contexto",()=>{render(<AdminServicios/>);expect(screen.getByText("Control nutricional")).toBeInTheDocument();});
 it("abre formulario nuevo",async()=>{render(<AdminServicios/>);await userEvent.click(screen.getByRole("button",{name:"Nuevo servicio"}));expect(screen.getByLabelText("Nombre")).toBeInTheDocument();});
 it("permite editar un servicio",async()=>{render(<AdminServicios/>);await userEvent.click(screen.getByRole("button",{name:"Editar"}));expect(screen.getByLabelText("Precio (CLP)")).toBeInTheDocument();});
 it("solicita confirmación antes de desactivar",async()=>{const spy=vi.spyOn(window,"confirm").mockReturnValue(false);render(<AdminServicios/>);await userEvent.click(screen.getByRole("button",{name:"Eliminar"}));await userEvent.click(screen.getByRole("button",{name:"Sí"}));expect(spy).toHaveBeenCalled();expect(eliminar).not.toHaveBeenCalled();spy.mockRestore();});
});
