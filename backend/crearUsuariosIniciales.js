require('dotenv').config();

const bcrypt = require('bcryptjs');
const db = require('./db');

async function crearUsuario(nombre, correo, password, rol) {
  const hash = await bcrypt.hash(password, 12);

  const resultado = await db.query(`
    INSERT INTO usuarios (nombre, correo, password_hash, rol_id)
    SELECT $1, $2, $3, id
    FROM roles
    WHERE nombre = $4
    ON CONFLICT (correo) DO NOTHING
    RETURNING id, nombre, correo
  `, [nombre, correo, hash, rol]);

  if (resultado.rows.length) {
    console.log(`${rol} creado: ${correo}`);
  } else {
    console.log(`Ya existe: ${correo}`);
  }
}

async function main() {
  const readline = require('readline/promises');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  try {
    const adminPassword = await rl.question('Contraseña para Administrador: ');
    const nutriPassword = await rl.question('Contraseña para Nutricionista: ');

    if (adminPassword.length < 8 || nutriPassword.length < 8) {
      throw new Error('Las contraseñas deben tener al menos 8 caracteres');
    }

    await crearUsuario(
      'Administrador NutriVida',
      'admin@nutrivida.cl',
      adminPassword,
      'Administrador'
    );

    await crearUsuario(
      'Nutricionista NutriVida',
      'nutricionista@nutrivida.cl',
      nutriPassword,
      'Nutricionista'
    );
  } finally {
    rl.close();
    await db.end();
  }
}

main().catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});
