import Boton from "../atoms/Boton.jsx";

// Molécula: fila de botones (átomo Boton) para filtrar el catálogo por tipo de servicio.
// Props: tipos (lista de textos), seleccionado (el tipo activo) y onSeleccionar (función).
function FiltroTipos({ tipos, seleccionado, onSeleccionar }) {
    // Se agrega "Todos" al inicio para poder quitar el filtro
    const opciones = ["Todos", ...tipos];

    return (
        <div className="filtro-tipos" role="group" aria-label="Filtrar por tipo de servicio">
            {opciones.map((tipo) => (
                <Boton
                    key={tipo}
                    className={tipo === seleccionado ? "activo" : ""}
                    onClick={() => onSeleccionar(tipo)}
                >
                    {tipo}
                </Boton>
            ))}
        </div>
    );
}

export default FiltroTipos;
 