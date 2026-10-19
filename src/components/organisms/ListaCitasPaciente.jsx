import FilaCita from "../molecules/FilaCita.jsx";
import Boton from "../atoms/Boton.jsx";

// Organismo: lista de las citas de un paciente, con botón para cancelar las vigentes.
// Props: citas (lista) y onCancelar (función que recibe el id de la cita).
function ListaCitasPaciente({ citas, onCancelar }) {
    if (citas.length === 0) {
        return <p className="sin-resultados">Todavía no tienes citas agendadas.</p>;
    }

    return (
        <ul className="lista-citas">
            {citas.map((cita) => (
                <FilaCita
                    key={cita.id}
                    cita={cita}
                    acciones={
                        cita.estado !== "cancelada" && (
                            <Boton onClick={() => onCancelar(cita.id)}>Cancelar</Boton>
                        )
                    }
                />
            ))}
        </ul>
    );
}

export default ListaCitasPaciente;