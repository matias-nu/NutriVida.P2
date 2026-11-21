const swaggerUi = require('swagger-ui-express');

const security = [{ bearerAuth: [] }];

const document = {
  openapi: '3.0.3',
  info: {
    title: 'NutriVida API',
    version: '1.0.0',
    description: 'API REST del sistema NutriVida. Gestión de pacientes, nutricionistas, servicios, planes y citas.'
  },
  servers: [
    { url: '/api/v1', description: 'Servidor actual' }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  },
  paths: {}
};

function endpoint(path, method, summary, options = {}) {
  if (!document.paths[path]) document.paths[path] = {};
  document.paths[path][method] = {
    tags: [options.tag || 'General'],
    summary,
    ...(options.auth ? { security } : {}),
    ...(options.body ? {
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: options.body,
              required: options.required || []
            }
          }
        }
      }
    } : {}),
    ...(options.params ? {
      parameters: options.params
    } : {}),
    responses: {
      200: { description: 'Operación correcta' },
      201: { description: 'Recurso creado' },
      400: { description: 'Datos inválidos' },
      401: { description: 'No autenticado' },
      403: { description: 'Sin permisos' },
      404: { description: 'No encontrado' },
      409: { description: 'Conflicto' }
    }
  };
}

const texto = { type: 'string' };
const entero = { type: 'integer' };
const booleano = { type: 'boolean' };
const precio = { type: 'number' };
const id = [{ name: 'id', in: 'path', required: true, schema: entero }];

endpoint('/auth/registro', 'post', 'Registrar paciente', {
  tag: 'Autenticación',
  body: { nombre: texto, correo: texto, password: texto },
  required: ['nombre', 'correo', 'password']
});

endpoint('/auth/login', 'post', 'Iniciar sesión', {
  tag: 'Autenticación',
  body: { correo: texto, password: texto },
  required: ['correo', 'password']
});

endpoint('/auth/perfil', 'get', 'Consultar perfil', {
  tag: 'Autenticación', auth: true
});

endpoint('/usuarios', 'get', 'Listar usuarios', {
  tag: 'Usuarios', auth: true
});

endpoint('/usuarios', 'post', 'Crear usuario', {
  tag: 'Usuarios', auth: true,
  body: { nombre: texto, correo: texto, password: texto, rol: texto },
  required: ['nombre', 'correo', 'password', 'rol']
});

endpoint('/usuarios/{id}', 'get', 'Consultar usuario', {
  tag: 'Usuarios', auth: true, params: id
});

endpoint('/usuarios/{id}', 'put', 'Actualizar usuario', {
  tag: 'Usuarios', auth: true, params: id,
  body: { nombre: texto, correo: texto, rol: texto, activo: booleano }
});

endpoint('/usuarios/{id}', 'delete', 'Desactivar usuario', {
  tag: 'Usuarios', auth: true, params: id
});

for (const [ruta, nombre, duracion] of [
  ['servicios', 'Servicios', 'duracion_minutos'],
  ['planes', 'Planes nutricionales', 'duracion_dias']
]) {
  endpoint('/' + ruta, 'get', 'Listar ' + nombre, { tag: nombre });

  endpoint('/' + ruta, 'post', 'Crear registro', {
    tag: nombre, auth: true,
    body: {
      nombre: texto,
      descripcion: texto,
      precio,
      [duracion]: entero
    }
  });

  endpoint('/' + ruta + '/{id}', 'put', 'Actualizar registro', {
    tag: nombre, auth: true, params: id,
    body: {
      nombre: texto,
      descripcion: texto,
      precio,
      [duracion]: entero,
      activo: booleano
    }
  });

  endpoint('/' + ruta + '/{id}', 'delete', 'Desactivar registro', {
    tag: nombre, auth: true, params: id
  });
}

endpoint('/nutricionistas', 'get', 'Listar nutricionistas', {
  tag: 'Nutricionistas'
});

endpoint('/nutricionistas/{id}/horarios', 'get', 'Consultar horarios disponibles', {
  tag: 'Nutricionistas',
  params: [
    ...id,
    {
      name: 'fecha',
      in: 'query',
      required: true,
      schema: { type: 'string', format: 'date' }
    }
  ]
});

endpoint('/citas', 'get', 'Listar citas según rol', {
  tag: 'Citas', auth: true
});

endpoint('/citas', 'post', 'Reservar cita', {
  tag: 'Citas', auth: true,
  body: {
    nutricionista_id: entero,
    servicio_id: entero,
    fecha_hora: {
      type: 'string',
      example: '2026-12-01T10:00'
    },
    observaciones: texto
  },
  required: ['nutricionista_id', 'servicio_id', 'fecha_hora']
});

endpoint('/citas/{id}/estado', 'patch', 'Cambiar estado de cita', {
  tag: 'Citas', auth: true, params: id,
  body: {
    estado: {
      type: 'string',
      enum: ['Confirmada', 'Cancelada', 'Completada']
    }
  },
  required: ['estado']
});

module.exports = function configurarSwagger(app) {
  app.get('/api-docs.json', (req, res) => res.json(document));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(document));
};
