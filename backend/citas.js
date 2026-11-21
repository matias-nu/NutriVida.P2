const express = require('express');
const db = require('./db');
const { verificarToken, permitirRoles } = require('./middleware/authMiddleware');

const router = express.Router();
router.use(verificarToken);

router.get('/', async (req, res) => {
  try {
    const { id, rol } = req.usuario;
    let filtro = '';
    const valores = [];
    if (rol === 'Paciente') {
      filtro = 'WHERE c.paciente_id=$1';
      valores.push(id);
    } else if (rol === 'Nutricionista') {
      filtro = 'WHERE c.nutricionista_id=$1';
      valores.push(id);
    }
    const { rows } = await db.query(`
      SELECT c.id, c.paciente_id, c.nutricionista_id,
             c.servicio_id,
             TO_CHAR(c.fecha_hora, 'YYYY-MM-DD"T"HH24:MI:SS') AS fecha_hora,
             c.estado, c.observaciones, c.fecha_creacion,
             p.correo AS correo,
             p.nombre AS paciente_nombre,
             n.nombre AS nutricionista_nombre,
             s.nombre AS servicio_nombre
      FROM citas c
      JOIN usuarios p ON p.id=c.paciente_id
      JOIN usuarios n ON n.id=c.nutricionista_id
      JOIN servicios s ON s.id=c.servicio_id
      ${filtro}
      ORDER BY c.fecha_hora DESC
    `, valores);
    res.json(rows);
  } catch (e) {
    res.status(500).json({ mensaje: 'Error al obtener citas' });
  }
});

router.post('/', permitirRoles('Paciente'), async (req, res) => {
  try {
    const { nutricionista_id, servicio_id, fecha_hora, observaciones } = req.body;
    if (!Number.isInteger(Number(nutricionista_id)) ||
        !Number.isInteger(Number(servicio_id)) ||
        !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?$/.test(fecha_hora || '')) {
      return res.status(400).json({ mensaje: 'Datos de cita inválidos' });
    }

    const hora = fecha_hora.slice(11, 16);
    const fecha = fecha_hora.slice(0, 10);
    const validas = ['09:00','10:00','11:00','12:00','14:00','15:00','16:00'];
    if (!validas.includes(hora) || Number.isNaN(Date.parse(`${fecha}T12:00:00Z`))) {
      return res.status(400).json({ mensaje: 'Horario no disponible' });
    }

    const { rows } = await db.query(`
      INSERT INTO citas
        (paciente_id, nutricionista_id, servicio_id, fecha_hora, observaciones)
      SELECT $1, n.id, s.id, $4::timestamp, $5
      FROM usuarios n
      JOIN roles r ON r.id=n.rol_id
      CROSS JOIN servicios s
      WHERE n.id=$2 AND r.nombre='Nutricionista'
        AND n.activo=TRUE AND s.id=$3 AND s.activo=TRUE
        AND $4::timestamp > NOW()
      RETURNING *
    `, [
      req.usuario.id, nutricionista_id, servicio_id,
      fecha_hora, observaciones || null
    ]);

    if (!rows.length) {
      return res.status(400).json({ mensaje: 'Profesional, servicio o fecha no disponible' });
    }
    res.status(201).json(rows[0]);
  } catch (e) {
    res.status(e.code === '23505' ? 409 : 400).json({
      mensaje: e.code === '23505'
        ? 'Ese horario ya está reservado'
        : 'No se pudo crear la cita'
    });
  }
});

router.patch('/:id/estado', async (req, res) => {
  const { estado } = req.body;
  if (!['Confirmada', 'Cancelada', 'Completada'].includes(estado)) {
    return res.status(400).json({ mensaje: 'Estado inválido' });
  }
  try {
    const { rows } = await db.query('SELECT * FROM citas WHERE id=$1', [req.params.id]);
    if (!rows.length) return res.status(404).json({ mensaje: 'Cita no encontrada' });

    const cita = rows[0];
    const { rol, id } = req.usuario;
    const permitido =
      rol === 'Administrador' ||
      (rol === 'Paciente' && cita.paciente_id === id && estado === 'Cancelada') ||
      (rol === 'Nutricionista' && cita.nutricionista_id === id);

    if (!permitido) return res.status(403).json({ mensaje: 'Sin permisos' });
    if (['Cancelada', 'Completada'].includes(cita.estado)) {
      return res.status(409).json({ mensaje: 'La cita ya está cerrada' });
    }

    const resultado = await db.query(
      'UPDATE citas SET estado=$1 WHERE id=$2 RETURNING *',
      [estado, req.params.id]
    );
    res.json(resultado.rows[0]);
  } catch (e) {
    res.status(e.code === '23505' ? 409 : 400).json({
      mensaje: 'No se pudo actualizar la cita'
    });
  }
});

module.exports = router;
