# NutriVida

Proyecto desarrollado para la asignatura **Desarrollo Full Stack 2** de Duoc UC.

NutriVida es una aplicación web para una clínica nutricional. Permite consultar servicios, registrar usuarios, agendar citas y administrar información según el tipo de usuario.

## Integrantes

- Matías Lazo Núñez
- Esteban Alonso Toloza Araneda
- Abraham Becerra Muñoz

**Docente:** Michael Byron Catalán Tejo

## Tecnologías utilizadas

**Frontend**
- React y Vite
- JavaScript
- Bootstrap y React Bootstrap
- React Router

**Backend**
- Node.js y Express
- API REST
- PostgreSQL en Amazon RDS
- Autenticación JWT
- Swagger

**Infraestructura**
- Amazon EC2 para ejecutar el backend
- Amazon RDS para la base de datos

## Funcionalidades

- Registro e inicio de sesión de usuarios.
- Autenticación mediante JWT.
- Acceso según roles: administrador, nutricionista y paciente.
- Consulta de servicios nutricionales.
- Agendamiento y consulta de citas.
- Panel para gestionar citas.
- Administración de servicios.
- Gestión de usuarios y planes nutricionales mediante la API.

## Estructura del proyecto

El repositorio contiene el frontend en la carpeta principal y el backend en `backend/`.

- `src/`: componentes, páginas y servicios del frontend.
- `backend/`: rutas, autenticación y conexión a PostgreSQL.
- `public/`: recursos del frontend.

## Base de datos

Se utiliza PostgreSQL alojado en Amazon RDS.

El backend trabaja con usuarios, roles, servicios, planes nutricionales y citas. Las citas relacionan al paciente, al nutricionista y al servicio seleccionado.

La conexión se configura mediante variables de entorno y un certificado de Amazon RDS.

## API REST

El backend utiliza el prefijo `/api/v1` y contiene endpoints para:

- Autenticación y perfil de usuario.
- Gestión de usuarios.
- Gestión de servicios.
- Gestión de planes nutricionales.
- Consulta de nutricionistas y horarios.
- Registro, consulta y cambio de estado de citas.

Los endpoints protegidos requieren un token JWT y verifican los permisos del usuario.

### Swagger

La documentación de la API está disponible en:

http://54.243.53.206:3001/api-docs/

La dirección requiere que la instancia EC2 esté encendida y el puerto 3001 esté habilitado.

## Instalación

Se necesita Node.js, npm y acceso a la base de datos configurada.

**Frontend**

```bash
npm install
npm run dev
```

**Backend**

```bash
cd backend
npm install
npm start
```

El backend utiliza el puerto `3001` de forma predeterminada.

Para conectarlo a PostgreSQL se deben configurar las variables `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` y `JWT_SECRET`. También se requiere el certificado `global-bundle.pem` de Amazon RDS.

Las credenciales y el archivo `.env` no se incluyen en el repositorio.

## Integración frontend y backend

El frontend realiza solicitudes HTTP a la API REST para consultar y registrar información. Las peticiones se gestionan desde `src/services/api.js`.

El sistema guarda los datos de autenticación en `localStorage` para mantener la sesión al recargar la página y utiliza rutas protegidas para controlar el acceso a las diferentes pantallas.

## Evaluación Parcial 3

Proyecto desarrollado para demostrar la conexión del backend con PostgreSQL, la implementación de servicios REST, la integración con React y el uso de autenticación JWT y permisos según roles.
