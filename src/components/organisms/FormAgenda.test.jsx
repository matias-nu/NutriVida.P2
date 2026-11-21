import {describe,it,expect,vi,beforeEach} from "vitest";
import {render,screen,waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {MemoryRouter} from "react-router-dom";
import FormAgenda from "./FormAgenda.jsx";
import * as nutricionistas from "../../services/nutricionistaService.js";
vi.mock("../../services/nutricionistaService.js",()=>({listarNutricionistas:vi.fn(),consultarHorarios:vi.fn()}));
vi.mock("../../context/ServiciosContext.jsx",()=>({useServicios:()=>({servicios:[{id:"1",titulo:"Control nutricional",tipo:"Consulta",modalidad:"Presencial",precio:25000}]})}));
vi.mock("../../context/CitasContext.jsx",()=>({useCitas:()=>({citas:[],agendar:vi.fn()})}));
vi.mock("../../context/AuthContext.jsx",()=>({useAuth:()=>({usuario:null})}));
beforeEach(()=>{vi.clearAllMocks();nutricionistas.listarNutricionistas.mockResolvedValue([{id:2,nombre:"Carolina"}]);nutricionistas.consultarHorarios.mockResolvedValue(["09:00","10:00"]);});
function dibujar(){render(<MemoryRouter><FormAgenda/></MemoryRouter>);}
describe("FormAgenda con horarios de API",()=>{
 it("muestra validaciones al enviar vacío",async()=>{dibujar();await userEvent.click(screen.getByRole("button",{name:"Revisar mi cita"}));expect(screen.getByText("Selecciona un servicio.")).toBeInTheDocument();expect(screen.getByText("Selecciona un profesional.")).toBeInTheDocument();});
 it("carga nutricionistas desde API",async()=>{dibujar();await waitFor(()=>expect(screen.getByRole("option",{name:"Carolina"})).toBeInTheDocument());expect(nutricionistas.listarNutricionistas).toHaveBeenCalled();});
 it("consulta horarios al seleccionar fecha y profesional",async()=>{dibujar();await waitFor(()=>expect(screen.getByRole("option",{name:"Carolina"})).toBeInTheDocument());await userEvent.selectOptions(screen.getByLabelText("Nutricionista preferido"),"2");const fecha=screen.getByLabelText("Fecha preferida");await userEvent.type(fecha,"2030-01-07");await waitFor(()=>expect(nutricionistas.consultarHorarios).toHaveBeenCalledWith("2","2030-01-07"));});
});
