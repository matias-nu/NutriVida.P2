// Átomo: texto rojo que aparece bajo un campo cuando hay un error.
function MensajeError({ id, texto }) {
    return (
        <small id={id} className="error">
            {texto}
        </small>
    );
}

export default MensajeError;