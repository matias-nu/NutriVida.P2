import FormAgenda from "../components/organisms/FormAgenda.jsx";

function Agenda() {
    return (
        <>
            <section>
                <h1>Agenda tu hora</h1>
                <p>
                    Completa el formulario y nuestra secretaría confirmará el
                    horario disponible según el profesional que elijas.
                </p>
            </section>

            <section>
                <FormAgenda />
            </section>
        </>
    );
}

export default Agenda;