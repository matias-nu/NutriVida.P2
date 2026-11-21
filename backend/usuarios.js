const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('./db');
const { verificarToken, permitirRoles } = require('./middleware/authMiddleware');

const router = express.Router();
router.use(verificarToken, permitirRoles('Administrador'));

router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query(`
      SELECT u.id, u.nombre, u.correo, r.nombre AS rol,
             u.activo, u.fecha_registro
      FROM usuarios u
      JOIN roles r ON r.id = u.rol_id
      ORDER BY u.id
    `);
    res.json(rows);
  } catch (e) {
    res.status(500).json({ mensaje: 'Error al obtener usuarios' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { rows } = await db.query(`
      SELECT u.id, u.nombre, u.correo, r.nombre AS rol, u.activo
      FROM usuarios u JOIN roles r ON r.id = u.rol_id
      WHERE u.id = $1
    `, [req.params.id]);
    if (!rows.length) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json(rows[0]);
  } catch (e) {
    res.status(400).json({ mensaje: 'ID inválido' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { nombre, correo, password, rol } = req.body;
    if (!nombre?.trim() || !correo?.trim() || typeof password !== 'string' ||
        password.length < 8 || password.length > 72 ||
        !['Administrador', 'Nutricionista', 'Paciente'].includes(rol)) {
      return res.status(400).json({ mensaje: 'Datos inválidos' });
    }
    const hash = await bcrypt.hash(password, 12);
    const { rows } = await db.query(`
      INSERT INTO usuarios (nombre, correo, password_hash, rol_id)
      SELECT $1, $2, $3, id FROM roles WHERE nombre = $4
      RETURNING id, nombre, correo, activo
    `, [nombre.trim(), correo.trim().toLowerCase(), hash, rol]);
    res.status(201).json({ ...rows[0], rol });
  } catch (e) {
    res.status(e.code === '23505' ? 409 : 500).json({
      mensaje: e.code === '23505' ? 'Correo ya registrado' : 'Error al crear usuario'
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { nombre, correo, rol, activo } = req.body;
    if (!nombre?.trim() || !correo?.trim() ||
        !['Administrador', 'Nutricionista', 'Paciente'].includes(rol) ||
        typeof activo !== 'boolean') {
      return res.status(400).json({ mensaje: 'Datos inválidos' });
    }
    if (Number(req.params.id) === Number(req.usuario.id) &&
        (rol !== 'Administrador' || !activo)) {
      return res.status(400).json({ mensaje: 'No puedes quitarte tu propio acceso' });
    }
    const { rows } = await db.query(`
      UPDATE usuarios SET nombre=$1, correo=$2,
        rol_id=(SELECT id FROM roles WHERE nombre=$3), activo=$4
      WHERE id=$5
      RETURNING id, nombre, correo, activo
    `, [nombre.trim(), correo.trim().toLowerCase(), rol, activo, req.params.id]);
    if (!rows.length) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json({ ...rows[0], rol });
  } catch (e) {
    res.status(e.code === '23505' ? 409 : 400).json({ mensaje: 'No se pudo actualizar el usuario' });
  }
});

router.delete('/:id', async (req, res) => {
  if (Number(req.params.id) === Number(req.usuario.id)) {
    return res.status(400).json({ mensaje: 'No puedes desactivar tu propia cuenta' });
  }
  try {
    const { rowCount } = await db.query(
      'UPDATE usuarios SET activo=FALSE WHERE id=$1',
      [req.params.id]
    );
    if (!rowCount) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json({ mensaje: 'Usuario desactivado' });
  } catch (e) {
    res.status(400).json({ mensaje: 'ID inválido' });
  }
});

module.exports = router;
