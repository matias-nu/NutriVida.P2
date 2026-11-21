INSERT INTO servicios
(nombre, descripcion, precio, duracion_minutos, activo)
SELECT v.nombre, v.descripcion, v.precio, v.duracion, TRUE
FROM (VALUES
  ('Evaluación nutricional inicial',
   'Evaluación de hábitos alimentarios y objetivos personales.',
   25000, 60),
  ('Control nutricional',
   'Seguimiento y ajustes del plan alimentario.',
   18000, 30),
  ('Nutrición deportiva',
   'Asesoría nutricional para actividad física y rendimiento.',
   30000, 60),
  ('Educación alimentaria',
   'Orientación para desarrollar hábitos saludables.',
   20000, 45)
) AS v(nombre, descripcion, precio, duracion)
WHERE NOT EXISTS (
  SELECT 1 FROM servicios s WHERE s.nombre = v.nombre
);
