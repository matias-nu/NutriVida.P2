import {describe,it,expect,vi} from "vitest";
import {render,screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TablaCitas from "./TablaCitas.jsx";
const citas=[{id:1,servicio:"Control",nutricionista:"Carolina",fecha:"2030-01-07",hora:"09:00",nombre:"Ana",correo:"ana@correo.cl",estado:"pendiente"}];
describe("TablaCitas",()=>{
 it("muestra estado vacío",()=>{render(<TablaCitas citas={[]} onCambiarEstado={()=>{}} onEliminar={()=>{}}/>);expect(screen.getByText("Todavía no hay citas registradas.")).toBeInTheDocument();});
 it("cambia estado mediante selector",async()=>{const fn=vi.fn();render(<TablaCitas citas={citas} onCambiarEstado={fn} onEliminar={()=>{}}/>);await userEvent.selectOptions(screen.getByLabelText("Cambiar estado de la cita 1"),"confirmada");expect(fn).toHaveBeenCalledWith(1,"confirmada");});
 it("cancelar requiere confirmación nativa",async()=>{const fn=vi.fn();const spy=vi.spyOn(window,"confirm").mockReturnValue(true);render(<TablaCitas citas={citas} onCambiarEstado={()=>{}} onEliminar={fn}/>);await userEvent.click(screen.getByRole("button",{name:"Cancelar"}));expect(spy).toHaveBeenCalled();expect(fn).toHaveBeenCalledWith(1);spy.mockRestore();});
 it("cita completada no permite acciones",()=>{render(<TablaCitas citas={[{...citas[0],estado:"completada"}]} onCambiarEstado={()=>{}} onEliminar={()=>{}}/>);expect(screen.getByText("Sin acciones disponibles")).toBeInTheDocument();});
});
