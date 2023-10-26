const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Configuración de middleware
app.use(bodyParser.json());
app.use(cors());

// Conexión a MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/cis', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión exitosa a MongoDB'))
  .catch(err => console.error('Error de conexión a MongoDB', err));

// Definir el esquema del modelo y el modelo de datos para "miembro"
const MiembroSchema = new mongoose.Schema({
  nombre: String,
  apellidos: String,
  correo: String,
  password: String,
  passwordconfirm: String
  // Otros campos según tus necesidades
});

const Miembro = mongoose.model('Miembro', MiembroSchema);

// Rutas para el CRUD de "miembro"
// Por ejemplo, una ruta para obtener todos los miembros
app.get('/miembros', async (req,res) => {
  try {
    const miembros = await Miembro.find();
    res.json(miembros);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los miembros' });
  }
});

// Ruta para crear un nuevo miembro
const { body, validationResult } = require('express-validator');

// Ruta para crear un nuevo miembro con validación de datos
app.post('/miembros', [
  body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
  body('apellidos').notEmpty().withMessage('Los apellidos son obligatorios'),
  body('correo').isEmail().withMessage('El correo no es válido'),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  body('passwordconfirm').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Las contraseñas no coinciden');
    }
    return true;
  }),
], (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const nuevoMiembro = new Miembro(req.body);
  nuevoMiembro.save()
    .then(miembro => res.status(201).json(miembro))
    .catch(err => res.status(400).json({ error: 'No se pudo crear el miembro' }));
});


// Otras rutas para actualizar y eliminar miembros
// Ruta para actualizar un miembro por su ID con validación de datos
app.put('/miembros/:id', [
    body('nombre').optional().notEmpty().withMessage('El nombre es obligatorio'),
    body('apellidos').optional().notEmpty().withMessage('Los apellidos son obligatorios'),
    body('correo').optional().isEmail().withMessage('El correo no es válido'),
    body('password').optional().isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('passwordconfirm').optional().custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Las contraseñas no coinciden');
      }
      return true;
    }),
  ], async (req, res) => {
    const miembroId = req.params.id;
    const datosActualizados = req.body;
  
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    try {
      const miembro = await Miembro.findByIdAndUpdate(miembroId, datosActualizados, { new: true });
      if (!miembro) {
        return res.status(404).json({ error: 'Miembro no encontrado' });
      }
      res.json(miembro);
    } catch (err) {
      res.status(500).json({ error: 'Error al actualizar el miembro' });
    }
  });
  
  
// Ruta para eliminar un miembro por su ID
app.delete('/miembros/:id', async (req, res) => {
    const miembroId = req.params.id;
  
    try {
      const miembro = await Miembro.findByIdAndRemove(miembroId);
      if (!miembro) {
        return res.status(404).json({ error: 'Miembro no encontrado' });
      }
      res.json({ message: 'Miembro eliminado con éxito' });
    } catch (err) {
      res.status(500).json({ error: 'Error al eliminar el miembro' });
    }
  });
  
  




// Inicia el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});
