const express = require('express');
const db = require('./db');
const { verificarToken, permitirRoles } = require('./middleware/authMiddleware');

function crearCatalogo(tabla, campos) {
  const router = express.Router();

  router.get('/', async (req, res) => {
    try {
      const { rows } = await db.query(
        `SELECT * FROM ${tabla} WHERE activo=TRUE ORDER BY id`
      );
      res.json(rows);
    } catch (e) {
      res.status(500).json({ mensaje: 'Error al obtener catálogo' });
    }
  });

  router.post('/', verificarToken, permitirRoles('Administrador'), async (req, res) => {
    try {
      const valores = campos.map(c => req.body[c]);
      if (!req.body.nombre?.trim() || valores.some(v => v === undefined || v === null)) {
        return res.status(400).json({ mensaje: 'Faltan datos obligatorios' });
      }
      const placeholders = campos.map((_, i) => `$${i + 1}`).join(',');
      const { rows } = await db.query(
        `INSERT INTO ${tabla} (${campos.join(',')}) VALUES (${placeholders}) RETURNING *`,
        valores
      );
      res.status(201).json(rows[0]);
    } catch (e) {
      res.status(400).json({ mensaje: 'Datos inválidos' });
    }
  });

  router.put('/:id', verificarToken, permitirRoles('Administrador'), async (req, res) => {
    try {
      const permitidos = [...campos, 'activo'];
      const presentes = permitidos.filter(c => Object.prototype.hasOwnProperty.call(req.body, c));
      if (!presentes.length) return res.status(400).json({ mensaje: 'Sin cambios' });
      const asignaciones = presentes.map((c, i) => `${c}=$${i + 1}`).join(',');
      const valores = presentes.map(c => req.body[c]);
      const { rows } = await db.query(
        `UPDATE ${tabla} SET ${asignaciones} WHERE id=$${presentes.length + 1} RETURNING *`,
        [...valores, req.params.id]
      );
      if (!rows.length) return res.status(404).json({ mensaje: 'No encontrado' });
      res.json(rows[0]);
    } catch (e) {
      res.status(400).json({ mensaje: 'Datos inválidos' });
    }
  });

  router.delete('/:id', verificarToken, permitirRoles('Administrador'), async (req, res) => {
    try {
      const { rowCount } = await db.query(
        `UPDATE ${tabla} SET activo=FALSE WHERE id=$1`,
        [req.params.id]
      );
      if (!rowCount) return res.status(404).json({ mensaje: 'No encontrado' });
      res.json({ mensaje: 'Registro desactivado' });
    } catch (e) {
      res.status(400).json({ mensaje: 'ID inválido' });
    }
  });

  return router;
}

module.exports = crearCatalogo;
