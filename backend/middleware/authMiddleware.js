const jwt = require('jsonwebtoken');
const db = require('../db');

async function verificarToken(req, res, next) {
  const authorization = req.headers.authorization || '';
  const token = authorization.startsWith('Bearer ')
    ? authorization.slice(7)
    : null;

  if (!token) {
    return res.status(401).json({
      mensaje: 'Debes iniciar sesión'
    });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const { rows } = await db.query(`
      SELECT u.id, u.nombre, u.correo, r.nombre AS rol
      FROM usuarios u
      JOIN roles r ON r.id = u.rol_id
      WHERE u.id = $1 AND u.activo = TRUE
    `, [payload.id]);

    if (!rows.length) {
      return res.status(401).json({
        mensaje: 'Usuario no autorizado'
      });
    }

    req.usuario = rows[0];
    next();
  } catch (error) {
    return res.status(401).json({
      mensaje: 'Sesión inválida o expirada'
    });
  }
}

function permitirRoles(...roles) {
  return (req, res, next) => {
    if (!req.usuario || !roles.includes(req.usuario.rol)) {
      return res.status(403).json({
        mensaje: 'No tienes permisos'
      });
    }

    next();
  };
}

module.exports = { verificarToken, permitirRoles };
