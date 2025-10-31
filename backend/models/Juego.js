const mongoose = require('mongoose');

const JuegoSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    plataforma: {
        type: String,
        required: false // Opcional, pero útil
    },
    portadaUrl: {
        type: String,
        required: false // Para ver biblioteca con portadas [cite: 56]
    },
    estado: {
        type: String,
        enum: ['Pendiente', 'Jugando', 'Completado'],
        default: 'Pendiente'
    },
    completado: {
        type: Boolean,
        default: false // Marcar juegos como completados [cite: 58]
    },
    horasJugadas: {
        type: Number,
        default: 0 // Registrar horas jugadas [cite: 61]
    },
    // Campo para vincular con el usuario (si implementas autenticación)
    // usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }
}, {
    timestamps: true // Agrega campos createdAt y updatedAt automáticamente
});

module.exports = mongoose.model('Juego', JuegoSchema);