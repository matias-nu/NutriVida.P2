import CampoTexto from "../atoms/CampoTexto.jsx";



// Props: valor (lo escrito) y onChange (función que recibe el evento)
function Buscador({ valor, onChange }) {
    return (
        <div className="buscador">
            <label htmlFor="buscador" className="solo-lectores">
                Buscar servicio
            </label>
            <CampoTexto
                id="buscador"
                tipo="search"
                valor={valor}
                alCambiar={onChange}
                placeholder="Buscar servicio o plan..."
            />
        </div>
    );
}

export default Buscador;
 