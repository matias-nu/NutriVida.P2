export const consultas = [
    {
        id: "primera-consulta",
        codigo: "CN001",
        tipo: "Consulta",
        titulo: "Primera consulta nutricional",
        descripcion:
            "Evaluación inicial completa: revisamos tus hábitos, antecedentes y objetivos para diseñar tu primer plan alimenticio.",
        duracion: "50 min",
        modalidad: "Presencial",
        profesional: "Nutricionista",
        precio: 35000,
    },
    {
        id: "control",
        codigo: "CN002",
        tipo: "Consulta",
        titulo: "Control nutricional",
        descripcion:
            "Sesión de seguimiento mensual para revisar tus avances y ajustar el plan según tus resultados.",
        duracion: "30 min",
        modalidad: "Presencial",
        profesional: "Nutricionista",
        precio: 25000,
    },
    {
        id: "teleconsulta",
        codigo: "CN004",
        tipo: "Consulta",
        titulo: "Teleconsulta",
        descripcion:
            "Consulta de seguimiento por videollamada, ideal si no puedes asistir de forma presencial.",
        duracion: "30 min",
        modalidad: "Online (video)",
        profesional: "Nutricionista",
        precio: 20000,
    },
];

export const planes = [
    {
        id: "perdida-peso",
        codigo: "PL001",
        tipo: "Plan especializado",
        titulo: "Plan pérdida de peso",
        descripcion:
            "Plan alimenticio adaptado a tu rutina, con controles periódicos para acompañar tu progreso.",
        duracion: null,
        modalidad: "Presencial",
        profesional: "Nutricionista",
        precio: 65000,
    },
    {
        id: "deportiva",
        codigo: "PL003",
        tipo: "Plan especializado",
        titulo: "Plan nutrición deportiva",
        descripcion:
            "Pensado para quienes entrenan con frecuencia y necesitan un aporte energético adecuado.",
        duracion: null,
        modalidad: "Presencial",
        profesional: "Nutricionista",
        precio: 70000,
    },
    {
        id: "infantil",
        codigo: "PL006",
        tipo: "Plan especializado",
        titulo: "Plan alimentación infantil",
        descripcion:
            "Evaluación y plan adaptado a la etapa de desarrollo de niñas y niños.",
        duracion: null,
        modalidad: "Presencial",
        profesional: "Nutricionista",
        precio: 65000,
    },
];

export const evaluaciones = [
    {
        id: "antropometria",
        codigo: "EV001",
        tipo: "Evaluación",
        titulo: "Antropometría completa",
        descripcion:
            "Peso, talla, IMC, circunferencia de cintura, cadera, brazo y % de grasa corporal con bioimpedanciometría.",
        duracion: "20 min",
        modalidad: "Presencial",
        profesional: "Nutricionista",
        precio: 18000,
    },
    {
        id: "bioimpedanciometria",
        codigo: "EV002",
        tipo: "Evaluación",
        titulo: "Bioimpedanciometría",
        descripcion:
            "Medición de composición corporal: masa grasa, masa muscular, agua corporal y edad metabólica.",
        duracion: "15 min",
        modalidad: "Presencial",
        profesional: "Nutricionista",
        precio: 12000,
    },
];

export const talleresGrupales = [
    {
        id: "alimentacion-saludable",
        codigo: "TG001",
        tipo: "Taller grupal",
        titulo: "Taller de alimentación saludable",
        descripcion:
            "Conceptos básicos de alimentación equilibrada y lectura de etiquetas. Máx. 10 personas.",
        duracion: "90 min",
        modalidad: "Presencial (grupo)",
        profesional: "Nutricionista",
        precio: 15000,
    },
    {
        id: "cocina-nutritiva",
        codigo: "TG002",
        tipo: "Taller grupal",
        titulo: "Taller de cocina nutritiva",
        descripcion:
            "Preparación de recetas saludables. Incluye degustación. Máx. 8 personas.",
        duracion: "120 min",
        modalidad: "Presencial (grupo)",
        profesional: "Nutricionista",
        precio: 20000,
    },
];

// Los tres que aparecen en la página de Inicio
export const serviciosDestacados = [
    {
        id: "consulta",
        titulo: "Consulta nutricional",
        descripcion:
            "Evaluación de tus hábitos y necesidades nutricionales para crear un plan adecuado para ti.",
    },
    {
        id: "plan",
        titulo: "Plan alimenticio personalizado",
        descripcion:
            "Planes de alimentación adaptados a tus objetivos, preferencias y estilo de vida.",
    },
    {
        id: "seguimiento",
        titulo: "Seguimiento nutricional",
        descripcion:
            "Acompañamiento y seguimiento para evaluar tus avances y mantener tus objetivos a largo plazo.",
    },
];
