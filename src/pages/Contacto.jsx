import FormContacto from "../components/organisms/FormContacto.jsx";

function Contacto() {
    return (
        <>
            <section id="contacto-hero">
                <div id="contacto-texto">
                    <h1>Contacto</h1>
                    <p>Si prefieres, escríbenos directamente o visítanos en Temuco.</p>
                    <p><strong>Teléfono:</strong> +56 45 234 5678</p>
                    <p><strong>Correo:</strong> contacto@nutrivida.cl</p>
                    <p><strong>Dirección:</strong> Av. Alemania 1234, Temuco</p>
                    <p><strong>Horario:</strong> Lunes a sábado, según disponibilidad</p>
                </div>

                <iframe
                    id="mapa-contacto"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1556.1970636767842!2d-72.62304846679548!3d-38.73171709395048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9614d3f5dbba0d4b%3A0xd83e0e73ecb973b5!2sAv.%20Alemania%2C%20Temuco%2C%20Araucan%C3%ADa!5e0!3m2!1ses-419!2scl!4v1788729510261!5m2!1ses-419!2scl"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    title="Ubicación de NutriVida en Temuco"
                ></iframe>
            </section>

            <section>
                <h2>Envíanos un mensaje</h2>
                <FormContacto />
            </section>
        </>
    );
}

export default Contacto;