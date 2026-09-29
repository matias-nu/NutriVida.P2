import MensajeError from "../atoms/MensajeError.jsx";

// Molécula: label + input/select/textarea + MensajeError (átomo).
//
// Props:
//  - id, etiqueta, valor, error, onChange
//  - tipo: "text" | "email" | "tel" | "date" | "textarea" | "select"
//  - opciones: [{ valor, texto }] (solo para select)
//  - ...resto: atributos extra (ej: min para fechas)
function CampoFormulario({ id, etiqueta, tipo = "text", valor, error, onChange, opciones = [], ...resto }) {
    const idError = `error-${id}`;

    const propsComunes = {
        id,
        name: id,
        value: valor,
        onChange,
        className: error ? "input-error" : "",
        "aria-invalid": error ? true : false,
        "aria-describedby": idError,
        ...resto,
    };

    let control;
    if (tipo === "textarea") {
        control = <textarea {...propsComunes} />;
    } else if (tipo === "select") {
        control = (
            <select {...propsComunes}>
                {opciones.map((opcion) => (
                    <option key={opcion.valor} value={opcion.valor}>
                        {opcion.texto}
                    </option>
                ))}
            </select>
        );
    } else {
        control = <input type={tipo} {...propsComunes} />;
    }

    return (
        <div>
            <label htmlFor={id}>{etiqueta}</label>
            {control}
            <MensajeError id={idError} texto={error} />
        </div>
    );
}

export default CampoFormulario;