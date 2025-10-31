const express = require('express');
const router = express.Router();
const Juego = require('../models/Juego'); // Importa el modelo que creaste

// --- ENDPOINT 1: CREAR (POST) ---
// [POST] /api/juegos - Agrega un nuevo juego
router.post('/', async (req, res) => {
    try {
        const nuevoJuego = new Juego(req.body);  //crear instancia
        const juegoGuardado = await nuevoJuego.save(); //guardar en BD
        res.status(201).json(juegoGuardado); //201 created
        
} catch (error) {
        res.status(400).json({ error: 'No se pudo agregar el juego', detalles: error.message });
    }
});

// --- ENDPOINT 2: LEER TODOS (GET) ---
// [GET] /api/juegos - Obtiene todos los juegos de la biblioteca
router.get('/', async (req, res) => {
    try {
        const juegos = await Juego.find(); // Busca todos los documentos
        res.status(200).json(juegos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la lista de juegos', detalles: error.message });
    }
});

// --- ENDPOINT 3: LEER UNO (GET/:id) ---
// [GET] /api/juegos/:id - Obtiene un juego específico por ID
router.get('/:id', async (req, res) => {
    try {
        const juego = await Juego.findById(req.params.id);
        if (!juego) {
            return res.status(404).json({ error: 'Juego no encontrado' });
        }
        res.status(200).json(juego);
    } catch (error) {
        // Maneja errores de formato de ID inválido o de servidor
        res.status(500).json({ error: 'Error al buscar el juego', detalles: error.message });
    }
});

// --- ENDPOINT 4: ACTUALIZAR (PUT/:id) ---
// [PUT] /api/juegos/:id - Actualiza la información de un juego
router.put('/:id', async (req, res) => {
    try {
        const juegoActualizado = await Juego.findByIdAndUpdate(
            req.params.id,
            req.body, // Los datos a actualizar
            { new: true, runValidators: true } // new: true devuelve el doc. actualizado
        );
        if (!juegoActualizado) {
            return res.status(404).json({ error: 'Juego no encontrado para actualizar' });
        }
        res.status(200).json(juegoActualizado);
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar el juego', detalles: error.message });
    }
});

// --- ENDPOINT 5: ELIMINAR (DELETE/:id) ---
// [DELETE] /api/juegos/:id - Elimina un juego de la biblioteca
router.delete('/:id', async (req, res) => {
    try {
        const juegoEliminado = await Juego.findByIdAndDelete(req.params.id);
        if (!juegoEliminado) {
            return res.status(404).json({ error: 'Juego no encontrado para eliminar' });
        }
        // 204 No Content es común para DELETE exitoso
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el juego', detalles: error.message });
    }
});

module.exports = router;
