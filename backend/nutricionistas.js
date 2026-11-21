const express = require('express');
const db = require('./db');

const router = express.Router();
const HORAS = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00'];

router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query(`
      SELECT u.id, u.nombre, u.correo
      FROM usuarios u JOIN roles r ON r.id=u.rol_id
      WHERE r.nombre='Nutricionista' AND u.activo=TRUE
      ORDER BY u.nombre
    `);
    res.json(rows);
  } catch (e) {
    res.status(500).json({ mensaje: 'Error al obtener nutricionistas' });
  }
});

router.get('/:id/horarios', async (req, res) => {
  const { fecha } = req.query;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha || '') ||
      Number.isNaN(Date.parse(`${fecha}T12:00:00Z`))) {
    return res.status(400).json({ mensaje: 'Fecha inválida' });
  }
  try {
    const profesional = await db.query(`
      SELECT u.id FROM usuarios u
      JOIN roles r ON r.id=u.rol_id
      WHERE u.id=$1 AND u.activo=TRUE AND r.nombre='Nutricionista'
    `, [req.params.id]);
    if (!profesional.rowCount) return res.status(404).json({ mensaje: 'Nutricionista no encontrado' });

    const { rows } = await db.query(`
      SELECT TO_CHAR(fecha_hora, 'HH24:MI') AS hora
      FROM citas
      WHERE nutricionista_id=$1
        AND fecha_hora::date=$2::date
        AND estado IN ('Pendiente','Confirmada')
    `, [req.params.id, fecha]);

    const ocupadas = new Set(rows.map(r => r.hora));
    res.json({
      fecha,
      nutricionista_id: Number(req.params.id),
      horarios: HORAS.filter(h => !ocupadas.has(h))
    });
  } catch (e) {
    res.status(400).json({ mensaje: 'No se pudieron obtener horarios' });
  }
});

module.exports = router;
