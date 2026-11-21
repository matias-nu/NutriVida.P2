require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());



app.use('/api/v1/usuarios', require('./usuarios'));

app.use('/api/v1/servicios', require('./servicios'));

app.use('/api/v1/planes', require('./planes'));

app.use('/api/v1/nutricionistas', require('./nutricionistas'));

app.use('/api/v1/citas', require('./citas'));

require('./swagger')(app);

app.use('/api/v1/auth', require('./auth'));

const PORT = process.env.PORT || 3001;



app.get('/api', (req, res) => {
  res.json({
    proyecto: 'NutriVida',
    estado: 'OK',
    mensaje: 'Backend funcionando correctamente'
  });
});

app.get('/api/v1/health', (req, res) => {
  res.json({
    ok: true,
    servicio: 'NutriVida API',
    fecha: new Date().toISOString()
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`NutriVida API funcionando en puerto ${PORT}`);
});
