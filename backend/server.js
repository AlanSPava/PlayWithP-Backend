// ... 

// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json()); // Permite a Express leer JSON en el body de las peticiones

// Conexión a la Base de Datos (MongoDB Atlas)
mongoose.connect(process.env.MONGODB_URI) // La URI de conexión debe estar en .env
    .then(() => console.log('Conectado a MongoDB Atlas'))
    .catch(err => console.error('Error de conexión a la BD:', err));

// Rutas de Prueba (Root)
app.get('/', (req, res) => {
    res.send('Servidor GameTracker en funcionamiento!');
});

// Levantar el Servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// server.js (Extracto)
require('dotenv').config(); // Carga las variables de .env
// ...
// Conexión a la Base de Datos (MongoDB Atlas)
mongoose.connect(process.env.MONGODB_URI) // Aquí lee la variable del archivo .env
    .then(() => console.log('Conectado a MongoDB Atlas'))
    .catch(err => console.error('Error de conexión a la BD:', err));
