import { describe,it,expect,vi,beforeEach } from "vitest";
import * as api from "./api.js";
import {listarServicios,obtenerServicio,crearServicio,actualizarServicio,eliminarServicio} from "./servicioService.js";
vi.mock("./api.js",()=>({peticion:vi.fn()}));
beforeEach(()=>vi.clearAllMocks());
describe("servicioService (API REST)",()=>{
 it("adapta el catálogo",async()=>{api.peticion.mockResolvedValue([{id:1,nombre:"Control",precio:"25000",duracion_minutos:60}]);expect(await listarServicios()).toMatchObject([{id:"1",titulo:"Control",precio:25000,duracion:"60 min"}]);});
 it("busca por id",async()=>{api.peticion.mockResolvedValue([{id:1,nombre:"Control",precio:25000}]);expect((await obtenerServicio(1)).titulo).toBe("Control");expect(await obtenerServicio(999)).toBeNull();});
 it("crea servicio en backend",async()=>{api.peticion.mockResolvedValue({id:2});await crearServicio({titulo:"Yoga",descripcion:"Taller",precio:9000,duracion:"45 min"});expect(api.peticion).toHaveBeenCalledWith("/servicios",{method:"POST",body:JSON.stringify({nombre:"Yoga",descripcion:"Taller",precio:9000,duracion_minutos:45})});});
 it("actualiza mediante PUT",async()=>{api.peticion.mockResolvedValue({});await actualizarServicio(2,{titulo:"Yoga",precio:10000,duracion:"60 min"});expect(api.peticion).toHaveBeenCalledWith("/servicios/2",expect.objectContaining({method:"PUT"}));});
 it("desactiva mediante DELETE",async()=>{api.peticion.mockResolvedValue({});await eliminarServicio(2);expect(api.peticion).toHaveBeenCalledWith("/servicios/2",{method:"DELETE"});});
 it("propaga errores del backend",async()=>{api.peticion.mockRejectedValue(new Error("No autorizado"));await expect(listarServicios()).rejects.toThrow("No autorizado");});
});
