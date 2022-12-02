const { Schema, model } = require('mongoose');

const mascotaSchema = new Schema({
    nombre: { type: String},
    edad: { type: Number},
    tipo: { type: String},
    caracteristicas: { type: String}
 });

module.exports = model('mascotas', mascotaSchema )