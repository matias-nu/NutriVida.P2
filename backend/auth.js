const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db');
const { verificarToken } = require('./middleware/authMiddleware');

const router = express.Router();

function crearToken(usuario) {
  return jwt.sign(
    { id: usuario.id },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
}

router.post('/registro', async (req, res) => {
  try {
    const { nombre, correo, password } = req.body;

    if (
      typeof nombre !== 'string' ||
      typeof correo !== 'string' ||
      typeof password !== 'string' ||
      !nombre.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo) ||
      password.length < 8 ||
      password.length > 72
    ) {
      return res.status(400).json({
        mensaje: 'Nombre, correo o contraseña inválidos'
      });
    }

    const hash = await bcrypt.hash(password, 12);

    const { rows } = await db.query(`
      INSERT INTO usuarios (nombre, correo, password_hash, rol_id)
      SELECT $1, $2, $3, id
      FROM roles
      WHERE nombre = 'Paciente'
      RETURNING id, nombre, correo
    `, [
      nombre.trim(),
      correo.trim().toLowerCase(),
      hash
    ]);

    if (!rows.length) {
      return res.status(500).json({
        mensaje: 'Rol Paciente no configurado'
      });
    }

    const usuario = {
      ...rows[0],
      rol: 'Paciente'
    };

    res.status(201).json({
      mensaje: 'Registro exitoso',
      token: crearToken(usuario),
      usuario
    });
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({
        mensaje: 'El correo ya está registrado'
      });
    }

    console.error('Error de registro:', error);
    res.status(500).json({
      mensaje: 'Error al registrar usuario'
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { correo, password } = req.body;

    if (
      typeof correo !== 'string' ||
      typeof password !== 'string'
    ) {
      return res.status(400).json({
        mensaje: 'Credenciales inválidas'
      });
    }

    const { rows } = await db.query(`
      SELECT u.id, u.nombre, u.correo,
             u.password_hash, r.nombre AS rol
      FROM usuarios u
      JOIN roles r ON r.id = u.rol_id
      WHERE u.correo = $1 AND u.activo = TRUE
    `, [correo.trim().toLowerCase()]);

    const usuarioDB = rows[0];

    if (
      !usuarioDB ||
      !(await bcrypt.compare(password, usuarioDB.password_hash))
    ) {
      return res.status(401).json({
        mensaje: 'Correo o contraseña incorrectos'
      });
    }

    const usuario = {
      id: usuarioDB.id,
      nombre: usuarioDB.nombre,
      correo: usuarioDB.correo,
      rol: usuarioDB.rol
    };

    res.json({
      mensaje: 'Inicio de sesión exitoso',
      token: crearToken(usuario),
      usuario
    });
  } catch (error) {
    console.error('Error de login:', error);
    res.status(500).json({
      mensaje: 'Error al iniciar sesión'
    });
  }
});

router.get('/perfil', verificarToken, (req, res) => {
  res.json({ usuario: req.usuario });
});

module.exports = router;
