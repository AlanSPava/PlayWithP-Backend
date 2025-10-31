const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    juegoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Juego', //Vincular la review a un juego
        required: true
    },
    score: {
        type: Number,
        min: 1,
        max: 5, //Puntuacion con estrellas
        required: true
    },
    textoDetallado: {
        type: String,
        required:true //Escribir reviews detalladas
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Review', ReviewSchema);