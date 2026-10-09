import { useState } from "react";
import FiltroTipos from "../molecules/FiltroTipos.jsx";
import Buscador from "../molecules/Buscador.jsx";
import Tarjeta from "../molecules/Tarjeta.jsx";
import { filtrarServicios, obtenerTipos } from "../../utils/filtros.js";

// Organismo: catálogo completo con filtro por tipo y buscador.
// Prop: servicios (la lista que llega desde la página, que la lee del context).
function ListaServicios({ servicios }) {
    // Dos estados: el tipo elegido y el texto buscado.
    // Al cambiar cualquiera de los dos, React vuelve a dibujar la lista.
    const [tipo, setTipo] = useState("Todos");
    const [texto, setTexto] = useState("");

    const tipos = obtenerTipos(servicios);
    const visibles = filtrarServicios(servicios, tipo, texto);

    return (
        <>
            <div className="filtros">
                <FiltroTipos tipos={tipos} seleccionado={tipo} onSeleccionar={setTipo} />
                <Buscador valor={texto} onChange={(evento) => setTexto(evento.target.value)} />
            </div>

            <p role="status" className="resumen-filtro">
                Mostrando {visibles.length} de {servicios.length} servicios
            </p>

            {visibles.length === 0 ? (
                <p className="sin-resultados">
                    No encontramos servicios con ese filtro. Prueba con otra búsqueda.
                </p>
            ) : (
                <div className="grilla-servicios">
                    {visibles.map((servicio) => (
                        <Tarjeta
                            key={servicio.id}
                            id={servicio.id}
                            titulo={servicio.titulo}
                            descripcion={servicio.descripcion}
                            precio={servicio.precio}
                            modalidad={servicio.modalidad}
                        />
                    ))}
                </div>
            )}
        </>
    );
}

export default ListaServicios;

 