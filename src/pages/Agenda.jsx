import FormAgenda from "../components/organisms/FormAgenda.jsx";

function Agenda() {
    return (
        <>
            <section>
                <h1>Agenda tu hora</h1>
                <p>
                    Reserva tu hora y comienza a transformar tu salud
                    Sabemos que dar el primer paso requiere decisión, por eso diseñamos un proceso de agendamiento rápido, sencillo y sin complicaciones 
                </p>

                <p>
                    Elige a tu profesional ideal, déjanos tus datos y nos encargamos de todo el resto
                </p>
            </section>

            <section>
                <FormAgenda /> 
            </section>
        </>
    );
}

export default Agenda;