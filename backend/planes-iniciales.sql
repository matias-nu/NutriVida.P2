INSERT INTO planes_nutricionales
(nombre, descripcion, precio, duracion_dias, activo)
SELECT v.nombre, v.descripcion, v.precio, v.dias, TRUE
FROM (VALUES
  ('Plan nutricional mensual',
   'Seguimiento nutricional durante 30 días.',
   45000, 30),
  ('Plan de alimentación saludable',
   'Programa de hábitos alimentarios durante 60 días.',
   75000, 60),
  ('Plan nutricional deportivo',
   'Programa nutricional para objetivos deportivos.',
   90000, 90)
) AS v(nombre, descripcion, precio, dias)
WHERE NOT EXISTS (
  SELECT 1 FROM planes_nutricionales p WHERE p.nombre = v.nombre
);
